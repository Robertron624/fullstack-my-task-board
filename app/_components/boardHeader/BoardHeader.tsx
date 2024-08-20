"use client";

import Image from "next/image";
import { useState } from "react";
import EditBoardModal from "./EditBoardModal";

interface BoardHeaderProps {
  boardId: string;
  name: string;
  description?: string;
}

function EditIcon({ handleEditClick }: { handleEditClick: () => void }) {
  return (
    <button
      onClick={handleEditClick}
      className='p-1 border border-light-gray rounded-lg text-darker-blue duration-500 hover:bg-blue hover:text-white'
      title='Edit board'
    >
      <svg
        width='35'
        height='35'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M13.5 5.5L6.45321 12.5468C6.22845 12.7716 6.11607 12.8839 6.04454 13.0229C5.97301 13.1619 5.94689 13.3187 5.89463 13.6322L5.11508 18.3095C5.06262 18.6243 5.03639 18.7817 5.12736 18.8726C5.21833 18.9636 5.37571 18.9374 5.69048 18.8849L10.3678 18.1054L10.3678 18.1054C10.6813 18.0531 10.8381 18.027 10.9771 17.9555C11.1161 17.8839 11.2284 17.7716 11.4532 17.5468L11.4532 17.5468L18.5 10.5C19.5171 9.48295 20.0256 8.97442 20.1384 8.36277C20.1826 8.12295 20.1826 7.87705 20.1384 7.63723C20.0256 7.02558 19.5171 6.51705 18.5 5.5C17.4829 4.48295 16.9744 3.97442 16.3628 3.8616C16.1229 3.81737 15.8771 3.81737 15.6372 3.8616C15.0256 3.97442 14.5171 4.48294 13.5 5.5Z'
          fill='currentColor'
          fillOpacity='0.25'
        />
        <path
          d='M12.2929 6.70711L6.45321 12.5468C6.22845 12.7716 6.11607 12.8839 6.04454 13.0229C5.97301 13.1619 5.94689 13.3187 5.89463 13.6322L5.11508 18.3095C5.06262 18.6243 5.03639 18.7817 5.12736 18.8726C5.21833 18.9636 5.37571 18.9374 5.69048 18.8849L10.3678 18.1054L10.3678 18.1054C10.6813 18.0531 10.8381 18.027 10.9771 17.9555C11.1161 17.8839 11.2284 17.7716 11.4532 17.5468L11.4532 17.5468L17.2929 11.7071C17.6262 11.3738 17.7929 11.2071 17.7929 11C17.7929 10.7929 17.6262 10.6262 17.2929 10.2929L17.2929 10.2929L13.7071 6.70711C13.3738 6.37377 13.2071 6.20711 13 6.20711C12.7929 6.20711 12.6262 6.37377 12.2929 6.70711Z'
          fill='currentColor'
        />
      </svg>
      <span className='sr-only'>Edit board</span>
    </button>
  );
}

export default function BoardHeader({
  name,
  description,
  boardId,
}: BoardHeaderProps) {
  const [showEditModal, setShowEditModal] = useState(false);

  const onCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <div className='flex gap-4 flex-wrap' title='Go to Home'>
        <div className='shrink-0'>
          <Image src='/images/Logo.svg' alt='Logo' width={50} height={50} />
        </div>
        <div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <h1
                className='text-6xl font-semibold text-ellipsis overflow-hidden max-w-xl'
                title={name}
              >
                {name}
              </h1>
              <EditIcon handleEditClick={handleEditClick} />
            </div>
            {description && (
              <p
                className='text-xl overflow-hidden text-ellipsis max-w-lg'
                title={description}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      <EditBoardModal
        isOpen={showEditModal}
        onClose={onCloseEditModal}
        boardData={{ name, description, _id: boardId }}
      />
    </>
  );
}
