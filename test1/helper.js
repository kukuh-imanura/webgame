export class Helper {
  constructor() {}

  static vector2D(x, y) {
    return {
      x: x,
      y: y,
    };
  }

  static load(src) {
    const img = new Image();
    img.src = src;

    // const image = {
    //   img: img,
    //   isLoaded: false,
    // };

    // img.onload = () => {
    //   image.isLoaded = true;
    // };

    return img;
  }
}
