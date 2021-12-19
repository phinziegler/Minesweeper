import Board from "./board.js";

const canvas = document.getElementById("canvas");
const board = new Board(canvas, 20, 20, "rgb(150, 150, 150)", "rgb(150, 150, 150)");
board.draw();
board.createBombs(200);

