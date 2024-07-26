import { CompletedIcon, InProgressIcon, WontDoIcon } from "./_components/StatusIcons";
import type { TaskStatus } from "./types"

export const taskIconOptions = [
    {
        label: "book",
        value: "📚"
    },
    {
        label: "coffee",
        value: "☕️"
    },
    {
        label: "heart",
        value: "❤️"
    },
    {
        label: "clock",
        value: "⏰"
    },
    {
        label: "rocket",
        value: "🚀"
    },
    {
        label: "computer",
        value: "💻"
    },
    {
        label: "bulb",
        value : "💡"
    },
    {
        label: "bubble",
        value: "💬"
    }
]

interface StatusOptionInterface {
    label: string;
    value: TaskStatus;
}

export const statusOptions: { label: string, value: TaskStatus }[] = [
    // {
    //     label: "To do",
    //     value: "to-do"
    // },
    {
        label: "In progress",
        value: "in-progress"
    },
    {
        label: "Completed",
        value: "completed"
    },
    {
        label: "Won't do",
        value: "won't-do"
    }
]

export const statusStylesObject = {
    "in-progress": {
      icon: InProgressIcon,
      color: "bg-light-yellow",
      wrapperIcon: "bg-orange"
    },
    completed: {
      icon: CompletedIcon,
      color: "bg-light-green",
     wrapperIcon: "bg-green"
    },
    "won't-do": {
      icon: WontDoIcon,
      color: "bg-light-pink",
      wrapperIcon: "bg-red"
    },
    "to-do": {
      icon: null,
      color: "bg-light-blue-gray",
      wrapperIcon: null
    },
  };