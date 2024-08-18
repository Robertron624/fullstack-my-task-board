"use client";

import Image from "next/image";
import { useState } from "react";
import EditBoardModal from "./EditBoardModal";

interface BoardHeaderProps {
  boardId: string;
  name: string;
  description?: string;
}

export default function BoardHeader({ name, description, boardId }: BoardHeaderProps) {

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
              <h1 className='text-6xl font-semibold'>{name}</h1>
              <button
                onClick={handleEditClick}
                className='p-1 border border-light-gray rounded-lg'
                title='Edit board'
              >
                <Image
                  src='/images/Edit_duotone.svg'
                  alt='Pencil'
                  width={35}
                  height={35}
                />
              </button>
            </div>
            {description && <p className='text-xl'>{description}</p>}
          </div>
        </div>
      </div>
      <EditBoardModal isOpen={showEditModal} onClose={onCloseEditModal} boardData={{ name, description, _id: boardId }} />
    </>
  );
}
