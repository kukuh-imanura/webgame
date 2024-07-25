import Vector2D from './Helper/Vector2D.js';
import { ctx } from './Settings.js';

export default class Sprite {
  constructor({ src, frameSize, hFrame, vFrame, frame }) {
    this.src = src;
    this.frameSize = frameSize;
    this.hFrame = hFrame;
    this.vFrame = vFrame;
    this.frame = frame;

    // LOAD IMAGE
    this.img = null;
    this.load();

    // FRAME MAP
    this.frameMap = new Map();
    this.buildFrameMap();
  }

  load() {
    const img = new Image();
    img.src = this.src;
    return (this.img = img);
  }

  // TENTUKAN POS FRAME
  buildFrameMap() {
    let frameNum = 0;
    for (let v = 0; v < this.vFrame; v++) {
      for (let h = 0; h < this.hFrame; h++) {
        this.frameMap.set(
          frameNum,
          new Vector2D(h * this.frameSize.x, v * this.frameSize.y)
        );
        frameNum++;
      }
    }
  }

  draw(x, y) {
    if (this.frameSize) {
      // FRAME/CROPPED IMG (with POS)
      const frame = this.frameMap.get(this.frame);

      // FRAME SIZE
      const frameW = this.frameSize.x;
      const frameH = this.frameSize.y;

      ctx.drawImage(
        this.img,
        frame.x,
        frame.y,
        frameW,
        frameH,
        x,
        y,
        frameW,
        frameH
      );
    } else {
      ctx.drawImage(this.img, x, y);
    }
  }

  rect(x, y) {
    if (!this.frameSize) return;

    const bottom = y + this.frameSize.y;
    const right = x + this.frameSize.x;

    const leftTop = new Vector2D(x, y);
    const leftBottom = new Vector2D(x, bottom);
    const rightTop = new Vector2D(right, y);
    const rightBottom = new Vector2D(right, bottom);
    const center = new Vector2D(x + (right - x) / 2, y + (bottom - y) / 2);

    return {
      top: y,
      left: x,
      bottom: bottom,
      right: right,
      leftTop: leftTop,
      leftBottom: leftBottom,
      rightTop: rightTop,
      rightBottom: rightBottom,
      center: center,
    };
  }
}
