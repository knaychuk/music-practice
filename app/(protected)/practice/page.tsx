'use client'

import '../../../styles/buttonHover.css'
import PracticeEntryCard from '@/components/PracticeEntries/PracticeEntryCard';
import PracticeEntryForm from '@/components/PracticeEntries/PracticeEntryForm';
import { useState, useEffect, useCallback } from 'react';

// icons
import { IoIosAddCircleOutline } from 'react-icons/io';

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
  const [newEntry, setNewEntry] = useState<Partial<PracticeEntry>>({});

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
    setNewEntry({ date: '', start_time: '00:00:00', end_time: '', desc: '' });
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
        {/* <button className='bg-primary px-3 py-2 rounded-md text-white'>Add New</button> */}
        <button 
          id='hoverButton' 
          className="flex flex-row items-center relative text-white text-base bg-primary py-2 px-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:pr-10 hover:pl-4"
          onClick={handleAddNew}
        >
          <span className="relative z-10">Add New</span>
          <span className="absolute text-white right-[-20px] opacity-0 transition-all duration-500 ease-in-out text-2xl">   
            <IoIosAddCircleOutline />
          </span>
        </button>     
      </div>
      <div className='grid grid-cols-4 gap-4 '>
      {isCreating && 
        <PracticeEntryForm
          handleCancel={handleCancel}
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