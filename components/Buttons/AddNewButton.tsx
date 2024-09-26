import { IoIosAddCircleOutline } from 'react-icons/io';

interface AddNewButtonProps {
  buttonText: string;
  clickFunction: () => void;
}

const AddNewButton = ({ buttonText, clickFunction }: AddNewButtonProps) => {
  return (
    <button 
          id='hoverButton' 
          className="flex flex-row items-center relative text-white text-base bg-primary py-2 px-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:pr-10 hover:pl-4"
          onClick={clickFunction}
        >
          <span className="relative z-10">{buttonText}</span>
          <span className="absolute text-white right-[-20px] opacity-0 transition-all duration-500 ease-in-out text-2xl">   
            <IoIosAddCircleOutline />
          </span>
    </button> 
  )
}
export default AddNewButton