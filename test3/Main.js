// IMPORT
import Vector2D from './Helper/Vector2D.js';
import Player from './Player.js';
import {
  canvasHeight,
  canvasRect,
  canvasWidth,
  ctx,
  screenHeight,
  screenWidth,
} from './Settings.js';
import Map from './Map/Map.js';
import GroundObj, { Bush } from './Map/Object.js';
import { Button } from './Helper/Button.js';

// DEKLARASI
const offset = new Vector2D(-100, -100);
const map = new Map();
const player = new Player();
const bush = new Bush({ pos: new Vector2D(150, 150), frame: 20 });

// SPRITE GROUP
const randBush = Bush.random(10);
const mush = GroundObj.random(10, 0, 1);
const cameraGroup = [player, bush, ...randBush, ...mush];

// TEST
const btn = new Button(canvasWidth / 2, canvasRect.bottom - 50, 4);

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

    map.sprite.draw(offset.x, offset.y);

    // SORTING
    cameraGroup.sort((a, b) => {
      const aY = a === player ? a.pos.y : a.pos.y + offset.y;
      const bY = b === player ? b.pos.y : b.pos.y + offset.y;
      return aY - bY;
    });

    // DRAW GROUP
    cameraGroup.forEach((obj) => {
      if (obj == player) {
        obj.sprite.draw(obj.pos.x, obj.pos.y);
      } else {
        obj.sprite.draw(obj.pos.x + offset.x, obj.pos.y + offset.y);
      }
    });

    // CONTROLLER
    if (screenHeight > screenWidth) btn.draw();
  }

  update(dt) {
    // console.log(Math.round(btn.dx));
    const cont = {
      x: Math.round(btn.dx),
      y: Math.round(btn.dy),
    };

    let dir = null;
    cont.x > 0
      ? (dir = 'ArrowRight')
      : cont.x < 0
      ? (dir = 'ArrowLeft')
      : cont.y > 0
      ? (dir = 'ArrowDown')
      : cont.y < 0
      ? (dir = 'ArrowUp')
      : (dir = player.keys[0]);

    player.movement(dt, offset);
    player.controllerMov(dt, offset, cont);
    player.animation(dir);
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
