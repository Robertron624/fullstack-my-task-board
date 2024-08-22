import path from "path";
import { statusStylesObject } from "./constants";
import { Board, Task, TaskStatus } from "./types";

export const getStatusStyles = (status: TaskStatus) =>
  statusStylesObject[status];

export const generateRandomId = () => Math.random().toString(36).substr(2, 9);

export const isTask = (task: any): task is Task => {
  const hasValidStatus = ["in-progress", "completed", "won't-do"].includes(
    task.status
  );

  const isNameValid = typeof task.name === "string";
  const isDescriptionValid = typeof task.description === "string";
  const isIconValid = typeof task.icon === "string" || task.icon === undefined;
  const isStatusValid = hasValidStatus;

  return isNameValid && isDescriptionValid && isIconValid && isStatusValid;
};

// Since this function is to be used in the API route to update a board (only the name and description), by default we won't check
// if the board has tasks. If you want to check if the board has tasks and want to check if those Tasks are valid, you can pass a second argument as true.
export const isBoard = (
  board: any,
  checkFullType: boolean = false
): boolean => {
  let isValid = true;

  const isNameValid = typeof board.name === "string";

  if (!isNameValid) {
    isValid = false;
  }

  const isDescriptionValid =
    typeof board.description === "string" || board.description === undefined;

  if (!isDescriptionValid) {
    isValid = false;
  }

  if (checkFullType) {
    const hasValidTasks =
      Array.isArray(board.tasks) && board.tasks.every(isTask);

    if (!hasValidTasks) {
      isValid = false;
    }
  }

  return isValid;
};
