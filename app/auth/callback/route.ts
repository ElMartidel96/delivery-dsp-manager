import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Get the user data
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Create or update the profile with the registration data
        const metadata = user.user_metadata || {};

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (supabase as any).from('profiles').upsert({
          user_id: user.id,
          full_name: metadata.full_name || null,
          phone: metadata.phone || null,
          role: metadata.is_driver_signup ? 'driver' : 'customer',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });
      }

      // Email verified successfully, redirect to dashboard
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  // If there's an error or no code, redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=verification_failed`);
}
