import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user) {
    try {
      const { data: historyData, error: historyError } = await supabase
        .from('practice_history')
        .select()
        .eq('user_id', user.id);

      if (historyError) {
        throw historyError;
      }
      console.log(historyData[0]);

      return NextResponse.json(historyData[0]);

    } catch (err) {
      console.log(err);
      return NextResponse.json(err);
    }
  }
}