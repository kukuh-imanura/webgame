export default class Collition {
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
