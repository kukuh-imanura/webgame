import { canvasRect, canvasWidth, ctx } from '../Settings.js';

export class Button {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.X = x;
    this.Y = y;
    this.R = r * 2.5;

    this.dx = 0;
    this.dy = 0;

    // EVENT
    this.event();
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
    ctx.restore();

    // BOUNDARY
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.X, this.Y, this.R, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.stroke();
    ctx.restore();
  }

  text() {
    ctx.fillText(
      Math.round(this.dx) + ' ' + Math.round(this.dy),
      canvasWidth / 2,
      canvasRect.top + 20
    );
    ctx.textAlign = 'center';
  }

  event() {
    document.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.x = e.touches[0].clientX / 4;
      this.y = e.touches[0].clientY / 4;
    });

    document.addEventListener('touchmove', (e) => {
      this.x = e.changedTouches[0].clientX / 4;
      this.y = e.changedTouches[0].clientY / 4;

      let ax = this.x - this.X;
      let ay = this.y - this.Y;

      let mag = Math.sqrt(ax ** 2 + ay ** 2);

      this.dx = ax / mag;
      this.dy = ay / mag;

      this.x = this.X + this.dx * this.R;
      this.y = this.Y + this.dy * this.R;
    });

    document.addEventListener('touchend', () => {
      this.x = this.X;
      this.y = this.Y;
      this.dx = 0;
      this.dy = 0;
    });
  }
}
