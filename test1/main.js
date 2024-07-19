class Sprite {
  constructor({ src, frameSize, hFrame, vFrame, frame }) {
    this.src = src;
    this.frameSize = frameSize;
    this.hFrame = hFrame ?? 1;
    this.vFrame = vFrame ?? 1;
    this.frame = frame ?? 0;
    this.image = null;

    // LOAD
    this.load();
  }

  // LOAD
  load() {
    this.image = new Image();
    this.image.src = this.src;
  }
}

const map = new Sprite({
  src: '../assets/Tiled/map.png',
});

console.log(map.image);

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
    // this.ctx.drawImage(map.image, 0, 0);
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
