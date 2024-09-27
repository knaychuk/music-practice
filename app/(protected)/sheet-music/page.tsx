'use client'

import AddNewButton from "@/components/Buttons/AddNewButton";
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "@/utils/supabase/client";
import { FileObject } from '@supabase/storage-js'; 
import SheetMusicCard from "@/components/SheetMusic/SheetMusicCard";
import GenericButton from "@/components/Buttons/GenericButton";

interface SheetMusicData {
  user_id: string;
  title: string;
  composer: string;
  arranged_by: string;
  file_path: string;
}

const SheetMusic = () => {
  const [sheetMusicData, setSheetMusicData] = useState<SheetMusicData[]>([]);
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

  const getSheetMusicData = async () => {
    const { data, error } = await supabase
      .from('sheet_music')
      .select()

    if (data) {
      setSheetMusicData(data);
    } else {
      throw error;
    }
  }

  const handleCreate = () => {
    setIsCreating(true);
    setFile(null);
  }

  const handleCancel = () => {
    setIsCreating(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const path = `${userId}/${uuidv4()}`

    if(file && composer) {
      const { data, error } = await supabase
        .storage
        .from('sheet-music')
        .upload(path, file)

      if (error) {
        throw error;
      }

      const { data: sheetMusicData, error: sheetMusicDataError } = await supabase
        .from('sheet_music')
        .insert({ user_id: userId, title: title, composer: composer, arranged_by: arrangedBy, file_path: path })
        .select()
        
      if (sheetMusicDataError) {
        throw sheetMusicDataError;
      }

      if (data && sheetMusicData) {
        getSheetMusic();
        getSheetMusicData();
        setIsCreating(false);
        setFile(null);
        setTitle('');
        setComposer('');
        setArrangedBy('');
      }


    } else {
      alert('All required fields must be filled');
    }
  }

  const handleDelete = async (sheetName: string) => {
    const { error } = await supabase
      .storage
      .from('sheet-music')
      .remove([ userId + '/' + sheetName ])

    if (error) {
      console.log(error);
    }

    const { data: sheetMusicData, error: sheetMusicDataError } = await supabase
      .from('sheet_music')
      .delete()
      .eq('file_path', userId + '/' + sheetName)
      .select();

    if (sheetMusicDataError) {
      console.log(sheetMusicDataError);
    }

    if (sheetMusicData) {
      getSheetMusic();
      getSheetMusicData();
      
    }
    
  }

  useEffect(() => {
    getUserId();
    getSheetMusic();
    getSheetMusicData();
  }, [userId])

  return (
    <div>
      <div className='m-4 mr-10 flex justify-end'>
        <AddNewButton buttonText='Upload New' clickFunction={handleCreate} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 xl:grid-cols-4">
        {sheetMusic.map((sheet: FileObject) => {
          const filePath = userId + '/' + sheet.name;
          const matchingEntry = sheetMusicData.find(entry =>
            entry.file_path === filePath
          );
          return (
            <div>
              <SheetMusicCard 
                key={sheet.id} 
                userId={userId} 
                sheetName={sheet.name} handleDelete={handleDelete}
                title={matchingEntry?.title || 'No Title'}
                composer={matchingEntry?.composer || 'No Composer'}
                arrangedBy={matchingEntry?.arranged_by || 'No Arrangment'}
              />
            </div>
          );
        })}
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
            onChange={(e) => setArrangedBy(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={handleCancel} 
            className="py-2 px-4 rounded-lg shadow-md bg-gray-200 text-gray-800  hover:bg-gray-300"
          >
            Cancel
          </button>
          <GenericButton buttonText="Save" clickFunction={handleUpload} />
        </div>
      </div>
    </div>
      }
    </div>
  )
}
export default SheetMusic