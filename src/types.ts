export type StatName =
  | 'layup'
  | 'dunking'
  | 'paint'
  | 'dribbleControl'
  | 'passAccuracy'
  | 'agility'
  | 'speed'
  | 'strength'
  | 'vertical'
  | 'threePoint'
  | 'midRange'
  | 'freeThrow'
  | 'steal'
  | 'block'
  | 'rebound';

export type ArchetypeName = 'shooter' | 'finisher' | '3&D' | 'defender';

export type CategoryName = 'finishing' | 'creativity' | 'physicals' | 'shooting' | 'defense';

export interface StatCaps {
  [key: string]: number;
}

export interface ArchetypeCaps {
  shooter: StatCaps;
  finisher: StatCaps;
  '3&D': StatCaps;
  defender: StatCaps;
}

export interface BuildState {
  [key: string]: number;
}

export interface EconomySettings {
  initialAP: number;
  extraAP: number;
  levelUpAP: number;
}
