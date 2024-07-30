import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Board, Task } from "@/app/types";
import { generateRandomId, isTask } from "@/app/utils";

// get mockData.json file
const mockDataPath = path.join(process.cwd(), "mockData.json");

const readData = (): Board[] => {
  const data = fs.readFileSync(mockDataPath, "utf8");
  return JSON.parse(data);
};

const writeData = (data: Board[]) => {
  fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 2));
};

// export async function GET(req: NextRequest) {
//   const tasks: Task[] = readData();

//   return NextResponse.json(tasks);
// }

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;

  const boards: Board[] = readData();
  const board = boards.find((b) => b.id === boardId);

  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  return NextResponse.json({ tasks: board.tasks });
}

// export async function POST(req: NextRequest) {
//   try {
//     const newTask: Task = await req.json();
//     if (!isTask(newTask)) {
//       throw new Error("Invalid task data");
//     }

//     const tasks: Task[] = readData();

//     // generate a random id for the new task
//     newTask.id = generateRandomId();

//     tasks.push(newTask);
//     writeData(tasks);
//     return NextResponse.json(newTask, { status: 201 });
//   } catch (error: any) {
//     console.error("Error adding task: ", error);
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    const newTask: Task = await req.json();
    if (!isTask(newTask)) {
      throw new Error("Invalid task data");
    }

    const boards: Board[] = readData();
    const board = boards.find((b) => b.id === params.boardId);

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    newTask.id = generateRandomId();
    board.tasks.push(newTask);
    writeData(boards);

    return NextResponse.json(
      {
        newTask,
        message: "Task added successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding task: ", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function DELETE(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     let tasks: Task[] = readData();
//     const taskIndex = tasks.findIndex((task) => task.id === id);

//     if (taskIndex === -1) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     tasks = tasks.filter((task) => task.id !== id);
//     writeData(tasks);
//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    const { id } = await req.json();
    const boards: Board[] = readData();
    const board = boards.find((b) => b.id === params.boardId);

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const taskIndex = board.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    board.tasks = board.tasks.filter((task) => task.id !== id);
    writeData(boards);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function PUT(req: NextRequest) {
//   try {
//     const updatedTask: Task = await req.json();
//     if (!isTask(updatedTask)) {
//       throw new Error("Invalid task data");
//     }

//     let tasks: Task[] = readData();
//     const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

//     if (taskIndex === -1) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     tasks[taskIndex] = updatedTask;
//     writeData(tasks);
//     return NextResponse.json(updatedTask);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

export async function PUT(req: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    const updatedTask: Task = await req.json();
    if (!isTask(updatedTask)) {
      throw new Error("Invalid task data");
    }

    const boards: Board[] = readData();
    const board = boards.find((b) => b.id === params.boardId);

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const taskIndex = board.tasks.findIndex((task) => task.id === updatedTask.id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    board.tasks[taskIndex] = updatedTask;
    writeData(boards);

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
