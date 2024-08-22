
import { NextRequest, NextResponse } from "next/server";

import connectToMongoDB from "@/app/config/mongoose";
import Board from "@/app/_models/Board";
import { isTask } from "@/app/utils";

// POST a new task to a board
export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    await connectToMongoDB();

    const newTask = await req.json();

    if (!isTask(newTask)) {
      return NextResponse.json({ error: "Invalid task data", success: false }, { status: 400 });
    }

    const board = await Board.findById(params.boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found", success: false }, { status: 404 });
    }

    board.tasks.push(newTask);

    await board.save();

    return NextResponse.json({
      success: true,
      message: "Task added successfully",
      newTask,
    }, { status: 201 });
  } catch (error: any) {
    console.error("Error adding task: ", error);
    const customErrorMessage = "An error ocurred while adding the task.";
    return NextResponse.json({ error: customErrorMessage }, { status: 500 });
  }
}
