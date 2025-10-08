import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { transactionId } = await req.json();

    const merchantId = process.env.PHONEPE_MERCHANT_ID!;
    const saltKey = process.env.PHONEPE_SALT_KEY!;
    const saltIndex = process.env.PHONEPE_SALT_INDEX!;
    const baseUrl = process.env.PHONEPE_BASE_URL!;

    const path = `/pg/v1/status/${merchantId}/${transactionId}`;

    const checksum =
      crypto.createHash("sha256").update(path + saltKey).digest("hex") + "###" + saltIndex;

    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Status check failed" }, { status: 500 });
  }
}
