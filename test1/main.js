// IMPORT
import { Helper } from './helper.js';
import { Sprite } from './sprite.js';

// PEMANGGILAN
const helper = new Helper();
const map = new Sprite({
  src: '../assets/Tiled/map.png',
  frameSize: helper.vector2D(480, 270),
});
const player = new Sprite({
  src: '../assets/Tiled/char.png',
  frameSize: helper.vector2D(16, 16),
  hFrame: 4,
  vFrame: 4,
  frame: 0,
});

// console.log(map.image);

class Main {
  constructor() {
    // CREATE WINDOW / CANVAS
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // config
    this.isRun = false;
    this.loop = null;

    // FPS
    this.fps = 1000 / 60;
    this.accTime = 0;
    this.lastTime = 0;

    // bind/ikat "this" agar tidak hilang saat loop
    this.mainLoop = this.mainLoop.bind(this);
  }

  draw() {
    map.draw(this.ctx, 0, 0);
    player.draw(this.ctx, 0, 0);
  }

  update() {}

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
      console.log('ping');
    }

    // req frame untuk loop
    this.loop = requestAnimationFrame(this.mainLoop);
  }

  start() {
    if (this.isRun === false) {
      this.isRun = true;
      this.loop = requestAnimationFrame(this.mainLoop);
    }
  }

  stop() {
    if (this.loop) {
      this.isRun = false;
      this.loop = cancelAnimationFrame(this.loop);
    }
  }
}

// PEMANGGILAN
const game = new Main();
game.start();

setInterval(() => {
  game.stop();
}, 10000);
