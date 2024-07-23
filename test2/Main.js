// IMPORT
import { resource } from './Resource.js';
import { CanvasDraw, Collition, Vector2D } from './Helper.js';
import { Sprite } from './Sprite.js';
import { Player } from './Player.js';
import { boundaryPos } from './map/boundary.js';

// CREATE WINDOW / CANVAS
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// DEKLARASI
const mapSprite = new Sprite({
  src: resource.images.map,
  frameSize: new Vector2D(canvas.width, canvas.height),
});
const player = new Player();

// BOUNDARY
const boundaries = [];
boundaryPos.forEach((pos) => {
  boundaries.push(
    new CanvasDraw({
      ctx: ctx,
      position: pos,
      color: 'rgba(255, 0, 0, 0)',
    })
  );
});
const boundariesRect = [];
boundaries.forEach((obj) => {
  boundariesRect.push(obj.rect());
});

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // DRAW
    mapSprite.draw(ctx, 0, 0);
    player.sprite.draw(ctx, player.pos.x, player.pos.y);

    boundaries.forEach((obj) => {
      obj.drawRect();
    });
  }

  update() {
    // console.log(player.touch);

    const margin = 1;
    const playerRect = player.rect();
    const directions = {
      ArrowDown: { x: 0, y: 1 },
      ArrowUp: { x: 0, y: -1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },

      // MOUSE DIR || TOUCH DIR
      topLeft: { x: -1, y: -1 },
      left: { x: -1, y: 0 },
      bottomLeft: { x: -1, y: 1 },
      topRight: { x: 1, y: -1 },
      right: { x: 1, y: 0 },
      bottomRight: { x: 1, y: +1 },
    };

    let dx = 0,
      dy = 0;
    let isMoving = true;

    // CEK PRESSED KEY
    player.keys.forEach((key) => {
      if (directions[key]) {
        dx += directions[key].x;
        dy += directions[key].y;
      }
    });

    // CEK MOUSE POS
    player.mouse.forEach((pos) => {
      if (directions[pos]) {
        dx += directions[pos].x;
        dy += directions[pos].y;
      }
    });

    // CEK TOUCH POS
    player.touch.forEach((pos) => {
      if (directions[pos]) {
        dx += directions[pos].x;
        dy += directions[pos].y;
      }
    });

    // BOUNDARY COLLITION
    for (let i = 0; i < boundariesRect.length; i++) {
      const obj = boundariesRect[i];
      let collisionObj = { ...obj };

      if (dx > 0) collisionObj.left = obj.left - margin;
      if (dx < 0) collisionObj.right = obj.right + margin;
      if (dy > 0) collisionObj.top = obj.top - margin;
      if (dy < 0) collisionObj.bottom = obj.bottom + margin;

      if (Collition.collide(playerRect, collisionObj)) {
        isMoving = false;
        break;
      }
    }

    // MOVE PLAYER
    if (isMoving) {
      player.pos.x += dx * player.speed;
      player.pos.y += dy * player.speed;
    }
    if (
      player.keys.length > 0 ||
      player.mouse.length > 0 ||
      player.touch.length > 0
    ) {
      player.animation(player.keys[0] || player.mouse[0] || player.touch[0]);
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
