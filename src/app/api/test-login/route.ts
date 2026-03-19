import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { institution, email, password } = body;

    console.log("[test-login] Received:", { institution, email, password });

    // Test with hardcoded values that should work
    if (email === "admin@school.edu" && password === "admin123") {
      return NextResponse.json({
        success: true,
        message: "Credentials valid - this should work in NextAuth!",
        received: { institution, email, password }
      });
    }

    return NextResponse.json({
      success: false,
      message: "Credentials don't match test values",
      received: { institution, email, password }
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
