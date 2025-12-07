import React from 'react';
import clsx from 'clsx';

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Scheletro leggero riutilizzabile per placeholder di caricamento.
 */
export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-neutral-200/80 dark:bg-neutral-800/80',
        className
      )}
      style={style}
    />
  );
}
