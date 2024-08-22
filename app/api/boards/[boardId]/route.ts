import { NextRequest, NextResponse } from "next/server";
import type { Board as BoardType, Task as TaskType } from "@/app/types";
import { isBoard, isTask } from "@/app/utils";

import connectToMongoDB from "@/app/config/mongoose";
import Board from "@/app/_models/Board";

// GET an individual Board data
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

// DELETE an individual Board
export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  try {

    await connectToMongoDB();

    const board = await Board.findById(params.boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    await board.delete();

    return NextResponse.json({ message: "Board deleted successfully", success: true });

  } catch (error: any) {
    console.error("Error deleting Board: ", error);
    const customErrorMessage = "An error ocurred while deleting the Board.";
    return NextResponse.json({ error: customErrorMessage, success: false }, { status: 400 });
  }
}

// PUT an individual Board
export async function PUT(req: NextRequest, { params }: { params: { boardId: string } }) {
  try {
    await connectToMongoDB();

    const updatedBoard = await req.json();

    if (!isBoard(updatedBoard)) {
      throw new Error("Invalid board data");
    }

    const board = await Board.findById(params.boardId).exec();

    if (!board) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    board.set(updatedBoard);

    await board.save();

    return NextResponse.json({
      success: true,
      message: "Board updated successfully",
      updatedBoard,
    });

  } catch (error: any) {
    console.error("Error updating board: ", error);
    const customErrorMessage = "An error ocurred while updating the board.";
    return NextResponse.json({ error: customErrorMessage }, { status: 400 });
  }
}
