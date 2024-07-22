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
    // COLLITION
    let isMoving = true;
    const playerRect = player.rect();
    const margin = 1;

    // console.log(playerRect);

    // PLAYER MOVEMENT
    const playerMov = {
      down: player.keys.includes('ArrowDown'),
      up: player.keys.includes('ArrowUp'),
      left: player.keys.includes('ArrowLeft'),
      right: player.keys.includes('ArrowRight'),
    };

    if (playerMov.down && playerMov.right) {
      for (let i = 0; i < boundariesRect.length; i++) {
        const obj = boundariesRect[i];
        if (
          Collition.collide(playerRect, {
            ...obj,
            top: obj.top - margin,
            left: obj.left - margin,
          })
        ) {
          isMoving = false;
          break;
        }
      }
      if (isMoving) {
        player.pos.y += player.speed;
        player.pos.x += player.speed;
      }
    } else if (playerMov.down && playerMov.left) {
      for (let i = 0; i < boundariesRect.length; i++) {
        const obj = boundariesRect[i];
        if (
          Collition.collide(playerRect, {
            ...obj,
            top: obj.top - margin,
            right: obj.right + margin,
          })
        ) {
          isMoving = false;
          break;
        }
      }
      if (isMoving) {
        player.pos.y += player.speed;
        player.pos.x -= player.speed;
      }
    } else if (playerMov.up && playerMov.right) {
      for (let i = 0; i < boundariesRect.length; i++) {
        const obj = boundariesRect[i];
        if (
          Collition.collide(playerRect, {
            ...obj,
            bottom: obj.bottom + margin,
            left: obj.left - margin,
          })
        ) {
          isMoving = false;
          break;
        }
      }
      if (isMoving) {
        player.pos.y -= player.speed;
        player.pos.x += player.speed;
      }
    } else if (playerMov.up && playerMov.left) {
      for (let i = 0; i < boundariesRect.length; i++) {
        const obj = boundariesRect[i];
        if (
          Collition.collide(playerRect, {
            ...obj,
            bottom: obj.bottom + margin,
            right: obj.right + margin,
          })
        ) {
          isMoving = false;
          break;
        }
      }
      if (isMoving) {
        player.pos.y -= player.speed;
        player.pos.x -= player.speed;
      }
    } else {
      // Menangani gerakan tunggal berdasarkan tombol terakhir yang ditekan
      if (player.keys[0] === 'ArrowDown') {
        // collition check
        for (let i = 0; i < boundariesRect.length; i++) {
          const obj = boundariesRect[i];
          if (
            Collition.collide(playerRect, { ...obj, top: obj.top - margin })
          ) {
            isMoving = false;
            break;
          }
        }
        if (isMoving) player.pos.y += player.speed;
      }
      if (player.keys[0] === 'ArrowUp') {
        for (let i = 0; i < boundariesRect.length; i++) {
          const obj = boundariesRect[i];
          if (
            Collition.collide(playerRect, {
              ...obj,
              bottom: obj.bottom + margin,
            })
          ) {
            isMoving = false;
            break;
          }
        }
        if (isMoving) player.pos.y -= player.speed;
      }
      if (player.keys[0] === 'ArrowLeft') {
        for (let i = 0; i < boundariesRect.length; i++) {
          const obj = boundariesRect[i];
          if (
            Collition.collide(playerRect, { ...obj, right: obj.right + margin })
          ) {
            isMoving = false;
            break;
          }
        }
        if (isMoving) player.pos.x -= player.speed;
      }
      if (player.keys[0] === 'ArrowRight') {
        for (let i = 0; i < boundariesRect.length; i++) {
          const obj = boundariesRect[i];
          if (
            Collition.collide(playerRect, { ...obj, left: obj.left - margin })
          ) {
            isMoving = false;
            break;
          }
        }
        if (isMoving) player.pos.x += player.speed;
      }
    }

    // PLAYER MOV ANIMATION
    if (player.keys.length > 0) {
      player.animation(player.keys[0]);
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
