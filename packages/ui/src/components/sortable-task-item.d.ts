import type { Task } from './task-types';
interface SortableTaskItemProps {
    task: Task;
    level?: number;
    onToggleStatus: (id: string, status: string) => void;
    onAddSubTask: (parentId: string, title: string) => void;
    onSelectTask: (id: string) => void;
    platform?: 'web' | 'native';
}
export declare function SortableTaskItem({ task, level, onToggleStatus, onAddSubTask, onSelectTask, platform, }: SortableTaskItemProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=sortable-task-item.d.ts.map