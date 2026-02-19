export interface ICoreState {
  lumenDust: number;
  multiplier: number;
  tapsPerSecond: number;
  heatLevel: number; // from 0 to 100
  coreStability: number; // in percentage
  lastTapTimestamp: number;
  isOnline: boolean; 
}

export const INITIAL_CORE_STATE: ICoreState = {
  lumenDust: 1240.85,
  multiplier: 2.5,
  tapsPerSecond: 12,
  heatLevel: 42,
  coreStability: 98.2,
  lastTapTimestamp: Date.now(), 
  isOnline: true, 
};

export type TapResult = {
  earned: number;
  newState: ICoreState;
};