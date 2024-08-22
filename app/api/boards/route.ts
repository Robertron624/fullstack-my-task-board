import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/app/config/mongoose";
import Board from "@/app/_models/Board";
import { isBoard } from "@/app/utils";

import { BOARD_NAME_MAX_LENGTH, BOARD_DESCRIPTION_MAX_LENGTH } from "@/app/constants";

// GET all boards
export async function GET(req: NextRequest) {
    try {
        
        await connectToMongoDB();

        const boards = await Board.find().exec();

      return NextResponse.json(boards, { status: 200 });
    } catch (error: any) {
      console.error("Error getting boards: ", error);
      return NextResponse.json({ error: 'An error ocurred while getting the boards.' }, { status: 500 });
    }
};

// POST a new board
export async function POST(req: NextRequest) {
  try {

    await connectToMongoDB();

    const newBoard = await req.json();

    if (!isBoard(newBoard)) {
      return NextResponse.json({ error: "Invalid board data", success: false }, { status: 400 });
    }

    if (newBoard.name.length > BOARD_NAME_MAX_LENGTH) {
      return NextResponse.json({ error: `Board name must be less than ${BOARD_NAME_MAX_LENGTH} characters`, success: false }, { status: 400 });
    }

    if (newBoard.description && newBoard.description.length > BOARD_DESCRIPTION_MAX_LENGTH) {
      return NextResponse.json({ error: `Board description must be less than ${BOARD_DESCRIPTION_MAX_LENGTH} characters`, success: false }, { status: 400 });
    }

    const board = new Board(newBoard);

    await board.save();

    return NextResponse.json({
      success: true,
      message: "Board created successfully",
      board,
    }, { status: 201 });
  } catch(error: any) {
    console.error("Error creating board: ", error);
    return NextResponse.json({ error: 'An error ocurred while creating the board.' }, { status: 500 });
  }
};