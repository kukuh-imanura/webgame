class Resource {
  constructor() {
    this.toLoad = {
      map: './assets/img/map.png',
      player: './assets/img/char.png',
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];

      this.images[key] = {
        image: img,
        isLoaded: false,
      };

      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resource = new Resource();
