import { NextRequest, NextResponse } from "next/server";
import { verificationCodes } from "@/lib/storage";
import axios from "axios";
import randomstring from "randomstring";

const api = axios.create({
  baseURL: 'https://api.smarthivesms.com/api/sms/send',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY as string,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    // Validate phone number
    if (!phoneNumber || typeof phoneNumber !== "string") {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Basic phone number validation (you can enhance this)
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const timestamp = Date.now();

    // Store the code with timestamp (expires after 10 minutes)
    verificationCodes.set(phoneNumber, { code, timestamp });

    // Clean phone number for SMS (remove formatting)
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");

    // Prepare SMS payload
    const payload = {
      sender: "BLUETTI",
      recipients: `234${cleanPhoneNumber}`,
      msg: `Your OTP is ${code}. Do not share with anyone, it expires in 10 mins.`,
      type: 1,
      route: "TRX",
      ext_ref: randomstring.generate(10),
    };

    // Send SMS
    const response = await api.post("/", payload);

    console.log("SMS sent successfully:", response.data);

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully",
      phoneNumber,
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
