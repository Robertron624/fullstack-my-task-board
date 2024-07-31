import { NextRequest, NextResponse } from "next/server";
import { Board } from "@/app/types";
import { readData } from "../apiUtils";

export async function GET(req: NextRequest) {
    try {
        const boards: Board[] = readData();
        return NextResponse.json(boards);
    } catch (error: any) {
        console.error("Error getting boards: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};