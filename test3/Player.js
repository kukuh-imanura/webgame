import Vector2D from './Helper/Vector2D.js';
import { cameraRect } from './Settings.js';
import Sprite from './Sprite.js';

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
    this.rect = null;

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
    const playerSpeed = Math.ceil(this.speed * dt);

    // DOWN
    if (this.keys[0] === 'ArrowDown') {
      if (this.rect.bottom < cameraRect.bottom) {
        this.isMov = true;
      } else {
        offset.y -= playerSpeed;
        this.isMov = false;
      }

      if (this.isMov) {
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
      if (this.rect.top > cameraRect.top) {
        this.isMov = true;
      } else {
        offset.y += playerSpeed;
        this.isMov = false;
      }

      if (this.isMov) {
        this.pos.y -= playerSpeed;

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

    // RIGHT
    if (this.keys[0] === 'ArrowRight') {
      if (this.rect.right <= cameraRect.right) {
        this.isMov = true;
      } else {
        offset.x -= playerSpeed;
        this.isMov = false;
      }

      if (this.isMov) {
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
      if (this.rect.left > cameraRect.left) {
        this.isMov = true;
      } else {
        offset.x += playerSpeed;
        this.isMov = false;
      }

      if (this.isMov) {
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
