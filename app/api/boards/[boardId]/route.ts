import { NextRequest, NextResponse } from "next/server";
import type { Board as BoardType, Task as TaskType } from "@/app/types";
import { isTask } from "@/app/utils";
import { readData, writeData } from "@/app/api/apiUtils";

import connectToMongoDB from "@/app/config/mongoose";
import Board from "@/app/_models/Board";

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    const { boardId } = params;
    await connectToMongoDB();

    const board = await Board.findById(boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    return NextResponse.json(board);
  }catch(error: any){
    console.error("Error getting boards: ", error);
    const customErrorMessage = "An error ocurred while getting the board data.";
    return NextResponse.json({ error: customErrorMessage}, { status: 500 });
  }

}

export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {
    await connectToMongoDB();

    const newTask = await req.json();

    if (!isTask(newTask)) {
      throw new Error("Invalid task data");
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
    return NextResponse.json({ error: customErrorMessage }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {

    await connectToMongoDB();

    const { id: taskId } = await req.json();

    const board = await Board.findById(params.boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const taskIndex = board.tasks.findIndex((task: TaskType) => task._id.toString() === taskId);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    board.tasks.splice(taskIndex, 1);

    await board.save();

    return NextResponse.json({ message: "Task deleted successfully", success: true });

  } catch (error: any) {
    console.error("Error deleting task: ", error);
    const customErrorMessage = "An error ocurred while deleting the task.";
    return NextResponse.json({ error: customErrorMessage, success: false }, { status: 400 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    await connectToMongoDB();

    const updatedTask = await req.json();

    if (!isTask(updatedTask)) {
      throw new Error("Invalid task data");
    }

    const board = await Board.findById(params.boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const taskIndex = board.tasks.findIndex((task: TaskType) => task._id.toString() === updatedTask._id);

    if (taskIndex === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    board.tasks[taskIndex] = updatedTask;

    await board.save();

    return NextResponse.json({ message: "Task updated successfully", success: true });

  } catch (error: any) {
    console.error("Error updating task: ", error);
    const customErrorMessage = "An error ocurred while updating the task.";
    return NextResponse.json({ error: customErrorMessage }, { status: 400 });
  }
}
