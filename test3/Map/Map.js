import Sprite from '../Sprite.js';

export default class Map {
  constructor() {
    this.sprite = new Sprite({
      src: './assets/img/map.png',
    });
  }
}
