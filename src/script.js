import Board from "./board.js";

const canvas = document.getElementById("canvas");
const board = new Board(canvas, 16, 16, "rgb(150, 150, 150)", "rgb(150, 150, 150)");
board.draw();
board.createBombs(99);

