import type { Task, TaskStatus } from "../types";
import Image from "next/image";

import { CompletedIcon, InProgressIcon, WontDoIcon } from "./StatusIcons";

const statusStylesObject = {
  "in-progress": {
    icon: InProgressIcon,
    color: "bg-light-yellow",
  },
  completed: {
    icon: CompletedIcon,
    color: "bg-light-green",
  },
  "won't-do": {
    icon: WontDoIcon,
    color: "bg-light-pink",
  },
  "to-do": {
    icon: null,
    color: "bg-light-blue-gray",
  },
};

const getStatusStyles = (status: TaskStatus) => statusStylesObject[status];

export default function TaskComponent({
  task,
}: Readonly<{
  task: Task;
}>) {
  const { name, status, description, icon } = task;
  const { icon: Icon, color } = getStatusStyles(status);

  return (
    <div
      className={`max-w-4xl w-full flex justify-between gap-4 p-4 rounded-lg shadow-md ${color}`}
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
      {Icon && <Icon />}
    </div>
  );
}
