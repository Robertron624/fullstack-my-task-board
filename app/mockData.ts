import type { Task } from "./types";

import { taskIconOptions } from "./constants";

const mockTasks: Task[] = [
    {
        id: "1",
        name: "Task 1",
        description: "Task 1 description",
        status: "in-progress",
        icon: taskIconOptions[0].value,
    },
    {
        id: "2",
        name: "Task 2",
        description: "Task 2 description",
        status: "completed",
        icon: taskIconOptions[1].value,
    },
    {
        id: "3",
        name: "Task 3",
        description: "Task 3 description",
        status: "won't-do",
        icon: taskIconOptions[2].value,
    },
    {
        id: "4",
        name: "Task 4",
        description: "Task 4 description",
        status: "to-do",
        icon: taskIconOptions[3].value,
    }
];

export default mockTasks;