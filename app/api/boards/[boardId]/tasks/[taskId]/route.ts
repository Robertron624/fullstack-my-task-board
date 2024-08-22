import { NextRequest, NextResponse } from "next/server";
import type { Board as BoardType, Task as TaskType } from "@/app/types";
import { isTask } from "@/app/utils";

import connectToMongoDB from "@/app/config/mongoose";
import Board from "@/app/_models/Board";
import { TASK_NAME_MAX_LENGTH, TASK_DESCRIPTION_MAX_LENGTH } from "@/app/constants";


// GET an individual Task from a Board

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string, taskId: string } }
) {
  try {
    const { boardId, taskId } = params;
    await connectToMongoDB();

    const board = await Board.findById(boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    const task = board.tasks.id(taskId);

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error: any) {
    console.error("Error getting task: ", error);
    const customErrorMessage = "An error ocurred while getting the task data.";
    return NextResponse.json({ error: customErrorMessage }, { status: 500 });
  }
}

// PUT an individual Task from a Board

export async function PUT(
  req: NextRequest,
  { params }: { params: { boardId: string, taskId: string } }
) {
  try {
    const { boardId, taskId } = params;
    await connectToMongoDB();

    const updatedTask = await req.json();

    if (!isTask(updatedTask)) {
      throw new Error("Invalid task data");
    }

    if (updatedTask.name.length > TASK_NAME_MAX_LENGTH) {
      return NextResponse.json({ error: `Task name must be less than ${TASK_NAME_MAX_LENGTH} characters`, success: false }, { status: 400 });
    }

    if (updatedTask.description && updatedTask.description.length > TASK_DESCRIPTION_MAX_LENGTH) {
      return NextResponse.json({ error: `Task description must be less than ${TASK_DESCRIPTION_MAX_LENGTH} characters`, success: false }, { status: 400 });
    }

    const board = await Board.findById(boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found", success: false }, { status: 404 });
    }

    const task = board.tasks.id(taskId);

    if (!task) {
      return NextResponse.json({ error: "Task not found", success: false }, { status: 404 });
    }

    task.set(updatedTask);

    await board.save();

    return NextResponse.json({
      success: true,
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error: any) {
    console.error("Error updating task: ", error);
    const customErrorMessage = "An error ocurred while updating the task.";
    return NextResponse.json({ error: customErrorMessage }, { status: 500 });
  }
}

// DELETE an individual Task from a Board

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string, taskId: string } }
) {
  try {
    const { boardId, taskId } = params;
    await connectToMongoDB();

    const board = await Board.findById(boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found", success: false }, { status: 404 });
    }

    const task = board.tasks.id(taskId);

    if (!task) {
      return NextResponse.json({ error: "Task not found", success: false }, { status: 404 });
    }

    task.remove();

    await board.save();

    return NextResponse.json({ success: true, message: "Task deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting task: ", error);
    const customErrorMessage = "An error ocurred while deleting the task.";
    return NextResponse.json({ error: customErrorMessage }, { status: 500 });
  }
}