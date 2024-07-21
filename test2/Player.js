import { Helper } from './Helper.js';
import { resource } from './Resource.js';
import { Sprite } from './Sprite.js';

export class Player {
  constructor() {
    // PLAYER SPRITE
    this.pos = Helper.vector2D(16 * 10, 16 * 10);
    this.sprite = new Sprite({
      src: resource.images.player,
      frameSize: Helper.vector2D(16, 16),
      hFrame: 4,
      vFrame: 4,
      frame: 0,
    });

    // PLAYER MOVEMENT
    this.speed = 1;
    this.keys = [];
    this.activeKey = this.keys[0];

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

    // PLAYER MOVEMENT
    const playerDown = this.keys.includes('ArrowDown');
    const playerUp = this.keys.includes('ArrowUp');
    const playerLeft = this.keys.includes('ArrowLeft');
    const playerRight = this.keys.includes('ArrowRight');

    if (playerDown && playerRight) {
      this.pos.y += this.speed;
      this.pos.x += this.speed;
      this.animation(this.keys[0]);
    } else if (playerDown && playerLeft) {
      this.pos.y += this.speed;
      this.pos.x -= this.speed;
      this.animation(this.keys[0]);
    } else if (playerUp && playerRight) {
      this.pos.y -= this.speed;
      this.pos.x += this.speed;
      this.animation(this.keys[0]);
    } else if (playerUp && playerLeft) {
      this.pos.y -= this.speed;
      this.pos.x -= this.speed;
      this.animation(this.keys[0]);
    } else {
      // Menangani gerakan tunggal berdasarkan tombol terakhir yang ditekan
      if (this.keys[0] === 'ArrowDown') {
        this.pos.y += this.speed;
        this.animation(this.keys[0]);
      }
      if (this.keys[0] === 'ArrowUp') {
        this.pos.y -= this.speed;
        this.animation(this.keys[0]);
      }
      if (this.keys[0] === 'ArrowLeft') {
        this.pos.x -= this.speed;
        this.animation(this.keys[0]);
      }
      if (this.keys[0] === 'ArrowRight') {
        this.pos.x += this.speed;
        this.animation(this.keys[0]);
      }
    }
  }

  // ANIMATION
  animation(dir) {
    const direction = this.anim[dir];
    this.frameIndex += 0.1;
    if (this.frameIndex >= direction.length) this.frameIndex = 0;
    this.sprite.frame = direction[Math.floor(this.frameIndex)];
  }
}
