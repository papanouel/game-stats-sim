import { StatCaps, BuildState, CategoryName } from '../types';
import { STAT_NAMES, CATEGORY_STATS } from '../constants';

const AP_COST_PER_LEVEL = [0, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3];

export const calculateAPCostForLevel = (level: number): number => {
  if (level < 0 || level > 10) return 0;
  return AP_COST_PER_LEVEL[level] || 0;
};

export const calculateTotalAPCostForStat = (level: number): number => {
  let totalCost = 0;
  for (let i = 1; i <= level; i++) {
    totalCost += AP_COST_PER_LEVEL[i];
  }
  return totalCost;
};

export const calculateTotalAPCost = (caps: StatCaps): number => {
  return STAT_NAMES.reduce((total, stat) => {
    return total + calculateTotalAPCostForStat(caps[stat] || 0);
  }, 0);
};

export const calculateCapSum = (caps: StatCaps): number => {
  return Object.values(caps).reduce((sum, level) => sum + (level || 0), 0);
};

export const calculateAPSpent = (build: BuildState): number => {
  return STAT_NAMES.reduce((total, stat) => {
    return total + calculateTotalAPCostForStat(build[stat] || 0);
  }, 0);
};

export const calculateCategoryAverage = (
  category: CategoryName,
  build: BuildState
): number => {
  const stats = CATEGORY_STATS[category];
  const sum = stats.reduce((total, stat) => total + (build[stat] || 0), 0);
  return sum / stats.length;
};

export const calculateCategoryMax = (
  category: CategoryName,
  caps: StatCaps
): number => {
  const stats = CATEGORY_STATS[category];
  const sum = stats.reduce((total, stat) => total + (caps[stat] || 0), 0);
  return sum / stats.length;
};

export const initializeBuild = (): BuildState => {
  const build: BuildState = {};
  STAT_NAMES.forEach(stat => {
    build[stat] = 0;
  });
  return build;
};
