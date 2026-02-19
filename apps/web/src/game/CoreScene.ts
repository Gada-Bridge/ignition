import Phaser from 'phaser';

export default class CoreScene extends Phaser.Scene {
  private rings: Phaser.GameObjects.Graphics[] = [];
  private core!: Phaser.GameObjects.Graphics;
  private glowDot!: Phaser.GameObjects.Arc;
  private floatTexts: Phaser.GameObjects.Text[] = [];

  constructor() {
    super('CoreScene');
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;

    // Outer concentric circle rings
    for (let i = 2; i >= 0; i--) {
      const radius = 140 + i * 30;
      const g = this.add.graphics();
      g.lineStyle(1.5, 0x00eeff, 0.15 - i * 0.03);
      g.strokeCircle(cx, cy, radius);
      this.rings.push(g);

      // Subtle pulse animation on each ring
      this.tweens.add({
        targets: g,
        alpha: { from: 0.4, to: 0.8 },
        scaleX: { from: 1, to: 1.02 + i * 0.01 },
        scaleY: { from: 1, to: 0.98 - i * 0.01 },
        duration: 2000 + i * 600,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    // Neon Diamond shape (rotated square)
    this.core = this.add.graphics();
    this.drawDiamond(this.core, cx, cy, 90);
    this.core.setInteractive(
      new Phaser.Geom.Rectangle(cx - 95, cy - 95, 190, 190),
      Phaser.Geom.Rectangle.Contains
    );

    // Wobble animation on diamond
    this.tweens.add({
      targets: this.core,
      angle: { from: -2, to: 2 },
      scaleX: { from: 0.97, to: 1.03 },
      scaleY: { from: 1.03, to: 0.97 },
      duration: 2800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Glowing center dot
    this.glowDot = this.add.circle(cx, cy, 22, 0x00eeff, 1);
    this.add.circle(cx, cy, 14, 0xffffff, 0.9);

    // Inner glow bloom effect
    for (let r = 45; r >= 10; r -= 10) {
      this.add.circle(cx, cy, r, 0x00eeff, 0.06);
    }

    // Pulsing glow dot animation
    this.tweens.add({
      targets: this.glowDot,
      scaleX: 1.3,
      scaleY: 1.3,
      alpha: 0.7,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Tap handler
    this.core.on('pointerdown', () => {
      // Scale punch feedback
      this.tweens.add({ targets: this.core, scale: 0.92, duration: 60, yoyo: true });
      this.tweens.add({ targets: this.glowDot, scale: 1.6, alpha: 1, duration: 80, yoyo: true });

      // Floating +0.001 text
      this.spawnFloatText(cx, cy - 60);

      // Emit event for React
      this.events.emit('CORE_TAP');
    });

    // Cursor
    this.input.setDefaultCursor('pointer');
  }

  private drawDiamond(g: Phaser.GameObjects.Graphics, cx: number, cy: number, size: number) {
    g.clear();
    // Outer diamond fill
    g.fillStyle(0x00eeff, 0.06);
    g.beginPath();
    g.moveTo(cx, cy - size);
    g.lineTo(cx + size, cy);
    g.lineTo(cx, cy + size);
    g.lineTo(cx - size, cy);
    g.closePath();
    g.fillPath();

    // Outer diamond stroke (bright)
    g.lineStyle(2.5, 0x00eeff, 0.9);
    g.beginPath();
    g.moveTo(cx, cy - size);
    g.lineTo(cx + size, cy);
    g.lineTo(cx, cy + size);
    g.lineTo(cx - size, cy);
    g.closePath();
    g.strokePath();

    // Inner diamond (slightly smaller, subtle)
    const inner = size * 0.72;
    g.lineStyle(1.5, 0x00eeff, 0.35);
    g.beginPath();
    g.moveTo(cx, cy - inner);
    g.lineTo(cx + inner, cy);
    g.lineTo(cx, cy + inner);
    g.lineTo(cx - inner, cy);
    g.closePath();
    g.strokePath();
  }

  private spawnFloatText(x: number, y: number) {
    const txt = this.add.text(x + Phaser.Math.Between(-20, 20), y, '+0.001', {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: '18px',
      color: '#00eeff',
      alpha: 1,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: txt,
      y: y - 60,
      alpha: 0,
      duration: 900,
      ease: 'Cubic.easeOut',
      onComplete: () => txt.destroy(),
    });
  }
}