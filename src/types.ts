export type StatName =
  | 'layup'
  | 'dunking'
  | 'paint'
  | 'dribbleSpeed'
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
  | 'offensiveRebound'
  | 'defensiveRebound';

export type ProfileName = 'shooter' | 'finisher' | '3&D' | 'defender';

export type CategoryName = 'finishing' | 'creativity' | 'physicals' | 'shooting' | 'defense' | 'rebound';

export interface StatCaps {
  [key: string]: number;
}

export interface ProfileCaps {
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
