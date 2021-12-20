import Board from "./board.js";

const rows = document.getElementById("rows");
const cols = document.getElementById("columns");
const bombs = document.getElementById("bombs");
const reset = document.getElementById("reset");

const canvas = document.getElementById("canvas");

let board = new Board(canvas,  parseInt(rows.value),  parseInt(cols.value),  parseInt(bombs.value), "rgb(130, 130, 130)", "rgb(150, 150, 150)");
board.draw();

rows.addEventListener("change", () => {
    handleChange();
});
cols.addEventListener("change", () => {
    handleChange();
});
bombs.addEventListener("change", () => {
    handleChange();
});
reset.addEventListener("mousedown", () => {
    handleChange();
});

function generateBoard(rows, columns, numBombs) {
    board = new Board(canvas, rows, columns, numBombs, "rgb(130, 130, 130)", "rgb(150, 150, 150)");
    board.draw();
}

function handleChange() {
    board.win();
    canvas.width = 700;
    canvas.height = 700;
    generateBoard(parseInt(rows.value), parseInt(cols.value), parseInt(bombs.value));
}