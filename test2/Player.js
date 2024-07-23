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
    this.mouse = [];
    this.touch = [];
    this.activeKey = this.keys[0];
    this.eventListener();

    // ANIMATION
    this.frameIndex = 0;
    this.anim = {
      ArrowDown: [0, 2, 0, 3],
      ArrowUp: [4, 6, 4, 7],
      ArrowLeft: [8, 10, 8, 11],
      ArrowRight: [12, 14, 12, 15],
      topLeft: [8, 10, 8, 11],
      left: [8, 10, 8, 11],
      bottomLeft: [8, 10, 8, 11],
      topRight: [12, 14, 12, 15],
      right: [12, 14, 12, 15],
      bottomRight: [12, 14, 12, 15],
    };
  }

  // PLAYER (EVENT)
  eventListener() {
    // KEYBOARD
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

    // MOUSE
    document.addEventListener('mousedown', (e) => {
      let pos = null;

      if (e.x >= window.innerWidth / 2) {
        if (e.y <= window.innerHeight * (1 / 3)) {
          pos = 'topRight';
          if (this.mouse.indexOf(pos) === -1) this.mouse.unshift(pos);
        } else if (e.y <= window.innerHeight * (2 / 3)) {
          pos = 'right';
          if (this.mouse.indexOf(pos) === -1) this.mouse.unshift(pos);
        } else if (e.y <= window.innerHeight) {
          pos = 'bottomRight';
          if (this.mouse.indexOf(pos) === -1) this.mouse.unshift(pos);
        }
      } else {
        if (e.y <= window.innerHeight * (1 / 3)) {
          pos = 'topLeft';
          if (this.mouse.indexOf(pos) === -1) this.mouse.unshift(pos);
        } else if (e.y <= window.innerHeight * (2 / 3)) {
          pos = 'left';
          if (this.mouse.indexOf(pos) === -1) this.mouse.unshift(pos);
        } else if (e.y <= window.innerHeight) {
          pos = 'bottomLeft';
          if (this.mouse.indexOf(pos) === -1) this.mouse.unshift(pos);
        }
      }
    });

    document.addEventListener('mouseup', () => {
      this.mouse.shift();
    });

    // TOUCH
    document.addEventListener('touchstart', (e) => {
      let pos = null;
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      if (x >= window.innerWidth / 2) {
        if (y <= window.innerHeight * (1 / 3)) {
          pos = 'topRight';
          if (this.touch.indexOf(pos) === -1) this.touch.unshift(pos);
        } else if (y <= window.innerHeight * (2 / 3)) {
          pos = 'right';
          if (this.touch.indexOf(pos) === -1) this.touch.unshift(pos);
        } else if (y <= window.innerHeight) {
          pos = 'bottomRight';
          if (this.touch.indexOf(pos) === -1) this.touch.unshift(pos);
        }
      } else {
        if (y <= window.innerHeight * (1 / 3)) {
          pos = 'topLeft';
          if (this.touch.indexOf(pos) === -1) this.touch.unshift(pos);
        } else if (y <= window.innerHeight * (2 / 3)) {
          pos = 'left';
          if (this.touch.indexOf(pos) === -1) this.touch.unshift(pos);
        } else if (y <= window.innerHeight) {
          pos = 'bottomLeft';
          if (this.touch.indexOf(pos) === -1) this.touch.unshift(pos);
        }
      }
    });

    document.addEventListener('touchend', () => {
      this.touch.shift();
    });
  }

  // ANIMATION
  animation(dir) {
    let direction = null;

    // cek animation key
    if (
      dir == 'ArrowDown' ||
      dir == 'ArrowUp' ||
      dir == 'ArrowLeft' ||
      dir == 'ArrowRight' ||
      dir == 'topLeft' ||
      dir == 'left' ||
      dir == 'bottomLeft' ||
      dir == 'topRight' ||
      dir == 'right' ||
      dir == 'bottomRight'
    ) {
      direction = this.anim[dir];
    } else {
      direction = 'ArrowDown';
    }

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
