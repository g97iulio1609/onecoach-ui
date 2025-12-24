/**
 * DayEditorShell Component
 *
 * Generic shell component for day editors in visual builders.
 * Provides DnD context, header with stats, empty state, and mobile CTA.
 * Follows SRP - handles layout/structure, delegates content to children.
 *
 * @example
 * <DayEditorShell
 *   title="Giorno 1"
 *   itemCount={3}
 *   itemLabel="Esercizi"
 *   emptyIcon={<Dumbbell />}
 *   emptyMessage="Nessun esercizio"
 *   addButtonLabel="Aggiungi Esercizio"
 *   onAdd={() => setIsSelectorOpen(true)}
 *   themeColor="primary"
 * >
 *   {(dndContextId) => (
 *     <SortableContext items={items}>
 *       {items.map(item => <ItemCard key={item.id} ... />)}
 *     </SortableContext>
 *   )}
 * </DayEditorShell>
 */

'use client';

import { useId, type ReactNode } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Button } from '../../button';
import { Plus } from 'lucide-react';
import { cn } from '@onecoach/lib-design-system';

export interface DayEditorShellProps {
  /** Day title (e.g., "Giorno 1", day name) */
  title: string;
  /** Number of items in the day */
  itemCount: number;
  /** Label for items (e.g., "Esercizi", "Pasti") */
  itemLabel: string;
  /** Additional stats to show (e.g., "60 min stimati") */
  additionalStats?: string;
  /** Icon for empty state */
  emptyIcon: ReactNode;
  /** Message for empty state */
  emptyMessage: string;
  /** Sub-message for empty state */
  emptySubMessage?: string;
  /** Label for add button */
  addButtonLabel: string;
  /** Handler for add button */
  onAdd: () => void;
  /** Handler for drag end event */
  onDragEnd: (event: DragEndEvent) => void;
  /** Optional Handler for drag over event (required for cross-container) */
  onDragOver?: (event: DragOverEvent) => void;
  /** Optional Handler for drag start event */
  onDragStart?: (event: DragStartEvent) => void;
  /** Theme color variant */
  themeColor?: 'primary' | 'emerald';
  /** Children render function receiving DnD context ID */
  children: (dndContextId: string) => ReactNode;
  /** Optional header slot for additional content (e.g., macro summary) */
  headerSlot?: ReactNode;
  /** Optional header actions (e.g., dropdown menu) */
  headerActions?: ReactNode;
  /** Class name for wrapper */
  className?: string;
}

export function DayEditorShell({
  title,
  itemCount,
  itemLabel,
  additionalStats,
  emptyIcon,
  emptyMessage,
  emptySubMessage = 'Tocca per aggiungere il primo elemento',
  addButtonLabel,
  onAdd,
  onDragEnd,
  onDragOver,
  onDragStart,
  themeColor = 'primary',
  children,
  headerSlot,
  headerActions,
  className,
}: DayEditorShellProps) {
  const dndContextId = useId();

  // Theme-based color classes
  const colorClasses = {
    primary: {
      border: 'hover:border-blue-500/30',
      icon: 'group-hover:bg-blue-900/20 group-hover:text-blue-400',
      shadow: 'shadow-blue-500/20',
      gradient: 'bg-gradient-to-r from-blue-950/40 via-neutral-900/60 to-indigo-950/40',
    },
    emerald: {
      border: 'hover:border-emerald-500/30',
      icon: 'group-hover:bg-emerald-500/20 group-hover:text-emerald-500 dark:group-hover:bg-emerald-900/20 dark:group-hover:text-emerald-400',
      shadow: 'shadow-emerald-500/20',
      gradient: 'bg-gradient-to-r from-emerald-950/40 via-neutral-900/60 to-teal-950/40',
    },
  };

  const colors = colorClasses[themeColor] || colorClasses.primary;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement to start drag
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 250ms long press on mobile
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {/* Header Container - Clean Card Style */}
      <div className="rounded-2xl border border-neutral-200 bg-white/50 p-3 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/50 dark:shadow-black/20 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white sm:text-2xl">{title}</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 sm:text-sm">
                <span>
                  {itemCount} {itemLabel}
                </span>
                {additionalStats && (
                  <>
                    <span className="text-neutral-300 dark:text-neutral-600">•</span>
                    <span>{additionalStats}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={themeColor === 'emerald' ? 'success' : 'primary'}
                icon={<Plus size={16} className="text-white" />}
                onPress={onAdd}
                className="flex-1 sm:w-auto"
              >
                {addButtonLabel}
              </Button>
              {headerActions}
            </div>
          </div>

          {/* Optional header slot (e.g., macro summary bar) */}
          {headerSlot}
        </div>
      </div>

      {/* DnD Context */}
      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex touch-pan-y flex-col gap-0 bg-transparent">
          {children(dndContextId)}

          {/* Empty State */}
          {itemCount === 0 && (
            <button
              onClick={onAdd}
              className={cn(
                'group flex w-full flex-col items-center justify-center rounded-3xl border border-dashed py-16 transition-all',
                'border-neutral-300 hover:bg-neutral-50 dark:border-white/10 dark:hover:bg-white/[0.02]',
                colors.border
              )}
              type="button"
            >
              <div
                className={cn(
                  'mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors',
                  'bg-neutral-100 text-neutral-400 dark:bg-neutral-900/50 dark:text-neutral-600',
                  colors.icon,
                  'group-hover:shadow-sm'
                )}
              >
                {emptyIcon}
              </div>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">{emptyMessage}</span>
              <span className="mt-1 text-sm text-neutral-500">{emptySubMessage}</span>
            </button>
          )}
        </div>
      </DndContext>

      {/* Mobile CTA */}
      <div className="sticky bottom-3 z-20 sm:hidden">
        <Button
          variant={themeColor === 'emerald' ? 'success' : 'gradient-primary'}
          icon={<Plus size={16} className="text-white" />}
          onPress={onAdd}
          className={cn('w-full shadow-lg', colors.shadow)}
        >
          {addButtonLabel}
        </Button>
      </div>
    </div>
  );
}
