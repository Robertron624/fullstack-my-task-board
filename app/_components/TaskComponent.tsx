import type { Task } from "../types";
import { getStatusStyles } from "../utils";

export default function TaskComponent({
  task,
  onClick,
}: Readonly<{
  task: Task;
  onClick: () => void;
}>) {
  const { name, status, description, icon } = task;
  const { icon: Icon, color, wrapperIcon } = getStatusStyles(status);

  return (
    <button
      className={`cursor-pointer max-w-4xl w-full flex justify-between gap-4 p-4 rounded-lg shadow-md ${color} duration-300 hover:scale-105`}
      onClick={onClick}
    >
      <div className='flex gap-4 items-center'>
        {icon && <div className='bg-white p-2 rounded-md text-lg'>{icon}</div>}
        <div className='flex flex-col gap-1'>
          <p className='font-bold text-xl text-left'>{name}</p>
          {status === "to-do" && (
            <p className='text-md text-slate-900'>{description}</p>
          )}
        </div>
      </div>
      <div className={`rounded-lg ${wrapperIcon} px-2 py-1 flex items-center`}>
        {Icon && <Icon />}
      </div>
    </button>
  );
}
