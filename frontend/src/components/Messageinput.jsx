import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

import { FaRegImage, FaXmark } from 'react-icons/fa6'
import { IoMdSend } from "react-icons/io";

import { useChatStore } from '../store/useChatStore'

const Messageinput = () => {

  const [text,setText] = useState('')
  const [imagePreview,setimagepreview] = useState(null)
  const fileInputRef = useRef(null)
  const {sendMessage} = useChatStore()

  const hanldeimageChange = async (e)=>{
    const file = e.target.files[0]
    if(!file?.type.startsWith('image/')){
      toast.error("Please select an image file")
      return ;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large (max 2MB)");
      return;
    }
    
    try {
      const options = {
        maxSizeMB: 2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
  
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setimagepreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image compression failed", error);
      toast.error("Image processing failed");
    }
  }

  const removeImage = ()=>{
    setimagepreview(null)
    if(fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSendMessage = async(e)=>{
    e.preventDefault()
    if(!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text : text.trim(),
        image : imagePreview
      })
      setText('')
      setimagepreview(null)
      if(fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("failed to send message",error)
    }
  }


  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <FaXmark className="size-3" />
            </button>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className='flex items-center gap-1'>
          <div className="flex-1 flex gap-1">
              <input type="text"
                     className='w-full input input-bordered rounded-lg input-sm sm:input-md'
                     placeholder='Type a message...'
                     value={text}
                     onChange={(e)=>setText(e.target.value)}
              />
              <input type="file"
                     accept='image/*'
                     className='hidden'
                     ref={fileInputRef}
                     onChange={hanldeimageChange} 
              />
              <button type='button'
                      className={`flex btn btn-sm btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                      onClick={()=>fileInputRef.current?.click()}
              >
                  <FaRegImage size={20} />
              </button>
          </div>
          <button type='submit'
                  className='btn btn-sm btn-circle'
                  disabled={!text.trim() && !imagePreview}>
                <IoMdSend size={20} />
          </button>
      </form>
    </div>
  )
}

export default Messageinput
