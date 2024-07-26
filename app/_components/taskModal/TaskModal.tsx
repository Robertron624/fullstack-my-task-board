import Image from "next/image";
import { createPortal } from "react-dom";
import { taskIconOptions, statusOptions } from "@/app/constants";
import { useState } from "react";
import { getStatusStyles } from "@/app/utils";
import { TaskStatus } from "@/app/types";

// Create a new portal for the new task modal

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode?: boolean;
}

export default function Modal({ isOpen, onClose, isEditMode=true }: ModalProps) {
  const [selectedIcon, setSelectedIcon] = useState(taskIconOptions[0].label);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIcon(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.value as TaskStatus);
  };

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
          <h2 className='text-2xl font-bold'>Add new task</h2>
          <button onClick={onClose} className='py-2 px-3 border border-light-gray rounded-lg'>
            <Image
              src='/images/close_ring_duotone-1.svg'
              alt='Close'
              width={25}
              height={25}
            />
            <span className='sr-only'>Close modal</span>
          </button>
        </div>
        <form className='mt-6'>
          <label htmlFor='task-name' className='block text-sm text-medium-gray mb-1'>
            Task name
          </label>
          <input
            type='text'
            id='task-name'
            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue focus:border-blue focus:border-0 focus:border-none'
            placeholder='Enter task name'
          />
          <label
            htmlFor='task-desc'
            className='block text-sm mt-4 text-medium-gray mb-1'
          >
            Description
          </label>
          <textarea
            id='task-desc'
            className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue focus:border-blue focus:border-0 focus:border-none'
            placeholder='Enter a short description'
            rows={6}
          ></textarea>
          <div className='mt-6'>
            <p className='mb-2 text-medium-gray text-sm'>Icon</p>
            <div className='flex gap-3'>
              {/* each of the task icon options is a radio button */}
              {taskIconOptions.map((option) => {
                return (
                  <label
                    key={option.label}
                    className={`flex items-center w-11 h-11 justify-center rounded-lg p-3 cursor-pointer ${
                      selectedIcon === option.value
                        ? "bg-light-yellow"
                        : "bg-light-blue-gray"
                    }`}
                  >
                    <input
                      type='radio'
                      name='taskIcon'
                      value={option.value}
                      checked={selectedIcon === option.value}
                      onChange={handleIconChange}
                      className='sr-only'
                    />
                    {option.value}
                    <span className='sr-only'>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className='mt-6'>
            <p className='mb-2 text-medium-gray text-sm'>Status</p>
            <div className='flex gap-3 flex-wrap'>
              {/* each of the task status options is a radio button */}
              {statusOptions.map((option) => {

                const { icon: Icon, color, wrapperIcon } = getStatusStyles(option.value);
                return (
                  <label
                    key={option.label}
                    className={`flex items-center w-72 justify-start rounded-xl h-14 py-1 px-1 cursor-pointer border-[2.5px] ${
                      selectedStatus === option.value
                        ? "border-blue"
                        : "border-light-gray"
                    }`}
                  >
                    <input
                      type='radio'
                      name='taskStatus'
                      value={option.value}
                      checked={selectedIcon === option.value}
                      onChange={handleStatusChange}
                      className='sr-only'
                    />
                    <div className="flex gap-2 items-center font-medium">
                      <div className={`rounded-lg ${wrapperIcon} px-2 py-1`}>
                          {Icon && <Icon />}
                      </div>
                      {option.label}
                    </div>
                    <span className='sr-only'>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className='flex mt-28'>
            {isEditMode ? (
              <div className="flex gap-4 justify-end items-center w-full">
                <button
                type="button"
                  className=' bg-medium-gray text-very-light-gray py-2 px-8 mt-4 rounded-2xl font-semibold flex gap-2 items-center'
                >
                  Delete
                  <Image
                    src='/images/Trash.svg'
                    alt='Delete'
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  type='button'
                  className=' py-2 px-8 mt-4 rounded-2xl font-bold ml-2 flex items-center gap-2 bg-blue text-very-light-gray'
                >
                  Save
                  <Image
                    src='/images/Done_round.svg'
                    alt='Save'
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            ): (<button
              type='submit'
              className='w-full bg-light-yellow py-2 px-4 mt-4 rounded font-bold'
            >
              Add task
            </button>)}
            
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
