import type { StateDiff } from '@onecoach/hooks';
// @ts-ignore
import get from 'lodash/get';

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

export type ChangeType = 'added' | 'removed' | 'modified';

export interface EntityReference {
  type: 'program' | 'week' | 'day' | 'exercise' | 'set' | 'setGroup' | 'meal' | 'food' | 'other';
  name: string; // "Bench Press", "Week 1", etc.
  path: string; // "weeks[0].days[0].exercises[2]"
  parentName?: string; // "Week 1 • Day 2" - context
}

export interface SemanticChange {
  id: string; // unique key for rendering
  entity: EntityReference;
  action: ChangeType;
  description: string; // "Modified sets", "Added to Day 1"
  details: string[]; // ["weight: 80 -> 85", "reps: 10 -> 12"]
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/**
 * Extract an entity name from the snapshot at a specific path
 */
function resolveEntityName(snapshot: any, path: string, type: EntityReference['type']): string {
  const entity = get(snapshot, path);
  
  if (!entity) {
    const match = path.match(/\[(\d+)\]$/);
    const index = match && match[1] ? parseInt(match[1], 10) + 1 : 1;
    return `${type.charAt(0).toUpperCase() + type.slice(1)} ${index}`;
  }

  // Domain specific name resolution
  if (type === 'exercise' && entity.exercise?.name) return entity.exercise.name; // If wrapped in object
  if (type === 'exercise' && entity.name) return entity.name;
  
  if (type === 'day' && entity.name) return entity.name;
  if (type === 'day' && entity.dayName) return entity.dayName;
  
  if (type === 'week' && entity.name) return entity.name;
  
  if (type === 'set' || type === 'setGroup') {
    const match = path.match(/\[(\d+)\]$/);
    const index = match && match[1] ? parseInt(match[1], 10) + 1 : 1;
    return `Set ${index}`;
  }

  return entity.name || entity.title || 'Untitled';
}

// ----------------------------------------------------------------------------
// Main Logic
// ----------------------------------------------------------------------------

export function computeSemanticDiff(
  diff: StateDiff, 
  oldState: any,
  newState: any
): SemanticChange[] {
  const changes = new Map<string, SemanticChange>();

  // Helper to process a raw change path
  const processPath = (
    rawPath: string, 
    action: ChangeType, 
    valueChange?: { from: any; to: any }
  ) => {
    const parts = rawPath.split('.');
    let entityPath = '';
    let entityType: EntityReference['type'] = 'program';
    let subPath = '';

    let exerciseIdx = parts.findIndex(p => p.startsWith('exercises'));
    let dayIdx = parts.findIndex(p => p.startsWith('days'));
    let weekIdx = parts.findIndex(p => p.startsWith('weeks'));

    if (exerciseIdx !== -1) {
      entityType = 'exercise';
      entityPath = parts.slice(0, exerciseIdx + 1).join('.');
      subPath = parts.slice(exerciseIdx + 1).join('.');
    } else if (dayIdx !== -1) {
      entityType = 'day';
      entityPath = parts.slice(0, dayIdx + 1).join('.');
      subPath = parts.slice(dayIdx + 1).join('.');
    } else if (weekIdx !== -1) {
      entityType = 'week';
      entityPath = parts.slice(0, weekIdx + 1).join('.');
      subPath = parts.slice(weekIdx + 1).join('.');
    } else {
      entityType = 'program';
      entityPath = 'root'; 
      subPath = rawPath;
    }

    if (!subPath) subPath = 'self';

    // RESOLUTION STRATEGY:
    // - For modified/added: use newState (entity exists there)
    // - For removed: use oldState (entity existed there)
    const snapshotToUse = action === 'removed' ? oldState : newState;

    let name = 'Unknown';
    if (entityPath === 'root') {
      name = snapshotToUse?.name || 'Program';
    } else {
      name = resolveEntityName(snapshotToUse, entityPath, entityType);
    }
    
    let parentName = '';
    if (entityType === 'exercise') {
      const dayPath = parts.slice(0, dayIdx + 1).join('.');
      // Parent should exist in both usually, but safety first
      parentName = resolveEntityName(snapshotToUse, dayPath, 'day');
    } else if (entityType === 'day') {
       const weekPath = parts.slice(0, weekIdx + 1).join('.');
       parentName = resolveEntityName(snapshotToUse, weekPath, 'week');
    }

    const key = `${entityType}:${entityPath}`;
    
    if (!changes.has(key)) {
      changes.set(key, {
        id: key,
        entity: { type: entityType, name, path: entityPath, parentName },
        action: 'modified', 
        description: `Updated ${name}`,
        details: []
      });
    }

    const entry = changes.get(key)!;

    if (subPath === 'self') {
      entry.action = action;
      // Overwrite description for top-level actions
      if (action === 'added') entry.description = `Added ${name}`;
      if (action === 'removed') entry.description = `Removed ${name}`;
    } else {
      const readableField = formatDiffSubPath(subPath);
      let valString = '';
      if (valueChange) {
         valString = `: ${formatVal(valueChange.from)} → ${formatVal(valueChange.to)}`;
      }
      entry.details.push(`${readableField}${valString}`);
    }
  };
  
  diff.changed.forEach(c => processPath(c.path, 'modified', { from: c.from, to: c.to }));
  diff.added.forEach(path => processPath(path, 'added'));
  diff.removed.forEach(path => processPath(path, 'removed'));

  return Array.from(changes.values());
}

/**
 * Helpers
 */
function formatDiffSubPath(subPath: string): string {
  return subPath
    .replace(/setGroups\[(\d+)\]/g, (_, i) => `Set Group ${parseInt(i)+1}`)
    .replace(/sets\[(\d+)\]/g, (_, i) => `Set ${parseInt(i)+1}`)
    .replace(/exercises\[(\d+)\]/g, (_, i) => `Ex ${parseInt(i)+1}`)
    .replace(/\./g, ' › ')
    .replace(/([A-Z])/g, ' $1') // Camel to space
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

function formatVal(val: any): string {
  if (val === null || val === undefined) return 'empty';
  if (typeof val === 'object') return '...';
  return String(val);
}
