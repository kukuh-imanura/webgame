// SETTINGS
export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');

export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

canvas.width = screenWidth / 4;
canvas.height = screenHeight / 4;

export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;
