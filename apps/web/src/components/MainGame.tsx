import { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { type ICoreState, INITIAL_CORE_STATE } from '@ignition/shared';
import CoreScene from '../game/CoreScene';

export const MainGameView = () => {
  const [gameState, setGameState] = useState<ICoreState>(INITIAL_CORE_STATE);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-game-container',
      backgroundColor: 'transparent',
      transparent: true,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: [CoreScene],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    // Listen for tap events from Phaser after scene is ready
    gameRef.current.events.once(Phaser.Core.Events.READY, () => {
      const scene = gameRef.current?.scene.getScene('CoreScene') as CoreScene;
      if (scene?.events) {
        scene.events.on('CORE_TAP', () => {
          setGameState(prev => ({
            ...prev,
            lumenDust: parseFloat((prev.lumenDust + 0.001 * prev.multiplier).toFixed(3)),
          }));
        });
      }
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden font-display text-white">

      {/* 1. Background Atmosphere (The Neon Grid) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00eeff_1px,transparent_1px),linear-gradient(to_bottom,#00eeff_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* 2. Top HUD: Balance */}
      <div className="relative z-20 flex justify-between items-center p-6">
        <div className="glass-panel rounded-full px-4 py-2 flex items-center gap-3 border border-primary/20 bg-primary/5 backdrop-blur-md">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-sm font-bold">bolt</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Lumen Dust</span>
            <span className="text-lg font-bold leading-none">{gameState.lumenDust.toLocaleString()}</span>
          </div>
          <button className="ml-2 flex size-8 items-center justify-center rounded-full bg-primary text-black hover:bg-white transition-all">
            <span className="material-symbols-outlined font-bold">add</span>
          </button>
        </div>
        <button className="glass-panel size-12 flex items-center justify-center rounded-full border border-primary/20 bg-primary/5">
          <span className="material-symbols-outlined text-primary">settings</span>
        </button>
      </div>

      {/* 3. Center Section: The Phaser Core */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div id="phaser-game-container" className="w-full h-full" />
      </div>

      {/* 4. Left Stats HUD */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        <div className="glass-panel p-4 rounded-xl border-l-4 border-l-primary bg-primary/5 backdrop-blur-sm">
          <p className="text-[10px] uppercase text-primary font-bold tracking-tighter">Multiplier</p>
          <p className="text-2xl font-bold">{gameState.multiplier}<span className="text-primary text-lg">x</span></p>
        </div>
        <div className="glass-panel p-4 rounded-xl bg-white/5 backdrop-blur-sm">
          <p className="text-[10px] uppercase text-white/40 font-bold tracking-tighter">Taps/Sec</p>
          <p className="text-2xl font-bold">{gameState.tapsPerSecond}</p>
        </div>
      </div>

      {/* 5. Bottom HUD: Heat Level & Navigation */}
      <div className="absolute bottom-0 left-0 w-full z-20 p-6 space-y-4 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Heat Level</h3>
              <p className="text-[10px] text-white/40">Core Stability: {gameState.coreStability}%</p>
            </div>
            <span className="text-xl font-bold text-primary">{gameState.heatLevel}%</span>
          </div>
          <div className="h-3 w-full bg-white/5 rounded-full border border-primary/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary/40 via-primary to-white shadow-[0_0_15px_rgba(0,238,255,0.6)] transition-all duration-300"
              style={{ width: `${gameState.heatLevel}%` }}
            />
          </div>
          <p className="text-center text-[10px] uppercase tracking-widest text-primary/40 pt-1">
            Neon Energy Charge: Active
          </p>
        </div>

        {/* Bottom Tab Bar */}
        <nav className="glass-panel flex items-center justify-around p-2 rounded-full border border-primary/20 bg-black/40 backdrop-blur-xl">
          <NavButton icon="bolt" label="Core" active />
          <NavButton icon="rocket_launch" label="Upgrades" />
          <NavButton icon="account_balance_wallet" label="Vault" />
          <NavButton icon="group" label="Social" />
        </nav>
      </div>
    </div>
  );
};

const NavButton = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => (
  <button className={`flex flex-col items-center gap-1 p-3 rounded-full transition-all ${active ? 'bg-primary/10 text-primary w-1/4' : 'text-white/40 hover:text-white w-1/4'}`}>
    <span className="material-symbols-outlined" style={active ? { fontVariationSettings: "'FILL' 1" } : {}}>{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);