// IMPORT
import { resource } from './Resource.js';
import { Helper } from './Helper.js';
import { Sprite } from './Sprite.js';

// TEST
class Player {
  constructor() {
    // PLAYER SPRITE
    this.pos = Helper.vector2D(16 * 10, 16 * 10);
    this.sprite = new Sprite({
      src: resource.images.player,
      frameSize: Helper.vector2D(16, 16),
      hFrame: 4,
      vFrame: 4,
      frame: 0,
    });

    // PLAYER MOVEMENT
    this.speed = 1;
    this.keys = [];
    this.activeKey = this.keys[0];

    // JALANKAN METHOD
    this.movement();
  }

  // PLAYER MOV (EVENT)
  movement() {
    document.addEventListener('keydown', (e) => {
      // cek jika keys kosong
      if (this.keys.indexOf(e.key) === -1) {
        // tambahkan key ke awal
        this.keys.unshift(e.key);
        console.log(this.keys);
      }
    });

    document.addEventListener('keyup', (e) => {
      const index = this.keys.indexOf(e.key);

      if (index === -1) return;

      this.keys.splice(index, 1);
      console.log(this.keys);
    });
  }
}

const player = new Player();

// DEKLARASI
const canvas = document.getElementById('game-canvas');

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
    if (player.keys[0] === 'ArrowDown') {
      player.pos.y += player.speed;
    }
    if (player.keys[0] === 'ArrowUp') {
      player.pos.y -= player.speed;
    }
    if (player.keys[0] === 'ArrowRight') {
      player.pos.x += player.speed;
    }
    if (player.keys[0] === 'ArrowLeft') {
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
