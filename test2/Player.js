import { Vector2D } from './Helper.js';
import { resource } from './Resource.js';
import { Sprite } from './Sprite.js';

export class Player {
  constructor() {
    // PLAYER SPRITE
    this.pos = new Vector2D(16 * 10, 16 * 10);
    this.sprite = new Sprite({
      src: resource.images.player,
      frameSize: new Vector2D(16, 16),
      hFrame: 4,
      vFrame: 4,
      frame: 0,
    });

    this.width = this.sprite.src.image.width / this.sprite.vFrame;
    this.height = this.sprite.src.image.height / this.sprite.hFrame;

    // PLAYER MOVEMENT
    this.speed = 1;
    this.keys = [];
    this.activeKey = this.keys[0];
    this.movement();

    // ANIMATION
    this.frameIndex = 0;
    this.anim = {
      ArrowDown: [0, 2, 0, 3],
      ArrowUp: [4, 6, 4, 7],
      ArrowLeft: [8, 10, 8, 11],
      ArrowRight: [12, 14, 12, 15],
    };
  }

  // PLAYER MOV (EVENT)
  movement() {
    document.addEventListener('keydown', (e) => {
      // cek jika keys kosong
      if (this.keys.indexOf(e.key) === -1) {
        // tambahkan key ke awal
        this.keys.unshift(e.key);
      }
    });

    document.addEventListener('keyup', (e) => {
      const index = this.keys.indexOf(e.key);

      if (index === -1) return;

      this.keys.splice(index, 1);
    });
  }

  // ANIMATION
  animation(dir) {
    const direction = this.anim[dir];
    this.frameIndex += 0.1;
    if (this.frameIndex >= direction.length) this.frameIndex = 0;
    this.sprite.frame = direction[Math.floor(this.frameIndex)];
  }

  rect() {
    return {
      left: this.pos.x,
      right: this.pos.x + this.width,
      top: this.pos.y,
      bottom: this.pos.y + this.height,
    };
  }
}
