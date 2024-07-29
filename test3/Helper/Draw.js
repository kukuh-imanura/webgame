import { ctx } from '../Settings.js';

export default class Draw {
  constructor() {}

  static fillRect(x, y, width, height, color = 'red') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    return this.getRect(x, y, width, height);
  }

  static line(coor) {
    // PINDAHKAN ARRAY
    const moveTo = coor.splice(0, 2);
    const lineTo = [];
    for (let i = 0; i < coor.length; i += 2) {
      const arr = [...coor];
      lineTo.push(arr.splice(i, 2));
    }

    // DRAW
    ctx.moveTo(moveTo[0], moveTo[1]);

    lineTo.forEach((arr) => {
      ctx.lineTo(arr[0], arr[1]);
    });

    ctx.lineTo(moveTo[0], moveTo[1]);
    ctx.stroke();
  }

  static getRect(x, y, width, height) {
    return {
      top: y,
      bottom: y + height,
      left: x,
      right: x + width,
    };
  }
}
