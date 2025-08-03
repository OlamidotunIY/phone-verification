import { NextRequest, NextResponse } from 'next/server';
import { verificationCodes } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, code } = await request.json();

    // Validate input
    if (!phoneNumber || !code) {
      return NextResponse.json(
        { error: 'Phone number and verification code are required' },
        { status: 400 }
      );
    }

    // Check if verification code exists
    const storedData = verificationCodes.get(phoneNumber);
    if (!storedData) {
      return NextResponse.json(
        { error: 'No verification code found for this phone number' },
        { status: 400 }
      );
    }

    // Check if code has expired (10 minutes)
    const now = Date.now();
    const codeAge = now - storedData.timestamp;
    const tenMinutes = 10 * 60 * 1000;

    if (codeAge > tenMinutes) {
      verificationCodes.delete(phoneNumber);
      return NextResponse.json(
        { error: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Verify the code
    if (storedData.code !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Code is valid - remove it from storage
    verificationCodes.delete(phoneNumber);

    return NextResponse.json({
      success: true,
      message: 'Phone number verified successfully',
      phoneNumber
    });

  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}