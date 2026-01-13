import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { locale } = await request.json();

    if (!locale || !['en', 'es'].includes(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    const response = NextResponse.json({ success: true, locale });

    // Set the locale cookie
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
