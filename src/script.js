import Board from "./board.js";

const canvas = document.getElementById("canvas");
const board = new Board(canvas, 10, 20, "rgb(150, 150, 150)", "rgb(150, 150, 150)");
board.draw();
board.createBombs(1);

