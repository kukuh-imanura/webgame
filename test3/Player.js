import Vector2D from './Helper/Vector2D.js';
import {
  canvasBottom,
  canvasLeft,
  canvasRight,
  canvasTop,
} from './Settings.js';
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

  movement(dt) {
    // DOWN
    if (this.keys[0] === 'ArrowDown') {
      this.isMov = this.rect.bottom < canvasBottom;

      if (this.isMov) {
        this.pos.y += Math.ceil(this.speed * dt);

        if (this.keys[1] === 'ArrowRight') {
          this.isMov = this.rect.right < canvasRight;
          if (this.isMov) this.pos.x += Math.ceil(this.speed * dt);
        }
        if (this.keys[1] === 'ArrowLeft') {
          this.isMov = this.rect.left > canvasLeft;
          if (this.isMov) this.pos.x -= Math.ceil(this.speed * dt);
        }
      }
    }

    // UP
    if (this.keys[0] === 'ArrowUp') {
      this.isMov = this.rect.top > canvasTop;

      if (this.isMov) {
        this.pos.y -= Math.ceil(this.speed * dt);

        if (this.keys[1] === 'ArrowRight') {
          this.isMov = this.rect.right < canvasRight;
          if (this.isMov) this.pos.x += Math.ceil(this.speed * dt);
        }
        if (this.keys[1] === 'ArrowLeft') {
          this.isMov = this.rect.left > canvasLeft;
          if (this.isMov) this.pos.x -= Math.ceil(this.speed * dt);
        }
      }
    }

    // RIGHT
    if (this.keys[0] === 'ArrowRight') {
      this.isMov = this.rect.right <= canvasRight;

      if (this.isMov) {
        this.pos.x += Math.ceil(this.speed * dt);

        if (this.keys[1] === 'ArrowDown') {
          this.isMov = this.rect.bottom < canvasBottom;
          if (this.isMov) this.pos.y += Math.ceil(this.speed * dt);
        } else if (this.keys[1] === 'ArrowUp') {
          this.isMov = this.rect.top > canvasTop;
          if (this.isMov) this.pos.y -= Math.ceil(this.speed * dt);
        }
      }
    }

    // LEFT
    if (this.keys[0] === 'ArrowLeft') {
      this.isMov = this.rect.left > canvasLeft;

      if (this.isMov) {
        this.pos.x -= Math.ceil(this.speed * dt);

        if (this.keys[1] === 'ArrowDown') {
          this.isMov = this.rect.bottom < canvasBottom;
          if (this.isMov) this.pos.y += Math.ceil(this.speed * dt);
        } else if (this.keys[1] === 'ArrowUp') {
          this.isMov = this.rect.top > canvasTop;
          if (this.isMov) this.pos.y -= Math.ceil(this.speed * dt);
        }
      }
    }
  }

  getRect(x, y) {
    this.rect = this.sprite.rect(x, y);
  }

  animation(dir) {
    // cek directin
    if (!dir) return;

    let direction = this.anim[dir];

    this.frameIndex += this.frameSpeed;

    if (this.frameIndex >= direction.length) this.frameIndex = 0;

    this.sprite.frame = direction[Math.floor(this.frameIndex)];
  }
}
