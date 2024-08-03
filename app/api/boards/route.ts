import { NextRequest, NextResponse } from "next/server";
import { Board } from "@/app/types";
import { readData } from "../apiUtils";

// import connectToMongoDB from "@/app/config/mongoose";
// import BoardModel from "@/app/_models/Board";

export async function GET(req: NextRequest) {
    try {
        const boards: Board[] = readData();
        return NextResponse.json(boards);
    } catch (error: any) {
        console.error("Error getting boards: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

// export async function GET(req: NextRequest) {
//     try {
//       await connectToMongoDB();
  
//       const boards = await BoardModel.find({});

//       console.log("Boards found in GET from api, directly talking to mongo: ", boards);

//       return NextResponse.json(boards);
//     } catch (error: any) {
//       console.error("Error getting boards: ", error);
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//   }