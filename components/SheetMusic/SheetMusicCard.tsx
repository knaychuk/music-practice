'use client'

import { useState } from 'react';

// icons
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmModal from '../ConfirmModal';

interface SheetMusicProps {
  userId: string;
  sheetName: string;

  handleDelete: (sheetName: string) => void;
}

const SheetMusicCard = ( {userId, sheetName, handleDelete }: SheetMusicProps ) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleShowModal = () => {
    setShowConfirmModal(true);
  }

  const handleCloseModal = () => {
    setShowConfirmModal(false);
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
        <button className="text-xl mt-4 hover:text-primary" onClick={handleShowModal}>
          <FaRegTrashAlt />
        </button>
      </div>
      {showConfirmModal && 
        <ConfirmModal confirmFunction={() => handleDelete(sheetName)} cancelFunction={handleCloseModal} />
      }

    </div>     
  )
}
export default SheetMusicCard