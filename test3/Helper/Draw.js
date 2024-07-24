import { ctx } from '../Settings.js';

export class Draw {
  constructor() {}

  fillRect({ x, y, width, height, color }) {
    if (color) ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }
}
