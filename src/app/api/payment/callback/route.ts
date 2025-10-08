import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const txnId = searchParams.get('txnId');
    
    //console.log("Payment callback received for txnId:", txnId);
    
    if (!txnId) {
      //console.log("No transaction ID found, redirecting to failed");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`);
    }

    // Check payment status with PhonePe
    const merchantId = process.env.PHONEPE_MERCHANT_ID!;
    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX!;
    const baseUrl = process.env.PHONEPE_BASE_URL!;

    const path = `/pg/v1/status/${merchantId}/${txnId}`;
    const checksum = crypto.createHash("sha256").update(path + saltKey).digest("hex") + "###" + saltIndex;

    //console.log("Checking payment status for:", txnId);

    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const data = await response.json();
    //console.log("Payment status response:", JSON.stringify(data, null, 2));

    // Check if payment was actually completed
    if (data.success && data.data?.state === "COMPLETED" && data.data?.responseCode === "SUCCESS") {
      //console.log("Payment completed successfully");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?txnId=${txnId}&amount=${data.data.amount || 'unknown'}`);
    } else if (data.data?.state === "FAILED") {
      //console.log("Payment failed");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?txnId=${txnId}&reason=payment_failed`);
    } else if (data.data?.state === "PENDING") {
      //console.log("Payment pending");
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-pending?txnId=${txnId}`);
    } else {
      //console.log("Payment status unclear or failed:", data);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?txnId=${txnId}&reason=status_unclear`);
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error("Callback error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?reason=callback_error`);
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
