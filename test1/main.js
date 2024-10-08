class Helper {
  constructor() {}

  static load(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;

      img.onload = () => resolve(img);
    });
  }
}

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

    // preload img
    this.images = {};
    this.preloadImages();
  }

  async preloadImages() {
    this.images.map = await Helper.load('./map.png');
    this.images.player = await Helper.load('./char.png');
  }

  draw() {
    if (this.images.map) {
      this.ctx.drawImage(this.images.map, 0, 0);
    }

    if (this.images.player) {
      this.ctx.drawImage(this.images.player, 0, 0);
    }
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
