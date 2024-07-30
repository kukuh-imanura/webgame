import Collition from './Helper/Collition.js';
import Draw from './Helper/Draw.js';
import Vector2D from './Helper/Vector2D.js';
import Boundaries from './Map/Boundaries.js';
import { cameraRect } from './Settings.js';
import Sprite from './Sprite.js';

// DEKLARASI
const boundaries = new Boundaries();
const boundaryPos = boundaries.boundaryPos;

export default class Player {
  constructor() {
    this.pos = new Vector2D(32, 32);
    this.sprite = new Sprite({
      src: 'assets/img/char.png',
      frameSize: new Vector2D(16, 16),
      hFrame: 4,
      vFrame: 4,
      frame: 0,
    });

    // INPUT
    this.keys = [];
    this.input();

    // MOVEMENT
    this.speed = 60;
    this.frameSpeed = 0.15;

    // ANIMATION
    this.isMov = false;
    this.frameIndex = 0;
    this.anim = {
      ArrowDown: [0, 2, 0, 3],
      ArrowUp: [4, 6, 4, 7],
      ArrowLeft: [8, 10, 8, 11],
      ArrowRight: [12, 14, 12, 15],
      Idle_ArrowDown: [0, 1],
      Idle_ArrowUp: [4, 5],
      Idle_ArrowLeft: [8, 9],
      Idle_ArrowRight: [12, 13],
    };

    // COLLITION
    this.rect = null;
  }

  input() {
    document.addEventListener('keydown', (e) => {
      if (this.keys.indexOf(e.code) === -1) {
        this.keys.unshift(e.code);
      }
    });

    document.addEventListener('keyup', (e) => {
      const key = this.keys.indexOf(e.code);
      if (key === -1) return;
      this.keys.splice(key, 1);
    });
  }

  movement(dt, offset) {
    this.getRect(this.pos.x, this.pos.y);
    const playerSpeed = Math.ceil(this.speed * dt);

    // DOWN
    if (this.keys[0] === 'ArrowDown') {
      // COLLITION
      this.isCollide = boundaryPos.some((pos) => {
        const rect = Draw.getRect(pos.x + offset.x, pos.y + offset.y, 16, 16);
        return Collition.collide(this.rect, { ...rect, top: rect.top - 5 });
      });
      if (this.isCollide) return;

      if (this.rect.bottom >= cameraRect.bottom) {
        offset.y -= playerSpeed;
      } else {
        this.pos.y += playerSpeed;

        if (
          this.keys[1] === 'ArrowRight' &&
          this.rect.right <= cameraRect.right
        )
          this.pos.x += playerSpeed;

        if (this.keys[1] === 'ArrowLeft' && this.rect.left >= cameraRect.left)
          this.pos.x -= playerSpeed;
      }
    }

    // UP
    if (this.keys[0] === 'ArrowUp') {
      // Berhenti ketika kena boundary
      this.isCollide = boundaryPos.some((pos) => {
        const rect = Draw.getRect(pos.x + offset.x, pos.y + offset.y, 16, 16);
        return Collition.collide(this.rect, {
          ...rect,
          bottom: rect.bottom + 5,
        });
      });

      if (this.isCollide) return;
      if (this.rect.top <= cameraRect.top) {
        // Geser map ketika kena border kamera
        offset.y += playerSpeed;
      } else {
        // Geser pemain
        this.pos.y -= playerSpeed;

        if (
          this.keys[1] === 'ArrowRight' &&
          this.rect.right <= cameraRect.right
        )
          this.pos.x += playerSpeed;
        if (this.keys[1] === 'ArrowLeft' && this.rect.left >= cameraRect.left)
          this.pos.x -= playerSpeed;
      }
    }

    // RIGHT
    if (this.keys[0] === 'ArrowRight') {
      this.isCollide = boundaryPos.some((pos) => {
        const rect = Draw.getRect(pos.x + offset.x, pos.y + offset.y, 16, 16);
        return Collition.collide(this.rect, {
          ...rect,
          left: rect.left - 5,
        });
      });

      if (this.isCollide) return;
      if (this.rect.right >= cameraRect.right) {
        offset.x -= playerSpeed;
      } else {
        this.pos.x += playerSpeed;

        if (
          this.keys[1] === 'ArrowDown' &&
          this.rect.bottom <= cameraRect.bottom
        )
          this.pos.y += playerSpeed;
        if (this.keys[1] === 'ArrowUp' && this.rect.top >= cameraRect.top)
          this.pos.y -= playerSpeed;
      }
    }

    // LEFT
    if (this.keys[0] === 'ArrowLeft') {
      this.isCollide = boundaryPos.some((pos) => {
        const rect = Draw.getRect(pos.x + offset.x, pos.y + offset.y, 16, 16);
        return Collition.collide(this.rect, {
          ...rect,
          right: rect.right + 5,
        });
      });

      if (this.isCollide) return;
      if (this.rect.left <= cameraRect.left) {
        offset.x += playerSpeed;
      } else {
        this.pos.x -= playerSpeed;

        if (
          this.keys[1] === 'ArrowDown' &&
          this.rect.bottom <= cameraRect.bottom
        )
          this.pos.y += playerSpeed;
        if (this.keys[1] === 'ArrowUp' && this.rect.top >= cameraRect.top)
          this.pos.y -= playerSpeed;
      }
    }
  }

  getRect(x, y) {
    this.rect = this.sprite.rect(x, y);
  }

  animation(dir) {
    if (
      dir == 'ArrowDown' ||
      dir == 'ArrowUp' ||
      dir == 'ArrowLeft' ||
      dir == 'ArrowRight'
    ) {
      // MOVING
      let anim = this.anim[dir];
      this.frameIndex += this.frameSpeed;
      if (this.frameIndex >= anim.length) this.frameIndex = 0;
      this.sprite.frame = anim[Math.floor(this.frameIndex)];
    } else {
      // GET FRAME
      let frame = 'Idle_ArrowDown';
      // if (this.sprite.frame <= 3) {
      //   frame = 'Idle_ArrowDown';
      // } else if (this.sprite.frame <= 7) {
      //   frame = 'Idle_ArrowUp';
      // } else if (this.sprite.frame <= 11) {
      //   frame = 'Idle_ArrowLeft';
      // } else if (this.sprite.frame <= 15) {
      //   frame = 'Idle_ArrowRight';
      // }

      // IDLE
      let anim = this.anim[frame];
      this.frameIndex += this.frameSpeed / 3;
      if (this.frameIndex >= anim.length) this.frameIndex = 0;
      this.sprite.frame = anim[Math.floor(this.frameIndex)];
    }
  }
}
