import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const txnId = searchParams.get('txnId');
    
    if (!txnId) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`);
    }

    // Check payment status
    const merchantId = process.env.PHONEPE_MERCHANT_ID!;
    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX!;
    const baseUrl = process.env.PHONEPE_BASE_URL!;

    const path = `/pg/v1/status/${merchantId}/${txnId}`;
    const checksum = crypto.createHash("sha256").update(path + saltKey).digest("hex") + "###" + saltIndex;

    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const data = await response.json();
    console.log("Payment status:", data);

    if (data.success && data.data?.state === "COMPLETED") {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?txnId=${txnId}`);
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed?txnId=${txnId}`);
    }
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`);
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
