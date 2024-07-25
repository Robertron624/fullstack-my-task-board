export type TaskStatus = "in-progress" | "completed" | "won't-do" | "to-do";

export interface Task {
    id: string;
    name: string;
    description: string;
    status: TaskStatus;
    icon?: string;
}