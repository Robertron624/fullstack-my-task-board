import type { Board, Task } from "@/app/types";
import AddNewTodo from "@/app/_components/AddNewTodo";
import TaskList from "@/app/_components/TaskList";
import { API_URL } from "@/app/config/config";

import { notFound } from "next/navigation";
import BoardHeader from "@/app/_components/BoardHeader";

const fetchTasks = async (boardId: string): Promise<Board> => {
  const url = `${API_URL}boards/${boardId}`;

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    if (response.status === 404) {
      console.error("NOT BOARD FOUND");
      return notFound();
    }

    throw new Error("Failed to fetch tasks");
  }

  const responseData = await response.json();

  return responseData;
};

export default async function BoardPage({
  params,
}: {
  params: { boardId: string };
}) {

  const boardData = await fetchTasks(params.boardId);

  const { name, tasks, description } = boardData;

  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-very-light-gray text-slate-950 gap-5'>
      <div>
        <BoardHeader name={name} description={description} />
        {tasks.length === 0 ? (
          <div className="my-4 text-center">
            <p className="text-2xl font-bold">No tasks found!</p>
            <p className="mt-3">
              Click the button below to create a new task!
            </p>
          </div>
        ) : (
          <TaskList tasks={tasks} boardId={params.boardId} />
        )}

        <AddNewTodo boardId={params.boardId} />
      </div>
    </main>
  );
}
