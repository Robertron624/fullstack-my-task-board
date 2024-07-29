import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const greeting = "Hello, World!";

  const json ={
    greeting
  }

    return NextResponse.json(json);
}