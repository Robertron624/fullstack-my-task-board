
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { Task } from '@/app/types';
import TaskComponent from '@/app/_components/TaskComponent';
import AddNewTodo from '@/app/_components/AddNewTodo';

export default function BoardPage() {
  const router = useRouter();
  const { boardId } = router.query;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (boardId) {
      const fetchTasks = async () => {
        const response = await fetch(`/api/board/${boardId}`);
        const data = await response.json();
        setTasks(data.tasks);
      };

      fetchTasks();
    }
  }, [boardId]);

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
