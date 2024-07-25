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
    this.speed = 1;
    this.isMov = true;
    // this.directions = {
    //   ArrowDown: { x: 0, y: 1 },
    //   ArrowUp: { x: 0, y: -1 },
    //   ArrowLeft: { x: -1, y: 0 },
    //   ArrowRight: { x: 1, y: 0 },
    // };

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

  movement() {
    // DOWN
    if (this.keys[0] === 'ArrowDown') {
      this.isMov = this.rect.bottom < canvasBottom;

      if (this.isMov) {
        this.pos.y += this.speed;
        this.animation('ArrowDown');

        if (this.keys[1] === 'ArrowRight') {
          this.isMov = this.rect.right < canvasRight;
          if (this.isMov) this.pos.x += this.speed;
        }
        if (this.keys[1] === 'ArrowLeft') {
          this.isMov = this.rect.left > canvasLeft;
          if (this.isMov) this.pos.x -= this.speed;
        }
      }
    }

    // UP
    if (this.keys[0] === 'ArrowUp') {
      this.isMov = this.rect.top > canvasTop;

      if (this.isMov) {
        this.pos.y -= this.speed;
        this.animation('ArrowUp');

        if (this.keys[1] === 'ArrowRight') {
          this.isMov = this.rect.right < canvasRight;
          if (this.isMov) this.pos.x += this.speed;
        }
        if (this.keys[1] === 'ArrowLeft') {
          this.isMov = this.rect.left > canvasLeft;
          if (this.isMov) this.pos.x -= this.speed;
        }
      }
    }

    // RIGHT
    if (this.keys[0] === 'ArrowRight') {
      this.isMov = this.rect.right <= canvasRight;

      if (this.isMov) {
        this.pos.x += this.speed;
        this.animation('ArrowRight');

        if (this.keys[1] === 'ArrowDown') {
          this.isMov = this.rect.bottom < canvasBottom;
          if (this.isMov) this.pos.y += this.speed;
        } else if (this.keys[1] === 'ArrowUp') {
          this.isMov = this.rect.top > canvasTop;
          if (this.isMov) this.pos.y -= this.speed;
        }
      }
    }

    // LEFT
    if (this.keys[0] === 'ArrowLeft') {
      this.isMov = this.rect.left > canvasLeft;

      if (this.isMov) {
        this.pos.x -= this.speed;
        this.animation('ArrowLeft');

        if (this.keys[1] === 'ArrowDown') {
          this.isMov = this.rect.bottom < canvasBottom;
          if (this.isMov) this.pos.y += this.speed;
        } else if (this.keys[1] === 'ArrowUp') {
          this.isMov = this.rect.top > canvasTop;
          if (this.isMov) this.pos.y -= this.speed;
        }
      }
    }

    // let dx = 0;
    // let dy = 0;

    // this.keys.forEach((key) => {
    //   dx += this.directions[key].x;
    //   dy += this.directions[key].y;
    // });

    // this.pos.x += dx * this.speed;
    // this.pos.y += dy * this.speed;

    // if (this.keys[0]) this.animation(this.keys[0]);
  }

  getRect(x, y) {
    this.rect = this.sprite.rect(x, y);
  }

  animation(dir) {
    let direction = this.anim[dir];

    this.frameIndex += 0.1;

    if (this.frameIndex >= direction.length) this.frameIndex = 0;

    this.sprite.frame = direction[Math.floor(this.frameIndex)];
  }
}
