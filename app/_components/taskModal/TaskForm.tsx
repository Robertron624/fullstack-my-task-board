import Image from "next/image";
import { taskIconOptions, statusOptions } from "@/app/constants";
import { TaskStatus } from "@/app/types";
import { useState } from "react";
import { getStatusStyles } from "@/app/utils";

import { useForm, SubmitHandler } from "react-hook-form";

interface TaskFormProps {
  isEditMode?: boolean;
}

interface TaskFormValues {
  taskName: string;
  taskDesc: string;
  taskIcon: string;
  taskStatus: TaskStatus | null;
}

export default function TaskForm({ isEditMode = false }: TaskFormProps) {
  const [selectedIcon, setSelectedIcon] = useState(taskIconOptions[0].label);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>();

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    console.log(data);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIcon(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStatus(e.target.value as TaskStatus);
  };

  return (
    <form className='mt-6'
      onSubmit={handleSubmit(onSubmit)}
    >
      <label
        htmlFor='task-name'
        className='block text-sm text-medium-gray mb-1'
      >
        Task name
      </label>
      <input
        type='text'
        id='task-name'
        className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue focus:border-blue focus:border-0 focus:border-none'
        placeholder='Enter task name'
        {...register("taskName", {
          required: true,
          maxLength: { value: 80, message: "Task name is too long" },
          minLength: { value: 3, message: "Task name is too short" },
        })}
      />
        {errors.taskName && (
            <p className='text-red text-sm mt-1'>
              {errors.taskName.message || "Task name is required"}
            </p>
        )}
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
        {...register("taskDesc", {
          required: true,
          maxLength: { value: 200, message: "Description is too long" },
          minLength: { value: 3, message: "Description is too short" },
        })}
      ></textarea>
      {errors.taskDesc && (
        <p className='text-red text-sm mt-1'>
          {errors.taskDesc.message || "Description is required"}
        </p>
      )}
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
                  // name='taskIcon'
                  value={option.value}
                  checked={selectedIcon === option.value}
                  // onChange={(e) => {
                  //   handleIconChange(e);
                  //   register("taskIcon").onChange(e);
                  // }}
                  className='sr-only'
                  {...register("taskIcon")}
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
            const {
              icon: Icon,
              color,
              wrapperIcon,
            } = getStatusStyles(option.value);
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
                  // name='taskStatus'
                  value={option.value}
                  checked={selectedIcon === option.value}
                  // onChange={(e) => {
                  //   handleStatusChange(e);
                  //   register("taskStatus").onChange(e);
                  // }}
                  className='sr-only'

                  {...register("taskStatus")}
                />
                <div className='flex gap-2 items-center font-medium'>
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
          <div className='flex gap-4 justify-end items-center w-full'>
            <button
              type='button'
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
        ) : (
          <button
            type='submit'
            className='w-full bg-light-yellow py-2 px-4 mt-4 rounded font-bold hover:bg-yellow-500 duration-300 ease-in-out'
          >
            Add task
          </button>
        )}
      </div>
    </form>
  );
}
