export class Collition {
  static collide(rect1, rect2) {
    return (
      rect1.right >= rect2.left &&
      rect1.left <= rect2.right &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    );
  }

  static top(rect1, rect2) {
    return (
      rect1.top == rect2.bottom &&
      rect1.right >= rect2.left &&
      rect1.left <= rect2.right
    );
  }

  static bottom(rect1, rect2) {
    return (
      rect1.bottom == rect2.top &&
      rect1.right >= rect2.left &&
      rect1.left <= rect2.right
    );
  }

  static left(rect1, rect2) {
    return (
      rect1.left == rect2.right &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    );
  }

  static right(rect1, rect2) {
    return (
      rect1.right == rect2.left &&
      rect1.top <= rect2.bottom &&
      rect1.bottom >= rect2.top
    );
  }
}

export class CanvasDraw {
  constructor({ ctx, position, width, height, color }) {
    this.ctx = ctx;
    this.position = position;
    this.width = width ?? 16;
    this.height = height ?? 16;
    this.color = color ?? 'red';
  }

  drawRect() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  rect() {
    return {
      left: this.position.x,
      right: this.position.x + this.width,
      top: this.position.y,
      bottom: this.position.y + this.height,
    };
  }
}

export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
