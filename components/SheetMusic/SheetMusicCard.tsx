import GenericButton from "../Buttons/GenericButton";

// icons
import { FaRegTrashAlt } from "react-icons/fa";

interface SheetMusicProps {
  userId: string;
  sheetName: string;
}

const SheetMusicCard = ( {userId, sheetName}: SheetMusicProps ) => {

  const handleOpen = () => {

  }

  return (
    <div className="bg-neutral mx-4 px-5 pt-8 pb-4 rounded-md">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl">Sheet Music Title</h2>
        {/* <GenericButton buttonText="View" clickFunction={handleOpen} /> */}
        <a 
          href={`https://bjpnluypnffrblhymtbz.supabase.co/storage/v1/object/public/sheet-music/${userId}/${sheetName}`}
          className="py-2 px-4 rounded-lg shadow-md bg-primary text-white hover:bg-primary-hover"
          target="_blank"
        >
          View
        </a>
      </div>
      <div className="mb-2">
        <p>Composer:</p>
        <p>Arranged By:</p>
      </div>
      <div className="flex flex-row justify-center">
        <iframe
          src={`https://bjpnluypnffrblhymtbz.supabase.co/storage/v1/object/public/sheet-music/${userId}/${sheetName}`}
          className="max-w-[350px] m-h-[450px]"
          width={350}
          height={450}
        />   
      </div>
      <div className="flex flex-row justify-end">
        <button className="text-xl mt-4">
          <FaRegTrashAlt />
        </button>
      </div>
    </div>     
  )
}
export default SheetMusicCard