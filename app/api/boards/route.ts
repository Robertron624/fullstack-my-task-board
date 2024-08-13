import { NextRequest, NextResponse } from "next/server";
// import { Board } from "@/app/types";
// import { readData } from "../apiUtils";

import connectToMongoDB from "@/app/config/mongoose";
import Board from "@/app/_models/Board";

// import { getAllBoards } from "@/app/_db/getBoards";

// export async function GET(req: NextRequest) {
//     try {
//         const boards: Board[] = readData();
//         return NextResponse.json(boards);
//     } catch (error: any) {
//         console.error("Error getting boards: ", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// };


export async function GET(req: NextRequest) {
    try {
        
        await connectToMongoDB();

        // const newBoard = new Board({
        //     title: "Board 2",
        //     tasks: [
        //       {
        //         name: "Task 1 from board 2",
        //         description: "Description 1 from board 2",
        //         status: "to-do",
        //       },
        //       {
        //         name: "Task 2 from board 2",
        //         description: "Description 2 from board 2",
        //         status: "in-progress",
        //       }
        //     ]
        // });

        // try {
        //     await newBoard.save();
        // } catch (error) {
        //     console.error("Error saving board: ", error);
        // }

        const boards = await Board.find().exec();

      return NextResponse.json(boards);
    } catch (error: any) {
      console.error("Error getting boards: ", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }