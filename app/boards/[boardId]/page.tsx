
import type { Task } from "@/app/types";
import TaskComponent from "@/app/_components/TaskComponent";
import AddNewTodo from "@/app/_components/AddNewTodo";
import Logo from "@/app/_components/Logo";

const fetchTasks = async (boardId: string): Promise<Task[]> => {
  const response = await fetch(`http://localhost:3000/api/boards/${boardId}`, { cache: 'no-store' });
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
        <div className='flex flex-col gap-6 mt-8 w-full justify-start items-start'>
          {tasks.map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
        </div>
        <AddNewTodo boardId={params.boardId}/>
      </div>
    </main>
  );
}
