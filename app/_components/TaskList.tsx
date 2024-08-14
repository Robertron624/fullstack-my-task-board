"use client";

import { useState } from "react";
import { Task } from "../types";
import TaskComponent from "./TaskComponent";
import TaskModal from "./taskModal/TaskModal";

interface TaskListProps {
  tasks: Task[];
  boardId: string;
}

export default function TaskList({ tasks, boardId }: TaskListProps) {

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setShowUpdateForm(true);
    };
  
    const handleOnClose = () => {
      setShowUpdateForm(false);
      setSelectedTask(null);
    };

  return (
    <>
      <div className='flex flex-col gap-6 mt-8 w-full justify-start items-start'>
        {tasks.map((task) => (
          <TaskComponent key={task._id} task={task} onClick={() => handleTaskClick(task)} />
        ))}
      </div>
        <TaskModal isOpen={showUpdateForm} onClose={handleOnClose} boardId={boardId} isEditMode={true} task={selectedTask}/>
    </>
  );
}
