"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "@/app/config/config";
export default function BoardsPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createBoardAndRedirect = async () => {
      try {

        // Check if we're already creating a board to avoid creating multiple boards
        if(localStorage.getItem("creatingBoard")) {
          return;
        }
        localStorage.setItem("creatingBoard", "true");

        const existingBoardId = localStorage.getItem("boardId");

        if (existingBoardId) {
          
          // Check if the board exists in the database before redirecting

          const url = `${API_URL}boards/${existingBoardId}`;

          const response = await fetch(url, { cache: "no-store" });

          const board = await response.json();

          if (response.ok) {
            router.push(`/boards/${board._id}`);
            return;
          } else {
          
            // If the board doesn't exist, remove the board ID from local storage
            localStorage.removeItem("boardId");
          }
        }

        const newBoard = {
          name: "New Board",
          tasks: [],
        };

        const url = `${API_URL}boards`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBoard),
        });

        if (!response.ok) {
          console.error("Failed to create board: ", response);
          throw new Error("Failed to create board");
        }

        const createdBoard = await response.json();

        // Store the board ID in local storage so we can retrieve it later and not create a new board
        localStorage.setItem("boardId", createdBoard._id);

        router.push(`/boards/${createdBoard._id}`);
      } catch (error) {
        console.error("Error creating board: ", error);
        setError("An error occurred. Please try again later.");
      } finally {
        localStorage.removeItem("creatingBoard");
      }
    };

    createBoardAndRedirect();
  }, [router]);

    if (error) {
        return <div>{error}</div>;
    }

  return (
    <div>
      <h1>
        Creating board...
      </h1>
    </div>
  );
}
