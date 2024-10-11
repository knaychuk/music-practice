'use client'

import AddNewButton from '@/components/Buttons/AddNewButton';
import '../../../styles/buttonHover.css'
import PracticeEntryCard from '@/components/PracticeEntries/PracticeEntryCard';
import PracticeEntryForm from '@/components/PracticeEntries/PracticeEntryForm';
import { useState, useEffect, useCallback } from 'react';

interface PracticeEntry {
  id: number;
  user_id: string;
  date: string;
  start_time: string;
  end_time: string;
  desc: string;
}

interface PracticeHistory {
  id: number;
  user_id: string;
  streak: number | null;
  total_hours: number;
  week_hours: number | null;
  total_days: number | null;
  week_days: number | null;
  created_at: string;
  total_minutes: number;
}

const Practice = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [practiceEntries, setPracticeEntries] = useState<PracticeEntry[]>([]);
  const [practiceHistory, setPracticeHistory] = useState<PracticeHistory | null>(null);

  const fetchPractice = useCallback(async () => {
    const response = await fetch('/api/practice');
    const data = await response.json();
    setPracticeEntries(data);
  }, []);

  // const fetchPracticeHistory = useCallback(async () => {
  //   const response = await fetch('/api/practice_history');
  //   const data = await response.json();
  //   setPracticeHistory(data);
  //   console.log(practiceHistory);
  // }, [])

  const fetchPracticeHistory = async () => {
    const response = await fetch('/api/practice_history');
    const data = await response.json();
    console.log(data);
    setPracticeHistory(data);
  }

  
  useEffect(() => {
    fetchPractice();
    fetchPracticeHistory();
  }, []);

  const handleUpdate = () => {
    fetchPractice();
    fetchPracticeHistory();
  };

  const handleAddNew = () => {
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
  }

  return (
    <div className='px-14'>
      <div className='flex flex-col'>
        <h1 className='text-4xl'>Practice Log</h1>
        <p className='text-2xl'>Total Time: {practiceHistory?.total_hours} Hours {practiceHistory?.total_minutes} Minutes</p>
      </div>
      <div className='m-2 flex justify-end'>
        <AddNewButton buttonText='Add New' clickFunction={handleAddNew} />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-4 2xl:grid-cols-4 gap-5 max-w-[2000px] mx-auto px-4'>
      {isCreating && 
        <PracticeEntryForm
          handleCancel={handleCancel}
          setIsCreating={setIsCreating}
          fetchPractice={fetchPractice}
          fetchPracticeHistory={fetchPracticeHistory}
        />
      } 

      {practiceEntries && practiceEntries.map((entry) => ( 
        <PracticeEntryCard 
          entry={entry} 
          key={entry.id}
          handleUpdate={handleUpdate}  
        />
      ))}
      </div>
    </div>
  )
}
export default Practice