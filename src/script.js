import Board from "./board.js";


const canvas = document.getElementById("canvas");
const numBombs = 0;
const board = new Board(canvas, 3, 3, numBombs, "rgb(130, 130, 130)", "rgb(150, 150, 150)");
board.draw();

