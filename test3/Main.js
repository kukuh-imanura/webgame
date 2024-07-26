// IMPORT
import Player from './Player.js';
import { canvasHeight, canvasWidth, ctx } from './Settings.js';
import Sprite from './Sprite.js';

// DEKLARASI
const map = new Sprite({
  src: '../assets/img/map.png',
});
const player = new Player();

// TEST

class Main {
  constructor() {
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
    // BERSIHKAN CANVAS
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    map.draw(-100, -100);
    player.sprite.draw(player.pos.x, player.pos.y);
  }

  update(dt) {
    player.movement(dt);
    player.animation(player.keys[0]);
    player.getRect(player.pos.x, player.pos.y);
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
      // main code
      this.draw();
      this.update(this.fps / 1000);
      this.accTime -= this.fps;
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
