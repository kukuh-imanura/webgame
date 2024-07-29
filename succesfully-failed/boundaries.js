// IMPORT
import Vector2D from '../test3/Helper/Vector2D.js';

export default class Boundaries {
  constructor() {}

  async fetchData() {
    const res = await fetch('./test3/Map/map..tmj');
    const data = await res.json();
    const layer = data.layers.find((layer) => layer.name === 'collition');
    const boundaries = layer ? layer.data : null;
    return boundaries;
  }

  // MAPPING BOUNDARIES
  async mapping() {
    const boundaryMap = [];

    const boundaries = await this.fetchData();

    for (let row = 0; row < boundaries.length; row += 64) {
      boundaryMap.push(boundaries.slice(row, 70 + row));
    }

    return boundaryMap;
  }

  // ATUR KOORDINAT
  async getCoordinate() {
    const boundaryPos = [];

    const boundaryMap = await this.mapping();

    boundaryMap.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col === 330) {
          boundaryPos.push(new Vector2D(colIndex * 16, rowIndex * 16));
        }
      });
    });

    return boundaryPos;
  }
}
