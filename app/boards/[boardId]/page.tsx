
import type { Task } from "@/app/types";
import AddNewTodo from "@/app/_components/AddNewTodo";
import Logo from "@/app/_components/Logo";
import TaskList from "@/app/_components/TaskList";
import { API_URL } from "@/app/config/config";

const fetchTasks = async (boardId: string): Promise<Task[]> => {

  const url = `${API_URL}boards/${boardId}`;

  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
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
        <TaskList tasks={tasks} boardId={params.boardId}/>
        <AddNewTodo boardId={params.boardId}/>
      </div>
    </main>
  );
}
