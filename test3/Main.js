// IMPORT
import { Draw } from './Helper/Draw.js';
import { canvasHeight, canvasWidth, ctx } from './Settings.js';
// import { Sprite } from './Sprite.js';
// import { Vector2D } from './Helper/Vector2D.js';

// DEKLARASI
// const map = new Sprite({
//   src: '../assets/img/map.png',
// });

// const player = new Sprite({
//   src: '../assets/img/char.png',
//   frameSize: new Vector2D(16, 16),
//   hFrame: 4,
//   vFrame: 4,
//   frame: 0,
// });

// TEST
const draw = new Draw();

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

    draw.fillRect({ x: 16, y: 16, width: 16, height: 16, color: 'red' });

    // map.draw(-100, -100);
    // player.draw(0, 0);
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
