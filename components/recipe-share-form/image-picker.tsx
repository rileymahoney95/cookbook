'use client';

import { useState, useRef, ChangeEvent } from 'react';
import styles from './image-picker.module.css';
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
    <div className={styles.picker}>
      <label htmlFor='image'>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt='The image selected by the user.'
              fill
            />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
        <input
          className={styles.input}
          type='file'
          id='image'
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInputRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type='button'
          onClick={handlePickClick}
        >
          Choose File
        </button>
      </div>
    </div>
  );
}
