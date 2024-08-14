
import type { Task } from "@/app/types";
import AddNewTodo from "@/app/_components/AddNewTodo";
import Logo from "@/app/_components/Logo";
import TaskList from "@/app/_components/TaskList";
import { API_URL } from "@/app/config/config";

import { notFound } from "next/navigation";

const fetchTasks = async (boardId: string): Promise<Task[]> => {

  const url = `${API_URL}boards/${boardId}`;

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {

    if (response.status === 404) {
      console.log("NOT BOARD FOUND");
      return notFound();
    }

    throw new Error("Failed to fetch tasks");
  }

  const responseData = await response.json();

  return responseData.tasks;
};

export default async function BoardPage(
  { params }: { params: { boardId: string } }
) {

  const tasks = await fetchTasks(params.boardId);

  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-very-light-gray text-slate-950 gap-5'>
      <div>
        <Logo />
        {tasks.length === 0 ? (<p>
          No tasks found. Create a new task to get started
        </p>): <TaskList tasks={tasks} boardId={params.boardId}/>}
        
        <AddNewTodo boardId={params.boardId}/>
      </div>
    </main>
  );
}
