import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import TaskForm from "./TaskForm";
import { Task } from "@/app/types";

// Create a new portal for the new task modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean;
  boardId: string;
  task?: Task | null | undefined;
}

export default function TaskModal({ isOpen, onClose, isEditMode=false, boardId, task }: ModalProps) {

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close modal when pressing the escape key
  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    <div className='fixed overflow-y-scroll inset-0 bg-black bg-opacity-50 flex justify-center items-center'
      onClick={handleClickOutside}
    >
      <div className='bg-white p-6 rounded-lg text-slate-900 w-full max-w-2xl'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-bold'>Add new task</h2>
          <button onClick={onClose} className='py-2 px-3 border border-light-gray rounded-lg' title="Close modal">
            <Image
              src='/images/close_ring_duotone-1.svg'
              alt='Close'
              width={25}
              height={25}
            />
            <span className='sr-only'>Close modal</span>
          </button>
        </div>
        <TaskForm isEditMode={isEditMode} onCloseModal={onClose} boardId={boardId} task={task}/>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
