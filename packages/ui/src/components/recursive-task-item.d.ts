import type { Task } from './task-types';
export type { Task };
export interface TaskItemContentProps {
    task: Task;
    level: number;
    isExpanded: boolean;
    hasSubTasks: boolean;
    isCompleted: boolean;
    onToggleExpand: () => void;
    onToggleStatus: () => void;
    onSelectTask: () => void;
    onAddSubTask: () => void;
    dragHandleProps?: Record<string, unknown>;
    platform?: 'web' | 'native';
}
export declare function TaskItemContent({ task, level, isExpanded, hasSubTasks, isCompleted, onToggleExpand, onToggleStatus, onSelectTask, onAddSubTask, dragHandleProps, platform, }: TaskItemContentProps): import("react/jsx-runtime").JSX.Element;
interface RecursiveTaskItemProps {
    task: Task;
    level?: number;
    onToggleStatus: (taskId: string, newStatus: string) => void;
    onAddSubTask: (parentId: string, title: string) => void;
    onSelectTask: (taskId: string) => void;
    platform?: 'web' | 'native';
}
export declare function RecursiveTaskItem({ task, level, onToggleStatus, onAddSubTask, onSelectTask, platform, }: RecursiveTaskItemProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=recursive-task-item.d.ts.map