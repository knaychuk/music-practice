import { useState } from "react";
import { calculatePracticeTime } from "./PracticeEntryCard";

//icons
import { GoDash } from "react-icons/go";

interface PracticeEntryFormProps {
  handleCancel: () => void;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPractice: () => void;

}

const PracticeEntryForm = ({ handleCancel, setIsCreating, fetchPractice } : PracticeEntryFormProps) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!date || !startTime || !endTime || !desc) {
      alert("All fields are required!");
      return;
    }

    const totalTime = calculatePracticeTime(startTime, endTime);

    const newEntry = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      desc: desc,
      hours: totalTime.hours,
      minutes: totalTime.minutes
    }

    console.log(newEntry);

    const response = await fetch('/api/practice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add the entry');
    }

    setIsCreating(false);
    fetchPractice()

  }

  return (
  <form>
    <div className="bg-neutral px-6 py-4 rounded-lg shadow-sm h-[165px] max-w-[350px] outline outline-1 outline-primary">
      <div>
        <div className="flex justify-between"> 
          <div className="flex flex-row items-center">
            <label className="">
              Time:
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="10:00" 
                className="bg-neutral-light outline outline-1 outline-black max-w-20 text-center text-sm p-1 ml-4"
                required
              />  
            </label>
            <GoDash />
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="13:00" 
                className="bg-neutral-light outline outline-1 outline-black max-w-20 text-center text-sm p-1"
                required
              />
          </div>
        </div>
        <div className="mt-2">
          <label>
            Date:
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-neutral-light outline outline-1 outline-black mx-4"
              required
            />
          </label>
        </div>
      </div>   
      <div className="flex flex-row justify-between mt-2">
        <label>
          What did you work on today?
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="bg-neutral-light outline outline-1 outline-black px-1 h-12 w-[200px]"
          />
        </label>
        <div className="flex flex-col justify-end items-start">
          <button type="submit" onClick={handleAdd} className="bg-primary text-sm text-white rounded-md h-fit w-fit px-2 py-1 hover:bg-primary-hover">Add</button>  
          <button onClick={handleCancel} className="bg-gray-500 text-sm text-white rounded-md h-fit w-fit my-1 px-2 py-1 hover:bg-gray-600">Cancel</button>  
        </div>
      </div>
  </div>
 </form>
  )
}
export default PracticeEntryForm