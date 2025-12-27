/**
 * Memory Viewer Component
 *
 * Displays user memory organized by domains.
 * KISS: Simple tabbed interface
 * SOLID: Single responsibility - only display
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../../card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../tabs';
import { MemoryInsightsCard } from './memory-insights-card';
import type { UserMemory, MemoryDomain } from '@onecoach/lib-core/user-memory/types';
import { cn } from '@onecoach/lib-design-system';
import {
  Dumbbell,
  UtensilsCrossed,
  Calendar,
  FolderKanban,
  CheckSquare,
  Target,
  User,
} from 'lucide-react';

export interface MemoryViewerLabels {
  domains?: {
    workout?: string;
    nutrition?: string;
    oneagenda?: string;
    projects?: string;
    tasks?: string;
    habits?: string;
    general?: string;
  };
  invalidUserId?: string;
  loadError?: string;
  retry?: string;
  preferences?: string;
  noDataForDomain?: string;
}

export interface MemoryViewerProps {
  userId: string;
  initialDomain?: MemoryDomain;
  className?: string;
  labels?: MemoryViewerLabels;
}

const isUuid = (value: string | null | undefined): value is string => {
  if (!value) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
};

const getDomainsConfig = (labels?: MemoryViewerLabels['domains']) => [
  { id: 'workout' as MemoryDomain, label: labels?.workout ?? 'Workout', icon: Dumbbell },
  { id: 'nutrition' as MemoryDomain, label: labels?.nutrition ?? 'Nutrition', icon: UtensilsCrossed },
  { id: 'oneagenda' as MemoryDomain, label: labels?.oneagenda ?? 'OneAgenda', icon: Calendar },
  { id: 'projects' as MemoryDomain, label: labels?.projects ?? 'Projects', icon: FolderKanban },
  { id: 'tasks' as MemoryDomain, label: labels?.tasks ?? 'Tasks', icon: CheckSquare },
  { id: 'habits' as MemoryDomain, label: labels?.habits ?? 'Habits', icon: Target },
  { id: 'general' as MemoryDomain, label: labels?.general ?? 'General', icon: User },
];

export function MemoryViewer({ userId, initialDomain = 'workout', className, labels }: MemoryViewerProps) {
  const domains = getDomainsConfig(labels?.domains);
  const l = {
    invalidUserId: labels?.invalidUserId ?? 'Invalid user ID',
    loadError: labels?.loadError ?? 'Unable to load memory.',
    retry: labels?.retry ?? 'Retry',
    preferences: labels?.preferences ?? 'Preferences',
    noDataForDomain: labels?.noDataForDomain ?? 'No data available for this domain',
  };
  const [memory, setMemory] = useState<UserMemory | null>(null);
  const [activeDomain, setActiveDomain] = useState<MemoryDomain>(initialDomain);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const loadMemory = useCallback(async () => {
    // Block if user ID is not a valid UUID
    if (!isUuid(userId)) {
      setError(l.invalidUserId);
      setMemory(null);
      setIsLoading(false);
      return;
    }

    // Annulla richieste precedenti per evitare race conditions quando si cambia dominio rapidamente
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        domain: activeDomain,
        userId,
      });

      const response = await fetch(`/api/memory?${params.toString()}`, {
        cache: 'no-store',
        credentials: 'include',
        signal: controller.signal,
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          (payload as { message?: string; error?: string } | null)?.message ||
          (payload as { message?: string; error?: string } | null)?.error ||
          `Errore ${response.status}`;
        throw new Error(message);
      }

      setMemory((payload as { memory?: UserMemory } | null)?.memory ?? null);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      console.error('[Memory Viewer] Error:', err);
      setError(err instanceof Error ? err.message : l.loadError);
    } finally {
      setIsLoading(false);
    }
  }, [activeDomain, userId]);

  useEffect(() => {
    void loadMemory();

    return () => controllerRef.current?.abort();
  }, [loadMemory]);

  if (isLoading) {
    return (
      <Card variant="glass" padding="md" className={className}>
        <div className="flex items-center justify-center py-8">
          <div className="border-t-primary-500 h-6 w-6 animate-spin rounded-full border-2 border-neutral-200 dark:border-neutral-700" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="glass" padding="md" className={className}>
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            {l.loadError}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{error}</p>
          <button
            type="button"
            onClick={() => void loadMemory()}
            className="bg-primary-500 hover:bg-primary-600 focus:ring-primary-500/70 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow focus:ring-2 focus:outline-none"
          >
            {l.retry}
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <Tabs
        defaultValue={activeDomain}
        onValueChange={(nextValue) => setActiveDomain(nextValue as MemoryDomain)}
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <TabsTrigger key={domain.id} value={domain.id} className="gap-2">
                <Icon className="h-4 w-4" />
                {domain.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {domains.map((domain) => {
          const domainData = memory?.[domain.id];
          return (
            <TabsContent key={domain.id} value={domain.id} className="mt-4">
              <div className="space-y-4">
                {domainData && (
                  <>
                    {/* Preferences */}
                    {Object.keys(domainData.preferences).length > 0 && (
                      <Card variant="glass" padding="md">
                        <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                          {l.preferences}
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(domainData.preferences).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50/50 p-3 dark:border-neutral-700 dark:bg-neutral-800/50"
                            >
                              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                {key}
                              </span>
                              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}

                    {/* Insights Card */}
                    <MemoryInsightsCard
                      patterns={domainData.patterns}
                      insights={domainData.insights}
                    />
                  </>
                )}

                {!domainData && (
                  <Card variant="glass" padding="md">
                    <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                      {l.noDataForDomain}
                    </p>
                  </Card>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
