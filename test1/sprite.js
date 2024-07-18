export class Sprite {
  constructor({ src, frameSize, hFrame, vFrame, frame }) {
    this.src = src;
    this.frameSize = frameSize;
    this.hFrame = hFrame ?? 1;
    this.vFrame = vFrame ?? 1;
    this.frame = frame ?? 0;

    this.image = null;
    this.frameMap = new Map();

    // JALANKAN METHOD
    this.load();
    // this.buildFrameMap();
  }

  // LOAD
  load() {
    const img = new Image();
    img.src = this.src;

    this.image = img;
  }

  // BUILD FRAME MAP
  buildFrameMap() {
    let frameNum = 0;
    for (let v = 0; v < this.vFrame; v++) {
      for (let h = 0; h < this.hFrame; h++) {
        this.frameMap.set(
          frameNum,
          helper.vector2D(h * this.frameSize.x, v * this.frameSize.y)
        );
        frameNum++;
      }
    }
  }

  // DRAW SPRITE
  draw(ctx, x, y) {
    // cek img sudah di load
    if (!this.image) {
      return;
    }

    // ambil frame yang akan di draw
    const frame = this.frameMap.get(this.frame);

    let frameX = 0;
    let frameY = 0;

    // koordinat frame (cropped sprite)
    if (frame) {
      frameX = frame.x;
      frameY = frame.y;
    }

    // ukuran frame
    const frameWidth = this.frameSize.x;
    const frameHeight = this.frameSize.y;

    ctx.drawImage(
      this.image,

      frameX,
      frameY,

      frameWidth,
      frameHeight,

      x,
      y,

      frameWidth,
      frameHeight
    );
  }
}
