import Board from "./board.js";

const canvas = document.getElementById("canvas");
const board = new Board(canvas, 10, 10, "rgb(100, 100, 100)", "rgb(150, 150, 150)");
board.draw();

