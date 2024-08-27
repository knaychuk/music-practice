'use client'

import { useState, useEffect } from 'react';

interface PracticeEntry {
  id: number;
  user_id: string;
  date: Date;
  start_time: string;
  end_time: string;
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
    <div>
      <h1>Practice Log</h1>
      <p>Total Hours:</p>

      <div>
        <button>Add New Practice</button>
      </div>
      {practiceEntries.map((practice) => (
        <div>
          <div>{practice.id}</div>
          <div>{practice.user_id}</div>
        </div>
      ))}
    </div>
  )
}
export default Practice