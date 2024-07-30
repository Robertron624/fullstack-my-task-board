import type { Board } from "../types";
import path from "path";
import fs from "fs";

const mockDataPath = path.join(process.cwd(), "mockData.json");

export const readData = (): Board[] => {
    const data = fs.readFileSync(mockDataPath, "utf8");
    return JSON.parse(data);
  };
  
  export const writeData = (data: Board[]) => {
    fs.writeFileSync(mockDataPath, JSON.stringify(data, null, 2));
  };