'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImagePickerProps {
  label: string;
  name: string;
}

export default function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handlePickClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.result) {
        setPickedImage(fileReader.result as string);
      }
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div>
      <label htmlFor='image'>{label}</label>
      <div className="flex items-center gap-6 mb-4">
        <div className="w-40 h-40 border-2 border-gray-400 flex justify-center items-center text-center text-gray-400 relative">
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt='The image selected by the user.'
              fill
              className="object-cover"
            />
          ) : (
            <p className="m-0 p-4">No image picked yet.</p>
          )}
        </div>
        <input
          className="hidden"
          type='file'
          id='image'
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className="px-6 py-4 bg-blue-500 hover:bg-gray-400 focus:bg-gray-400"
          type='button'
          onClick={handlePickClick}
        >
          Choose File
        </button>
      </div>
    </div>
  );
}
