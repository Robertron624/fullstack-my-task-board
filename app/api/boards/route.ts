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

        const boards = await Board.find().exec();

        console.log("Boards in api: ", boards);
      return NextResponse.json(boards);
    } catch (error: any) {
      console.error("Error getting boards: ", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }