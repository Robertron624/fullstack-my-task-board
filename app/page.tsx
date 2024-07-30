import Image from "next/image";

import TaskComponent from "./_components/TaskComponent";
import AddNewTodo from "./_components/AddNewTodo";
import { Task } from "./types";

const getTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3000/api/tasks", {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'method': 'GET'
    }
  }); // asegúrate de usar la URL correcta de tu API
  if (!response.ok) {
    
    throw new Error('Failed to fetch tasks');
  }
  const tasks = await response.json();
  return tasks;
};

export default async function Home() {

  const tasks = await getTasks();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-very-light-gray text-slate-950 gap-5">
      <div>
        <div className="flex gap-4 flex-wrap">
          <div className="shrink-0">
            <Image
              src="/images/Logo.svg"
              alt="Logo"
              width={50}
              height={50}
              priority={true}
            />
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-6xl font-semibold">My Task Board</h1>
                <Image
                  src="/images/Edit_duotone.svg"
                  alt="Pencil"
                  width={35}
                  height={35}
                />
              </div>
              <p className="text-xl">
                Tasks to keep organized
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-8 w-full justify-start items-start">
          {tasks.map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
        </div>
        <AddNewTodo />
      </div>
    </main>
  );
}
