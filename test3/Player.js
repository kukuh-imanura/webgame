import Collition from './Helper/Collition.js';
import Draw from './Helper/Draw.js';
import Vector2D from './Helper/Vector2D.js';
import Boundaries from './Map/boundaries.js';
import { cameraRect } from './Settings.js';
import Sprite from './Sprite.js';

// DEKLARASI
const boundaries = new Boundaries();
const boundaryPos = boundaries.boundaryPos;

export default class Player {
  constructor() {
    this.pos = new Vector2D(32, 32);
    this.sprite = new Sprite({
      src: '../assets/img/char.png',
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
    this.isMov = true;

    // ANIMATION
    this.frameIndex = 0;
    this.anim = {
      ArrowDown: [0, 2, 0, 3],
      ArrowUp: [4, 6, 4, 7],
      ArrowLeft: [8, 10, 8, 11],
      ArrowRight: [12, 14, 12, 15],
    };

    // COLLITION
    this.rect = null;
    // this.isCollide = false; // cek collition dengan boundary
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

    // BOUNDARIES

    // DOWN
    if (this.keys[0] === 'ArrowDown') {
      this.isCollide = boundaryPos.some((pos) => {
        const rect = Draw.getRect(pos.x + offset.x, pos.y + offset.y, 16, 16);
        return Collition.collide(this.rect, { ...rect, top: rect.top - 5 });
      });

      if (this.isCollide) {
        this.isMov = false;
      } else if (this.rect.bottom >= cameraRect.bottom) {
        offset.y -= playerSpeed;
        this.isMov = false;
      } else {
        this.pos.y += playerSpeed;

        if (this.keys[1] === 'ArrowRight') {
          this.isMov = this.rect.right < cameraRect.right;
          if (this.isMov) this.pos.x += playerSpeed;
        }
        if (this.keys[1] === 'ArrowLeft') {
          this.isMov = this.rect.left > cameraRect.left;
          if (this.isMov) this.pos.x -= playerSpeed;
        }
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

      if (this.isCollide) {
        this.isMov = false;
      } else if (this.rect.top <= cameraRect.top) {
        // Geser map ketika kena border kamera
        offset.y += playerSpeed;
        this.isMov = false;
      } else {
        // Geser pemain
        this.pos.y -= playerSpeed;

        if (
          this.keys[1] === 'ArrowRight' &&
          this.rect.right < cameraRect.right
        ) {
          this.pos.x += playerSpeed;
        }
        if (this.keys[1] === 'ArrowLeft' && this.rect.left > cameraRect.left) {
          this.pos.x -= playerSpeed;
        }
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

      if (this.isCollide) {
        this.isMov = false;
      } else if (this.rect.right >= cameraRect.right) {
        offset.x -= playerSpeed;
        this.isMov = false;
      } else {
        this.pos.x += playerSpeed;

        if (this.keys[1] === 'ArrowDown') {
          this.isMov = this.rect.bottom < cameraRect.bottom;
          if (this.isMov) this.pos.y += playerSpeed;
        } else if (this.keys[1] === 'ArrowUp') {
          this.isMov = this.rect.top > cameraRect.top;
          if (this.isMov) this.pos.y -= playerSpeed;
        }
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

      if (this.isCollide) {
        this.isMov = false;
      } else if (this.rect.left <= cameraRect.left) {
        offset.x += playerSpeed;
        this.isMov = false;
      } else {
        this.pos.x -= playerSpeed;

        if (this.keys[1] === 'ArrowDown') {
          this.isMov = this.rect.bottom < cameraRect.bottom;
          if (this.isMov) this.pos.y += playerSpeed;
        } else if (this.keys[1] === 'ArrowUp') {
          this.isMov = this.rect.top > cameraRect.top;
          if (this.isMov) this.pos.y -= playerSpeed;
        }
      }
    }
  }

  getRect(x, y) {
    this.rect = this.sprite.rect(x, y);
  }

  animation(dir) {
    if (
      dir != 'ArrowDown' &&
      dir != 'ArrowUp' &&
      dir != 'ArrowLeft' &&
      dir != 'ArrowRight'
    )
      return;

    let direction = this.anim[dir];

    this.frameIndex += this.frameSpeed;

    if (this.frameIndex >= direction.length) this.frameIndex = 0;

    this.sprite.frame = direction[Math.floor(this.frameIndex)];
  }
}
