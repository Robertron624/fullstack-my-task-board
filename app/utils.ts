import { statusStylesObject } from "./constants";
import { TaskStatus } from "./types";

export const getStatusStyles = (status: TaskStatus) => statusStylesObject[status];