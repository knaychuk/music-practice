import { useEffect, useState } from "react";

// icons
import { TbEdit } from "react-icons/tb";

export interface PracticeEntryCardProps {
  entry: {
    id: number;
    user_id: string;
    date: string;
    start_time: string;
    end_time: string;
    desc: string;
  }
}

const getDay = ({entry}: PracticeEntryCardProps) => {
  const date = new Date(entry.date);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday;', 'Saturday'];
  return days[date.getDay()];
}

const calculatePracticeTime = (startTime: string, endTime: string): {hours: number, minutes: number} => {
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

const PracticeEntryCard = ({entry}:PracticeEntryCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [day, setDay] = useState('');
  const [date, setDate] = useState(entry.date);
  const [desc, setDesc] = useState(entry.desc);

  const { hours, minutes } = calculatePracticeTime(entry.start_time, entry.end_time);

  useEffect(() => {
    setDay(getDay({entry}));
  }, [])
 
  const editCard = () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    setIsEditing(false);
  }

  return (
    <div>
      {!isEditing && 
      <div className="bg-neutral px-6 py-4 rounded-lg shadow-sm max-w-[350px]">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold">{day}</h2>
             <h3 className="text-base">{entry.date}</h3>
          </div>
          <p className="mt-[2px]">{hours} hour(s) {minutes} minute(s)</p>
        </div>
        <p className="mt-3">{entry.desc}</p>
        <button onClick={editCard} className="mt-3"><TbEdit className="text-2xl"/></button>  
      </div>
      }

      {isEditing && 
        <div className="bg-neutral px-6 py-4 rounded-lg shadow-sm max-w-[350px]">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">Monday</h2>
              <input type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row min-w-fit">
              <input type="text" placeholder="e.g., 10:00" />
              <span>-</span>
              <input type="text" placeholder="e.g., 13:00" />
          </div>  
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
         <button onClick={handleSave} className="mt-3"><TbEdit className="text-2xl"/></button>  
       </div>
      }
    </div>
    
  )
}
export default PracticeEntryCard