interface GenericButtonProps {
  buttonText: string;
  clickFunction: () => void;
}

const GenericButton = ({ buttonText, clickFunction }: GenericButtonProps) => {
  return (
    <button 
      onClick={clickFunction} 
      className="py-2 px-4 rounded-lg shadow-md bg-primary text-white hover:bg-primary-hover"
    >
      {buttonText}
    </button>
  )
}
export default GenericButton