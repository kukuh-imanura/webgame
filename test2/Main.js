// IMPORT
import { resource } from './Resource.js';
import { Helper } from './Helper.js';
import { Sprite } from './Sprite.js';
import { Player } from './Player.js';

// TEST

// DEKLARASI
const canvas = document.getElementById('game-canvas');
const mapSprite = new Sprite({
  src: resource.images.map,
  frameSize: Helper.vector2D(canvas.width, canvas.height),
});
const player = new Player();

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
    player.movement();
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
