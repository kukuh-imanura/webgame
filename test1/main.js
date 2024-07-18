class Main {
  constructor() {
    // CREATE WINDOW / CANVAS
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.isRun = false;
    this.loop = null;

    // bind/ikat "this" agar tidak hilang saat loop
    this.mainLoop = this.mainLoop.bind(this);
  }

  draw() {}

  update() {}

  mainLoop() {
    // cek apakah jalan
    if (this.isRun === false) return;

    // main code
    console.log('mainLoop');

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
}, 3000);
