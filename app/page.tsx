import { Board, Task } from "./types";
import Link from "next/link";
import Logo from "./_components/Logo";

import { API_URL } from "./config/config";

const fetchBoards = async (): Promise<Board[]> => {
  const url = `${API_URL}boards`;
  const response = await fetch(url, {
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
        {boards.length > 0 ? (
          <div className='flex flex-col gap-6 mt-8 w-full justify-start items-start'>
            {boards.map((board) => {
              return (
                <div key={board._id} className='w-full flex justify-between'>
                  <h2 className='text-2xl font-semibold'>{board.name}</h2>
                  <Link href={`/boards/${board._id}`}>
                    <span className='text-xl hover:underline text-blue focus:outline-none duration-300'>
                      Go to board
                    </span>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center border border-blue mt-6 rounded-md px-4 py-3">
            <p className="mt-6 font-bold text-3xl text-center">No Boards Found</p>
            <p className="mt-4 text-center">Create a new board to get started!</p>
            <button className="rounded-lg p-4 bg-blue font-bold text-slate-100 mt-8 hover:bg-dark-blue focus:outline-none duration-300">
              Create a new board!
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
