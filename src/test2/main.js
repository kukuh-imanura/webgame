class Resource {
  constructor() {
    this.toLoad = {
      map: './public/assets/img/map.png',
      player: '../../public/assets/img/char.png',
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];

      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

const resource = new Resource();
const map = resource.images.map;

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
    if (map.isLoaded) {
      this.ctx.drawImage(map.image, 0, 0);
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
