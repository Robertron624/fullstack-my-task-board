import { NextRequest, NextResponse } from "next/server";
import connectToMongoDB from "@/app/config/mongoose";
import Board from "@/app/_models/Board";


export async function GET(req: NextRequest) {
    try {
        
        await connectToMongoDB();

        const boards = await Board.find().exec();

      return NextResponse.json(boards);
    } catch (error: any) {
      console.error("Error getting boards: ", error);
      return NextResponse.json({ error: 'An error ocurred while getting the boards.' }, { status: 500 });
    }
};

export async function POST(req: NextRequest) {
  try {

    await connectToMongoDB();

    const { name, tasks } = await req.json();

    const newBoard = new Board({
      name: name || "Untitled Board",
      tasks: tasks || [],
    });

    await newBoard.save();

    return NextResponse.json(newBoard, { status: 201 });
  } catch(error: any) {
    console.error("Error creating board: ", error);
    return NextResponse.json({ error: 'An error ocurred while creating the board.' }, { status: 500 });
  }
};