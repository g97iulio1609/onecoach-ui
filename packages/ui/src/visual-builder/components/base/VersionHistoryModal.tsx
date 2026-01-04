/**
 * VersionHistoryModal Component
 *
 * Modal displaying version history with restore and diff capabilities.
 * Seamlessly integrates with existing onecoach-ui design patterns.
 */

'use client';

import { useState, useMemo } from 'react';
import { X, RotateCcw, GitCompare, Clock, Check } from 'lucide-react';
import { cn } from '@onecoach/lib-design-system';
import type { VersionSnapshot, StateDiff } from '@onecoach/hooks';
import { computeSemanticDiff } from '../../utils';

export interface VersionHistoryModalProps<T = unknown> {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** List of version snapshots */
  history: VersionSnapshot<T>[];
  /** Restore to a specific version index */
  onRestore: (index: number) => void;
  /** Get diff between two versions (indices, -1 = current) */
  getDiff?: (fromIndex: number, toIndex: number) => StateDiff;
  /** Theme variant */
  variant?: 'primary' | 'emerald';
  /** Translations */
  labels?: {
    title?: string;
    noHistory?: string;
    current?: string;
    restore?: string;
    compare?: string;
    cancel?: string;
    version?: string;
    changes?: string;
    added?: string;
    removed?: string;
    modified?: string;
  };
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function VersionHistoryModal<T>({
  isOpen,
  onClose,
  history,
  onRestore,
  getDiff,
  variant = 'primary',
  labels = {},
}: VersionHistoryModalProps<T>) {
  const [selectedForCompare, setSelectedForCompare] = useState<number[]>([]);
  const [showDiff, setShowDiff] = useState(false);

  const gradientClass =
    variant === 'emerald'
      ? 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800'
      : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';

  const accentClass =
    variant === 'emerald'
      ? 'text-emerald-600 dark:text-emerald-400'
      : 'text-blue-600 dark:text-blue-400';

  const diff = useMemo(() => {
    if (!showDiff || selectedForCompare.length !== 2 || !getDiff) return null;
    const sorted = [...selectedForCompare].sort((a, b) => a - b);
    const newerIdx = sorted[0] ?? 0;
    const olderIdx = sorted[1] ?? 0;
    // Compare Older -> Newer to show progress (Added = appeared in update)
    return getDiff(olderIdx, newerIdx);
  }, [showDiff, selectedForCompare, getDiff]);

  const semanticDiff = useMemo(() => {
    if (!diff || selectedForCompare.length !== 2) return null;
    const sorted = [...selectedForCompare].sort((a, b) => a - b);
    const newerIdx = sorted[0] ?? 0;
    const olderIdx = sorted[1] ?? 0;
    
    return computeSemanticDiff(
      diff, 
      history[olderIdx]?.state, 
      history[newerIdx]?.state
    );
  }, [diff, selectedForCompare, history]);

  const toggleCompareSelection = (index: number) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      if (prev.length >= 2) {
        return [prev[1] ?? index, index];
      }
      return [...prev, index];
    });
    setShowDiff(false);
  };

  const handleRestore = (index: number) => {
    onRestore(index);
    onClose();
  };

  const handleCompare = () => {
    if (selectedForCompare.length === 2) {
      setShowDiff(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative z-10 w-full max-w-lg overflow-hidden rounded-2xl',
          'border border-neutral-200 bg-white shadow-2xl',
          'dark:border-white/10 dark:bg-neutral-900',
          'animate-in zoom-in-95 fade-in duration-200'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-white/10">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
            <Clock size={20} className={accentClass} />
            {labels.title ?? 'Version History'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {history.length === 0 ? (
            <p className="py-8 text-center text-neutral-500 dark:text-neutral-400">
              {labels.noHistory ?? 'No version history available'}
            </p>
          ) : showDiff && diff ? (
            // Diff View
            <div className="space-y-4">
              <button
                onClick={() => setShowDiff(false)}
                className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                ← Back to history
              </button>

              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-neutral-800/50">
                {!semanticDiff || semanticDiff.length === 0 ? (
                  <p className="text-center text-neutral-500">No differences found</p>
                ) : (
                  <div className="space-y-3">
                     {semanticDiff.map((change) => (
                      <div 
                        key={change.id} 
                        className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-3 shadow-sm dark:border-white/5 dark:bg-neutral-800"
                      >
                        {/* Status Bar */}
                        <div className={cn(
                          "absolute bottom-0 left-0 top-0 w-1",
                          change.action === 'added' ? "bg-emerald-500" :
                          change.action === 'removed' ? "bg-red-500" :
                          "bg-amber-500"
                        )} />

                        <div className="ml-3">
                           {/* Context (Parent) */}
                           {change.entity.parentName && (
                             <div className="mb-0.5 text-xs font-medium text-neutral-400 dark:text-neutral-500">
                               {change.entity.parentName}
                             </div>
                           )}
                           
                           {/* Main Entity Header */}
                           <div className="flex items-center gap-2">
                             <span className="text-lg">
                               {change.entity.type === 'program' ? '📋' :
                                change.entity.type === 'week' ? '📅' :
                                change.entity.type === 'day' ? '📆' :
                                change.entity.type === 'exercise' ? '🏋️' :
                                change.entity.type === 'set' ? '🔢' : '•'}
                             </span>
                             <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                                {change.entity.name}
                             </span>
                             <span className={cn(
                               "rounded px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider",
                               change.action === 'added' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                               change.action === 'removed' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                               "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                             )}>
                               {change.action}
                             </span>
                           </div>

                           {/* Description */}
                           {/* <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                             {change.description}
                           </p> */}

                           {/* Details List */}
                           {change.details.length > 0 && (
                             <div className="mt-2 space-y-1">
                               {change.details.map((detail, idx) => (
                                 <div key={idx} className="flex items-start gap-1.5 text-sm text-neutral-600 dark:text-neutral-300">
                                   <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                                   <span>{detail}</span>
                                 </div>
                               ))}
                             </div>
                           )}
                        </div>
                      </div>
                     ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // History List
            <div className="space-y-2">
              {history.map((version, index) => {
                // Calculate inline diff for this version compared to next version
                const inlineDiff = getDiff && index < history.length - 1
                  ? getDiff(index, index + 1)
                  : null;

                return (
                  <div
                    key={version.id}
                    className={cn(
                      'flex flex-col gap-2 rounded-xl border p-4 transition-all',
                      'border-neutral-200 bg-neutral-50/50 hover:border-neutral-300 hover:bg-neutral-100/50',
                      'dark:border-white/10 dark:bg-neutral-800/30 dark:hover:border-white/20 dark:hover:bg-neutral-800/50',
                      selectedForCompare.includes(index) &&
                        'ring-2 ring-blue-500 dark:ring-blue-400'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Compare checkbox */}
                      {getDiff && (
                        <button
                          onClick={() => toggleCompareSelection(index)}
                          className={cn(
                            'flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors',
                            selectedForCompare.includes(index)
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-neutral-300 dark:border-neutral-600'
                          )}
                        >
                          {selectedForCompare.includes(index) && <Check size={12} />}
                        </button>
                      )}

                      {/* Version info */}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-neutral-900 dark:text-white">
                          {labels.version ?? 'Version'} {history.length - index}
                          {index === 0 && (
                            <span className="ml-2 text-xs font-normal text-emerald-600 dark:text-emerald-400">
                              ({labels.current ?? 'Current'})
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                          {formatTimestamp(new Date(version.timestamp))}
                          {version.description && ` • ${version.description}`}
                        </p>
                      </div>

                      {/* Restore button */}
                      {index > 0 && (
                        <button
                          onClick={() => handleRestore(index)}
                          className={cn(
                            'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-white',
                            'bg-gradient-to-r shadow-md transition-all hover:shadow-lg',
                            gradientClass
                          )}
                        >
                          <RotateCcw size={14} />
                          {labels.restore ?? 'Restore'}
                        </button>
                      )}
                    </div>

                    {/* Inline diff summary */}
                    {inlineDiff && inlineDiff.hasChanges && (
                      <div className="flex flex-wrap gap-2 text-xs">
                        {inlineDiff.added.length > 0 && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            +{inlineDiff.added.length} {labels.added ?? 'added'}
                          </span>
                        )}
                        {inlineDiff.removed.length > 0 && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            -{inlineDiff.removed.length} {labels.removed ?? 'removed'}
                          </span>
                        )}
                        {inlineDiff.changed.length > 0 && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                            ~{inlineDiff.changed.length} {labels.modified ?? 'modified'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with compare button */}
        {getDiff && selectedForCompare.length === 2 && !showDiff && (
          <div className="border-t border-neutral-200 px-6 py-4 dark:border-white/10">
            <button
              onClick={handleCompare}
              className={cn(
                'flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium text-white',
                'bg-gradient-to-r shadow-md transition-all hover:shadow-lg',
                gradientClass
              )}
            >
              <GitCompare size={18} />
              {labels.compare ?? 'Compare Selected'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
