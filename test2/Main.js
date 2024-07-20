// IMPORT
import { Helper } from './Helper.js';
import { resource } from './Resource.js';
import { Sprite } from './Sprite.js';

// TEST
class Player {
  constructor() {
    // PLAYER SPRITE
    this.sprite = new Sprite({
      src: resource.images.player,
      frameSize: Helper.vector2D(16, 16),
      hFrame: 4,
      vFrame: 4,
      frame: 0,
    });

    // PLAYER MOVEMENT
    this.pos = Helper.vector2D(16 * 10, 16 * 10);
    this.speed = 1;
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };

    // JALANKAN METHOD
    this.movement();
  }

  // PLAYER MOV (EVENT)
  movement() {
    document.addEventListener('keydown', (e) => {
      if (this.keys[e.key] !== undefined) {
        this.keys[e.key] = true;
      }
    });

    document.addEventListener('keyup', (e) => {
      if (this.keys[e.key] !== undefined) {
        this.keys[e.key] = false;
      }
    });
  }
}

// DEKLARASI
const canvas = document.getElementById('game-canvas');

const player = new Player();
const mapSprite = new Sprite({
  src: resource.images.map,
  frameSize: Helper.vector2D(canvas.width, canvas.height),
});

class Main {
  constructor() {
    // CREATE WINDOW / CANVAS
    this.ctx = canvas.getContext('2d');

    // config
    this.isRun = false;
    this.animationFrame = null;

    // FPS
    this.fps = 1000 / 60;
    this.accTime = 0;
    this.lastTime = 0;

    // bind/ikat "this" agar tidak hilang saat loop
    this.mainLoop = this.mainLoop.bind(this);
  }

  draw() {
    mapSprite.draw(this.ctx, 0, 0);
    player.sprite.draw(this.ctx, player.pos.x, player.pos.y);
  }

  update() {
    // PLAYERV MOV
    if (player.keys.ArrowDown) {
      player.pos.y += player.speed;
    }
    if (player.keys.ArrowUp) {
      player.pos.y -= player.speed;
    }
    if (player.keys.ArrowRight) {
      player.pos.x += player.speed;
    }
    if (player.keys.ArrowLeft) {
      player.pos.x -= player.speed;
    }
  }

  mainLoop(timestamp) {
    // cek apakah jalan
    if (this.isRun === false) return;

    // menghitung dt (delta time) loop utama
    const dt = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // stabilisasi fps (fps looping)
    this.accTime += dt;
    while (this.accTime >= this.fps) {
      this.accTime -= this.fps;

      // main code
      this.draw();
      this.update();
    }

    // req frame untuk loop
    this.animationFrame = requestAnimationFrame(this.mainLoop);
  }

  start() {
    if (this.isRun === false) {
      this.isRun = true;
      this.animationFrame = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.animationFrame) {
      this.isRun = false;
      this.animationFrame = cancelAnimationFrame(this.animationFrame);
    }
  }
}

// PEMANGGILAN
const game = new Main();
game.start();

setInterval(() => {
  game.stop();
  alert('STOP');
}, 30000);
