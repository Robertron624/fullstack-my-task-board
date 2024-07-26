import type { Task } from "../types";
import { CompletedIcon, InProgressIcon, WontDoIcon } from "./StatusIcons";
import { getStatusStyles } from "../utils";

export default function TaskComponent({
  task,
}: Readonly<{
  task: Task;
}>) {
  const { name, status, description, icon } = task;
  const { icon: Icon, color, wrapperIcon } = getStatusStyles(status);

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
      <div className={`rounded-lg ${wrapperIcon} px-2 py-1 flex items-center`}>
        {Icon && <Icon />}
      </div>
    </div>
  );
}
