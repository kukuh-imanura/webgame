import Vector2D from '../Helper/Vector2D.js';
import Sprite from '../Sprite.js';

export default class Map {
  constructor() {
    this.sprite = new Sprite({
      src: '../assets/img/map.png',
    });
    this.pos = new Vector2D(-100, -100);
  }
}
