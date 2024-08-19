import path from "path";
import { statusStylesObject } from "./constants";
import { Board, Task, TaskStatus } from "./types";

export const getStatusStyles = (status: TaskStatus) => statusStylesObject[status];

export const generateRandomId = () => Math.random().toString(36).substr(2, 9);

export const isTask = (task: any): task is Task => {

    const hasValidStatus = ["in-progress", "completed", "won't-do"].includes(task.status);

    const isNameValid = typeof task.name === 'string';
    const isDescriptionValid = typeof task.description === 'string';
    const isIconValid = typeof task.icon === 'string' || task.icon === undefined;
    const isStatusValid = hasValidStatus;

    return (
      isNameValid &&
      isDescriptionValid &&
      isIconValid &&
      isStatusValid
    );
};

export const isBoard = (board: any): board is Board => {
    const isNameValid = typeof board.name === 'string';
    const isTasksValid = Array.isArray(board.tasks) && board.tasks.every(isTask);
    return isNameValid && isTasksValid;
}
