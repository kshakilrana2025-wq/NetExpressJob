import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ error: 'Google login not configured yet' }, { status: 501 });
}
