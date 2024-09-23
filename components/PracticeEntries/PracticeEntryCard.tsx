import { useEffect, useState } from "react";

// icons
import { TbEdit } from "react-icons/tb";
import { GoDash } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

export interface PracticeEntryCardProps {
  entry: {
    id: number;
    user_id: string;
    date: string;
    start_time: string;
    end_time: string;
    desc: string;
  }
  handleUpdate: () => void;
}

const getDay = (date: any) => {
  const newDate = new Date(date);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[newDate.getDay()];
}

export const calculatePracticeTime = (startTime: string, endTime: string): {hours: number, minutes: number} => {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);

  if (end <= start) {
    end.setTime(end.getTime() + 24 * 60 * 60 * 1000);
  }

  const difference = end.getTime() - start.getTime();
  console.log(difference);
  const convertToMinutes = Math.floor(difference / (1000 * 60));

  const hours = Math.floor(convertToMinutes / 60);
  const minutes = convertToMinutes % 60;

  return { hours, minutes };
}

const PracticeEntryCard = ({entry, handleUpdate}:PracticeEntryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [day, setDay] = useState('');
  const [date, setDate] = useState(entry.date);
  const [startTime, setStartTime] = useState(entry.start_time);
  const [endTime, setEndTime] = useState(entry.end_time);
  const [desc, setDesc] = useState(entry.desc);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { hours, minutes } = calculatePracticeTime(entry.start_time, entry.end_time);

  useEffect(() => {
    setDay(getDay(entry.date));
  }, [])
 
  const editCard = () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    const updatedEntry = {
      id: entry.id,
      date: date,
      startTime: startTime,
      endTime: endTime,
      desc: desc,
    }

    const response = await fetch('/api/practice', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEntry),
        
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update the entry');
    }

    // const responseData = await response.json();
    handleUpdate();
    setDay(getDay(updatedEntry.date));
    setIsEditing(false);
  };  

  const handleShowModal = () => {
    setShowConfirmModal(true);
  }

  const handleDelete = async () => {
      const response = await fetch('/api/practice', {
        method: 'DELETE',
        body: JSON.stringify({ id: entry.id }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete the entry');
      }

      handleUpdate();
      setShowConfirmModal(false);
    
  };

  return (
    <div>
      {!isEditing && 
      <div className="bg-neutral px-6 py-4 rounded-lg shadow-sm h-[165px] max-w-[350px]">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{day}</h2>
             <h3 className="text-base">{entry.date}</h3>
          </div>
          {minutes == 0 &&  <p className="mt-[2px]">{hours} hour(s)</p>}
          {minutes != 0 &&  <p className="mt-[2px]">{hours} hour(s) {minutes} minute(s)</p>}
         
        </div>
        <p className="mt-3">{entry.desc}</p>
        <div className="flex flex-row justify-end">
          <button onClick={editCard} className="mt-3"><TbEdit className="text-2xl hover:text-primary hover:text-[28px] transition-all ease-in-out"/></button>  
        </div>
      </div>
      }

      {isEditing && 
        <div className="bg-neutral px-6 py-4 rounded-lg shadow-sm h-[165px] max-w-[350px] outline outline-1 outline-primary">
          <div>
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-primary">{day}</h2>
              <div className="flex flex-row ml-2 items-center">
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="10:00" 
                  className="bg-neutral-light outline outline-1 outline-black max-w-20 text-center text-sm p-1"
                />
                <GoDash />
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="13:00" 
                  className="bg-neutral-light outline outline-1 outline-black max-w-20 text-center text-sm p-1" 
                />
              </div>
            </div>
            <div className="mt-2">
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-neutral-light outline outline-1 outline-black"
              />
            </div>
          </div>   
          <div className="flex flex-row justify-between items-center mt-2">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-neutral-light outline outline-1 outline-black px-1 h-14"
            />
            <div className="flex">
              <button
                  onClick={handleShowModal} 
                  className="text-xl text-black rounded-md h-fit w-fit mt-6 py-1 hover:text-primary"
                >
                <FaRegTrashAlt />
              </button> 
              <button 
                onClick={handleSave} 
                className="bg-primary text-sm text-white rounded-md h-fit w-fit mx-2 mt-6 px-2 py-1 hover:bg-primary-hover"
              >
                Save
              </button>
            </div> 
          </div>
       </div>
      }
      {showConfirmModal && 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Deletion</h3>
          <p className="text-gray-700 mb-6">Are you sure you want to delete this entry?</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      }
    </div>
    
  )
}
export default PracticeEntryCard