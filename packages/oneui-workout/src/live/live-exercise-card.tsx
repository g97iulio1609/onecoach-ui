'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';
import { getExerciseSets } from '@onecoach/one-workout';
import { LiveSetTracker } from './live-set-tracker';
import { ExerciseInstructions } from './exercise-instructions';
import { Button } from '@onecoach/ui-core';
import type { Exercise, ExerciseSet } from '@onecoach/schemas';

export interface LiveExerciseCardProps {
  exercise: Exercise;
  exerciseIndex: number;
  onSetComplete: (exerciseIndex: number, setIndex: number, setData: Partial<ExerciseSet>) => void;
  onSetUpdate: (exerciseIndex: number, setIndex: number, setData: Partial<ExerciseSet>) => void;
  className?: string;
}

export function LiveExerciseCard({
  exercise,
  exerciseIndex,
  onSetComplete,
  onSetUpdate,
  className = '',
}: LiveExerciseCardProps) {
  const t = useTranslations('workouts');
  const [showInfo, setShowInfo] = useState(false);

  const sets = getExerciseSets(exercise as any);
  const activeSetIndex = sets.findIndex((set) => !set.done);
  const muscleGroups = exercise.muscleGroups || [];

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Exercise Header */}
      <div className="mb-6 text-center">
        <h2 className="mb-3 text-3xl font-black tracking-tight text-white">
          {exercise.name}
        </h2>
        {/* Muscle Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {muscleGroups.map((mg: string) => (
            <span
              key={mg}
              className="rounded-full bg-neutral-800 px-3 py-1 text-xs font-semibold text-neutral-300"
            >
              {t(`muscles.${mg.toLowerCase()}`) || mg}
            </span>
          ))}
        </div>
        {/* Info Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowInfo(!showInfo)}
          className={`mx-auto mt-4 rounded-full border transition-all hover:bg-transparent ${
            showInfo
              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
              : 'border-neutral-700 bg-neutral-800/50 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
          }`}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {/* Instructions (Collapsible) */}
      {showInfo && (
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4">
          <ExerciseInstructions exercise={exercise} />
        </div>
      )}

      {/* Sets Stack */}
      <div className="space-y-3">
        {sets.map((set, setIndex) => {
          const isActive = setIndex === activeSetIndex;
          const isNext = setIndex === activeSetIndex + 1;

          return (
            <LiveSetTracker
              key={setIndex}
              set={set}
              setIndex={setIndex}
              onComplete={(idx, data) => onSetComplete(exerciseIndex, idx, data)}
              onUpdate={(idx, data) => onSetUpdate(exerciseIndex, idx, data)}
              isActive={isActive}
              isNext={isNext}
            />
          );
        })}

        {sets.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-700 py-10 text-center">
            <p className="text-sm text-neutral-500">
              {t('live_exercise_card.nessun_set_programmato_per_questo_eserci')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
