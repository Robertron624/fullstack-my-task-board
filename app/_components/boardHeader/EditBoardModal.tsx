import Image from "next/image";
import { createPortal } from "react-dom";
import EditBoardForm from "./EditBoardForm";

// Create a new portal for the new task modal

interface EditBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  boardData: { name: string; description?: string; _id: string };
}

export default function EditBoardModal({ isOpen, onClose, boardData }: EditBoardModalProps) {

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return createPortal(
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
      onClick={handleClickOutside}
    >
      <div className='bg-white p-6 rounded-lg text-slate-900 w-full max-w-2xl'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-bold'>
            Edit board
          </h2>
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
        <EditBoardForm onCloseModal={onClose} boardData={boardData}/>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}