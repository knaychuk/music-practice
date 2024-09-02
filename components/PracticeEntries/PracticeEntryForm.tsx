//icons
import { GoDash } from "react-icons/go";

interface PracticeEntryFormProps {
  handleCancel: () => void;
}

const PracticeEntryForm = ({ handleCancel } : PracticeEntryFormProps) => {

  const handleAdd = async () => {

  }
  return (
  <div className="bg-neutral px-6 py-4 rounded-lg shadow-sm h-[165px] max-w-[350px] outline outline-1 outline-primary">
    <div>
      <div className="flex justify-between">
        {/* <h2 className="text-xl font-bold text-primary">{day}</h2> */}
        <div className="flex flex-row ml-2 items-center">
          <label className="">
            Time:
            <input 
              type="time" 
              // value={startTime}
              // onChange={(e) => setStartTime(e.target.value)}
              placeholder="10:00" 
              className="bg-neutral-light outline outline-1 outline-black max-w-20 text-center text-sm p-1 ml-4"
              required
            />  
          </label>
          <GoDash />
            <input 
              type="time" 
              // value={endTime}
              // onChange={(e) => setEndTime(e.target.value)}
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
            // value={date}
            // onChange={(e) => setDate(e.target.value)}
            className="bg-neutral-light outline outline-1 outline-black mx-4"
            required
          />
        </label>
      </div>
    </div>   
    <div className="flex flex-row justify-between mt-2">
      <label>
        What did you work on?:
        <textarea
          // value={desc}
          // onChange={(e) => setDesc(e.target.value)}
          className="bg-neutral-light outline outline-1 outline-black px-1 h-12 w-[200px]"
        />
      </label>
      <div className="flex flex-col justify-end items-start">
        <button onClick={handleAdd} className="bg-primary text-sm text-white rounded-md h-fit w-fit px-2 py-1 hover:bg-primary-hover">Add</button>  
        <button onClick={handleCancel} className="bg-gray-500 text-sm text-white rounded-md h-fit w-fit my-1 px-2 py-1 hover:bg-gray-600">Cancel</button>  
      </div>
    </div>
 </div>

  )
}
export default PracticeEntryForm