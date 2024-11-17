import React from 'react';

interface SuccessDialogProps {
  onClose: () => void;
}

export default function SuccessDialog({ onClose }: SuccessDialogProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
      <div className="w-[90%] max-w-[400px] bg-white p-8 rounded-lg text-center shadow-lg">
        <h2 className="text-2xl mb-4 text-green-500">Success!</h2>
        <button 
          className="bg-green-500 text-white px-4 py-2 text-base rounded hover:bg-green-600 transition-colors duration-300 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
