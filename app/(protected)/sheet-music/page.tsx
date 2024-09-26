'use client'

import AddNewButton from "@/components/Buttons/AddNewButton";
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "@/utils/supabase/client";
import { FileObject } from '@supabase/storage-js'; 

const SheetMusic = () => {
  const [sheetMusic, setSheetMusic] = useState<FileObject[]>([]);
  const [file, setFile] =  useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [arrangedBy, setArrangedBy] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [userId, setUserId] = useState('');

  const supabase = createClient();

  const getUserId = async () => {
    try {
      const response = await fetch('/api/getUserId');
      const data = await response.json();
      if (data.id) {
        setUserId(data.id);
        console.log(userId);
      } else {
        setUserId('');
      }
    } catch (err) {
    }


  }

  const getSheetMusic = async () => {
    const { data, error } = await supabase
      .storage
      .from('sheet-music')
      .list(userId + '/', {
        limit: 100,
        offset: 0,
        sortBy: {
          column: 'name', 
          order: 'asc'
        }
      });

      if (data) {
        setSheetMusic(data)
      } else {
        console.log(error)
      }
  }

  const handleCreate = () => {
    setIsCreating(true);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const path = `${userId}/${uuidv4()}`

    if(file) {
      const { data, error } = await supabase
        .storage
        .from('sheet-music')
        .upload(path, file)

      if (data) {
        getSheetMusic();
      } else {
        console.log(error);
      }

    }

  }

  const handleCancel = () => {
    setIsCreating(false);
  }

  useEffect(() => {
    getUserId();
    getSheetMusic();
  }, [userId])

  return (
    <div>
      <div className='m-2 flex justify-end'>
        <AddNewButton buttonText='Upload New' clickFunction={handleCreate} />
      </div>

      {isCreating && 
      <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleCancel}  
      >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-xl font-semibold mb-4">Upload Sheet Music</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">File</label>
          <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sheet Music Name</label>
          <input
            type="text"
            placeholder="Sheet Music Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Composer</label>
          <input
            type="text"
            placeholder="Composer"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Arranged By (optional)</label>
          <input
            type="text"
            placeholder="Arranged By"
            value={arrangedBy}
            onChange={(e) => setComposer(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={handleCancel} 
            className="py-2 px-4 rounded-lg shadow-lg bg-gray-200 text-gray-800  hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            onClick={handleUpload} 
            className="py-2 px-4 rounded-lg shadow-lg bg-primary text-white  hover:bg-primary-hover"
          >
            Save
          </button>
        </div>
      </div>
    </div>
      }
    </div>
  )
}
export default SheetMusic