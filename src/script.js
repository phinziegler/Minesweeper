import Board from "./board.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

function createBoard(rows, columns) {
    const board = new Board();
    const tile = new Tile();
    const size = calculateSize(width, height, rows, columns);

    for(let i = 0; i < rows; i++) {

    }
}

function calculateSize(width, height, rows, columns) {
    let rowSize = (width / rows);
    let colSize = (height / columns);

    return Math.min(rowSize, colSize);
}