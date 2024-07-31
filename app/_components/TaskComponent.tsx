"use client";

import { useState } from "react";
import type { Task } from "../types";
import { getStatusStyles } from "../utils";
import TaskModal from "./taskModal/TaskModal";

export default function TaskComponent({
  task,
  boardId,
}: Readonly<{
  task: Task;
  boardId: string;
}>) {
  const { name, status, description, icon } = task;
  const { icon: Icon, color, wrapperIcon } = getStatusStyles(status);

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleTaskElementClick = () => {
      setShowUpdateForm(true);
  };

  const handleOnClose = () => {
    console.log("TaskComponent handleOnClose clicked close button");
    setShowUpdateForm(false);
  };

  return (
    <button
      className={`cursor-pointer max-w-4xl w-full flex justify-between gap-4 p-4 rounded-lg shadow-md ${color}`}
      onClick={handleTaskElementClick}
    >
      <div className='flex gap-4 items-center'>
        {icon && <div className='bg-white p-2 rounded-md text-lg'>{icon}</div>}
        <div className='flex flex-col gap-1'>
          <p className='font-bold text-xl'>{name}</p>
          {status === "to-do" && (
            <p className='text-md text-slate-900'>{description}</p>
          )}
        </div>
      </div>
      <div className={`rounded-lg ${wrapperIcon} px-2 py-1 flex items-center`}>
        {Icon && <Icon />}
      </div>
      <TaskModal isOpen={showUpdateForm} onClose={handleOnClose} boardId={boardId} isEditMode={true} task={task}/>
    </button>
  );
}
