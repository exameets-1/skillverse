import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, courseName, userId, mobileNumber } = await req.json();
    
    //console.log("Payment initiation request:", { amount, courseName, userId, mobileNumber });

    // Validate environment variables
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    const baseUrl = process.env.PHONEPE_BASE_URL;

    if (!merchantId || !saltKey || !saltIndex || !baseUrl) {
      //console.error("Missing PhonePe environment variables");
      return NextResponse.json(
        { success: false, message: "Payment gateway configuration error" },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Valid amount is required" },
        { status: 400 }
      );
    }

    // Generate unique transaction ID
    const merchantTransactionId = "TXN_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    
    const payload = {
      merchantId: merchantId,
      merchantTransactionId,
      merchantUserId: userId || "MUID123",
      amount: amount * 100, // PhonePe expects amount in paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?txnId=${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/callback?txnId=${merchantTransactionId}`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    //console.log("Payment payload:", payload);

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
    //console.log("Base64 payload:", base64Payload);

    // Create checksum - EXACT format required by PhonePe
    const stringToSign = base64Payload + "/pg/v1/pay" + saltKey;
    const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
    const checksum = sha256 + "###" + saltIndex;

    //console.log("String to sign:", stringToSign);
    //console.log("Checksum:", checksum);

    const response = await fetch(`${baseUrl}/pg/v1/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "accept": "application/json",
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const responseText = await response.text();
    //console.log("PhonePe raw response:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      //console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid response from payment gateway" },
        { status: 500 }
      );
    }

    //console.log("PhonePe parsed response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      //console.error("PhonePe API error:", response.status, data);
      
      // Handle specific PhonePe errors
      if (data.code === "KEY_NOT_CONFIGURED") {
        return NextResponse.json(
          { success: false, message: "Payment gateway configuration error. Please contact support." },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: data.message || "Payment gateway error" },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json(data);
  } catch (error) {
    //console.error("Payment initiation error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
