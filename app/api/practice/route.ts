import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { data } from 'autoprefixer';
import { calculatePracticeTime } from '@/components/PracticeEntries/PracticeEntryCard';

export async function GET(request: NextRequest) {
  
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user) {
    try {
      const { data, error } = await supabase
        .from('practice_entries')
        .select()
        .order('date', { ascending: false})
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

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user) {
    try {
      const body = await request.json();
      const { id, date, startTime, endTime, desc } = body;

      const updateFields: any = {};
      if (date) updateFields.date = date;
      if (startTime) updateFields.start_time = startTime;
      if (endTime) updateFields.end_time = endTime;
      if (desc) updateFields.desc = desc;

      if (Object.keys(updateFields).length === 0) {
        return NextResponse.json({ error: 'No fields provided for update' }, { status: 400 });
      }

      const { data, error } = await supabase
        .from('practice_entries')
        .update(updateFields)
        .eq('id', id)
        .eq('user_id', user.id);  

      if (error) {
        throw error;
      }

      return NextResponse.json(data);

    } catch (err) {
      throw err;
    }
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  let existingHistory = [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user) {
    try {
      const body = await request.json();
      // date, startTime, endTime, desc are from user input | hours, minutes from calculatePracticeTime function
      const { date, startTime, endTime, desc, hours, minutes } = body;
      console.log(body);

      // INSERT NEW PRACTICE ENTRY
      const { data, error } = await supabase
        .from('practice_entries')
        .insert({ user_id: user.id, date: date, start_time: startTime, end_time: endTime, desc: desc });

      if (error) {
        throw error;
      }

      // GET PRACTICE HISTORY FOR USER
      const { data: historyData, error: historyError } = await supabase
        .from('practice_history')
        .select()
        .eq('user_id', user.id);

      if (historyError) {
        throw historyError;
      }

      if (historyData && historyData.length > 0) {
        existingHistory = historyData[0];
      } 

      const { total_hours, total_minutes } = existingHistory;   

      // UPDATE EXISTING PRACTICE HISTORY

      const { data: updateHistoryData, error: updateHistoryError } = await supabase
        .from('practice_history')
        .update({ total_hours: total_hours + hours, total_minutes: total_minutes + minutes})
        .eq('user_id', user.id)
        .select();

        return NextResponse.json(data);

    } catch (err) {
      throw err;
    }
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = createClient();
  let existingHistory = [];

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(user) {
    try {
      const body = await request.json();
      const { id, hours, minutes } = body;

      const { data: historyData, error: historyError } = await supabase
        .from('practice_history')
        .select()
        .eq('user_id', user.id);

      if (historyError) {
        throw historyError;
      }

      if (historyData && historyData.length > 0) {
        existingHistory = historyData[0];
      } 

      const { total_hours, total_minutes } = existingHistory;   

      const { data: deleteHistoryData, error: deleteHistoryError } = await supabase
        .from('practice_history')
        .update({ total_hours: total_hours - hours, total_minutes: total_minutes - minutes })
        .eq('user_id', user.id);

      const { data: deletedEntryData, error: deletedEntryError } = await supabase
      .from('practice_entries')
      .delete()
      .eq('id', id);

      return NextResponse.json(data);

    } catch (err) { 
      throw err;
    }
  }
}