import { Random } from '../Helper/Random.js';
import Vector2D from '../Helper/Vector2D.js';
import Sprite from '../Sprite.js';

export default class GroundObj {
  constructor({ pos, frame }) {
    this.pos = new Vector2D(pos.x, pos.y);
    this.sprite = new Sprite({
      src: 'assets/img/Object1x1.png',
      frameSize: new Vector2D(16, 16),
      hFrame: 4,
      vFrame: 7,
      frame: frame,
    });
  }

  static random(qty, frameStart, frameEnd) {
    const randObj = [];
    for (let i = 0; i < qty; i++) {
      //
      randObj.push(
        new Bush({
          pos: new Vector2D(Random.int(150, 500), Random.int(150, 400)),
          frame: Random.int(frameStart, frameEnd),
        })
      );
    }
    return randObj;
  }
}

export class Bush {
  constructor({ pos, frame }) {
    this.pos = new Vector2D(pos.x, pos.y);
    this.sprite = new Sprite({
      src: 'assets/img/Object1x1.png',
      frameSize: new Vector2D(16, 16),
      hFrame: 4,
      vFrame: 7,
      frame: frame,
    });
  }

  static random(qty, frameStart = 20, frameEnd = 21) {
    const randBush = [];
    for (let i = 0; i < qty; i++) {
      //
      randBush.push(
        new Bush({
          pos: new Vector2D(Random.int(150, 500), Random.int(150, 400)),
          frame: Random.int(frameStart, frameEnd),
        })
      );
    }
    return randBush;
  }
}
