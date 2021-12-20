import Board from "./board.js";
import Timer from "./timer.js";


const canvas = document.getElementById("canvas");
const numBombs = 40;
const board = new Board(canvas, 16, 16, numBombs, "rgb(130, 130, 130)", "rgb(150, 150, 150)");
board.draw();