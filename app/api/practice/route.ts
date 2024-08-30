import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { data } from 'autoprefixer';

export async function GET(request: NextRequest) {
  
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if(user) {
    try {
      const { data, error } = await supabase
        .from('practice_entries')
        .select()
        .eq('user_id', user.id);
    
        if(error) {
          throw error;
        }

      // console.log("data " + data);
      const response = NextResponse.json(data);
      // console.log("response " + response);
      // console.log('Response body:', response.json());

      return response;

    } catch (err) {
      console.log(err);
      return NextResponse.json(err);
    }
  }
}