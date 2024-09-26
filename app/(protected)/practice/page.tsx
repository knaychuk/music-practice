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

const Practice = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [practiceEntries, setPracticeEntries] = useState<PracticeEntry[]>([]);

  const fetchPractice = useCallback(async () => {
    const response = await fetch('/api/practice');
    const data = await response.json();
    setPracticeEntries(data);
  }, []);
  
  useEffect(() => {
    fetchPractice();
  }, []);

  const handleUpdate = () => {
    fetchPractice();
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
        <p className='text-2xl'>Total Hours:</p>
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