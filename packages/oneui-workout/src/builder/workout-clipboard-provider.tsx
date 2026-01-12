'use client';

import { createClipboardContext } from '@onecoach/ui';
import type { Exercise } from '@onecoach/types-workout';

const {
  Provider: ExerciseClipboardProvider,
  useClipboard: useExerciseClipboard,
  Context: ExerciseClipboardContext,
} = createClipboardContext<Exercise>();

export { ExerciseClipboardProvider, useExerciseClipboard, ExerciseClipboardContext };

// Helper for deep cloning exercises with new IDs (used in drag-and-drop/duplication)
export const cloneExerciseWithNewIds = (exercise: Exercise): Exercise => {
  const newSetGroups = exercise.setGroups?.map(sg => ({
    ...sg,
    id: Math.random().toString(36).substr(2, 9),
    sets: sg.sets?.map(s => ({ ...s })) || []
  })) || [];

  return {
    ...exercise,
    id: Math.random().toString(36).substr(2, 9),
    setGroups: newSetGroups
  };
};
