import React, { useEffect, useState } from 'react';
import { ICoreState } from '@ignition/shared';
import CoreScene from '../game/CoreScene';

export const GameView = () => {
  const [state, setState] = useState<ICoreState>({
    lumenDust: 1240.85,
    multiplier: 2.5,
    tapsPerSecond: 12,
    heatLevel: 42,
    coreStability: 98.2,
    lastTapTimestamp: Date.now()
  });

  return (
    <div className="relative h-screen w-full bg-background-dark overflow-hidden font-display">
      {/* 1. HUD: Top Balance Bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-6">
        <div className="glass-panel flex items-center justify-between rounded-full px-5 py-3 border border-primary/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary neon-glow">bolt</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Lumen Dust</p>
              <p className="text-xl font-bold leading-none">{state.lumenDust.toLocaleString()}</p>
            </div>
          </div>
          <button className="bg-primary text-black rounded-full p-1 hover:scale-110 transition-transform">
            <span className="material-symbols-outlined font-bold">add</span>
          </button>
        </div>
      </div>

      {/* 2. Phaser Canvas: The Hyper-Core */}
      <div id="phaser-container" className="h-full w-full" />

      {/* 3. Stats HUD (Left) */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        <div className="glass-panel p-4 rounded-xl border-l-4 border-l-primary min-w-[100px]">
          <p className="text-[10px] uppercase text-primary font-bold">Multiplier</p>
          <p className="text-2xl font-bold">{state.multiplier}x</p>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <p className="text-[10px] uppercase text-white/40 font-bold">Taps/Sec</p>
          <p className="text-2xl font-bold">{state.tapsPerSecond}</p>
        </div>
      </div>

      {/* 4. Heat Meter (Bottom) */}
      <div className="absolute bottom-32 left-0 w-full px-6 z-20">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
            <span>Heat Level</span>
            <span>{state.heatLevel}%</span>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full border border-primary/20 p-0.5 overflow-hidden">
            <div 
              className="h-full bg-primary shadow-[0_0_15px_rgba(0,238,255,0.6)] rounded-full transition-all duration-500"
              style={{ width: `${state.heatLevel}%` }}
            />
          </div>
          <p className="text-center text-[10px] text-white/40">Core Stability: {state.coreStability}%</p>
        </div>
      </div>
    </div>
  );
};