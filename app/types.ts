export type TaskStatus = "in-progress" | "completed" | "won't-do" | "to-do";

export interface Task {
    _id: string;
    name: string;
    description: string;
    status: TaskStatus;
    icon?: string;
}

export interface Board {
    _id: string;
    name?: string;
    tasks: Task[];
}