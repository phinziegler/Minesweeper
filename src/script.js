import Board from "./board.js";


const numBombs = 40;
const canvas = document.getElementById("canvas");
const board = new Board(canvas, 9, 9, numBombs, "rgb(130, 130, 130)", "rgb(150, 150, 150)");
board.draw();
// board.createBombs(40);

