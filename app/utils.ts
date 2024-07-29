import { statusStylesObject } from "./constants";
import { Task, TaskStatus } from "./types";

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