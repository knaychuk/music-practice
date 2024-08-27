'use client'

import PracticeEntryCard from '@/components/PracticeEntryCard';
import { useState, useEffect } from 'react';

interface PracticeEntry {
  id: number;
  user_id: string;
  date: string;
  start_time: string;
  end_time: string;
  desc: string;
}

const Practice = () => {
  const [practiceEntries, setPracticeEntries] = useState<PracticeEntry[]>([]);

  useEffect(() => {
    const fetchPractice = async () => {
      const response = await fetch('/api/practice');
      const data = await response.json();
      console.log(data);
      setPracticeEntries(data);
    }
    fetchPractice();

  }, [])

  return (
    <div className='px-14'>
      <div className='flex flex-col'>
        <h1 className='text-4xl'>Practice Log</h1>
        <p className='text-2xl'>Total Hours:</p>
      </div>
      <div className='m-2 text-right'>
        <button className='bg-secondary px-3 py-2 rounded-md'>Add New Practice</button>
      </div>
      <div className='grid grid-cols-4 gap-4 '>
      {practiceEntries.map((entry) => ( 
        <PracticeEntryCard entry={entry} key={entry.id} />
      ))}
      </div>
    </div>
  )
}
export default Practice