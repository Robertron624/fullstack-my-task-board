import { NextRequest, NextResponse } from "next/server";
import type { Board, Task } from "@/app/types";
import { generateRandomId, isTask } from "@/app/utils";
import { readData, writeData } from "@/app/api/apiUtils";

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
