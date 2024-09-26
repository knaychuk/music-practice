import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest, response: NextResponse) {
  const supabase = createClient();
  
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    error
    return;
  }

  return NextResponse.json(user);
}