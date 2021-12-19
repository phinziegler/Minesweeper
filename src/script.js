import Board from "./board.js";


const canvas = document.getElementById("canvas");
const numBombs = 40;
const board = new Board(canvas, 9, 9, numBombs, "rgb(130, 130, 130)", "rgb(150, 150, 150)");
board.draw();
// board.createBombs(40);

