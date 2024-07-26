// SETTINGS
export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');

export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

canvas.width = screenWidth / 4;
canvas.height = screenHeight / 4;

export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;

export const canvasRect = {
  top: 0,
  left: 0,
  bottom: canvasHeight,
  right: canvasWidth,
};

const cameraMargin = 32;
export const cameraRect = {
  top: canvasRect.top + cameraMargin,
  bottom: canvasRect.bottom - cameraMargin,
  left: canvasRect.left + cameraMargin,
  right: canvasRect.right - cameraMargin,
};
