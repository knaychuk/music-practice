import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('practice_entries')
      .select();

    if(error) {
      throw error;
    }
    console.log("data " + data);
    const response = NextResponse.json(data);
    console.log("response " + response);
    // console.log('Response body:', response.json());

    return response;

  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
}
