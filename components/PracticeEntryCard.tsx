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

const calculatePracticeTime = (startTime: string, endTime: string): {hours: number, minutes: number} => {
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  const difference = end.getTime() - start.getTime();
  console.log(difference);
  const convertToMinutes = Math.floor(difference / (1000 * 60));

  const hours = Math.floor(convertToMinutes / 60);
  const minutes = convertToMinutes % 60;

  return { hours, minutes };
}

const PracticeEntryCard = ({entry}:PracticeEntryCardProps) => {
  const { hours, minutes } = calculatePracticeTime(entry.start_time, entry.end_time);

  return (
    <div className="bg-neutral px-6 py-4 rounded-lg shadow-sm">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Monday</h2>
          <h3 className="text-base">{entry.date}</h3>
        </div>
        <p className="mt-[2px]">{hours} hour(s) {minutes} minute(s)</p>
      </div>
      <p className="mt-3">{entry.desc}</p>
      <button className="mt-3"><TbEdit className="text-2xl"/></button>  
    </div>
  )
}
export default PracticeEntryCard