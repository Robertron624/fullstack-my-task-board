
import { Board, Task } from "./types";
import Link from "next/link";
import Logo from "./_components/Logo";

const getTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      method: "GET",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const tasks = await response.json();
  return tasks;
};

const fetchBoards = async (): Promise<Board[]> => {
  const response = await fetch("http://localhost:3000/api/boards", {
    cache: "no-store",
  });
  if (!response.ok) {
    console.error("Failed to fetch boards: ", response);
    throw new Error("Failed to fetch boards");
  }
  const boards = await response.json();
  return boards;
};

export default async function Home() {

  const boards = await fetchBoards();

  return (
    <main className='flex min-h-screen flex-col items-center p-24 bg-very-light-gray text-slate-950 gap-5'>
      <div>
        <Logo />
        <div className='flex flex-col gap-6 mt-8 w-full justify-start items-start'>
          {boards.map((board) => (
            <div key={board.id} className='w-full flex justify-between'>
              <h2 className='text-2xl font-semibold'>{board.name}</h2>
              <Link href={`/boards/${board.id}`}>
                <span className="text-xl hover:underline text-blue focus:outline-none duration-300">
                  Go to board
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
