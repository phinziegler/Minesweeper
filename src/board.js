import Tile from "./Tiles/tile.js";

export default class Board {
    constructor(canvas, rows, columns, darkCol="blue", lightCol="red") {
        this.tiles = [];
        this.canvas = canvas;
        this.darkCol = darkCol;
        this.lightCol = lightCol;
        this.createBoard(canvas, rows, columns);
    }
    createBoard(canvas, rows, cols) {
        let color = this.darkCol;      // start color
        const size = this.calculateSize(canvas.width, canvas.height, rows, cols);
        let id = 0;

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                color = this.changeColor(i, j);
                this.tiles.push(new Tile(canvas, id, size * j, size * i, size, color));
                id++;
            }        
        }
    }

    calculateSize(width, height, rows, columns) {
        const colSize = (width / columns);
        const rowSize = (height / rows);
        const min = Math.floor(Math.min(rowSize, colSize));

        this.canvas.height = min * rows;
        this.canvas.width = min * columns;

        console.log(this.canvas.width + ", " + this.canvas.height);

        return min;
    }

    changeColor(i, j) {
        if((i + j) % 2 == 0) {
            return this.lightCol;
        }
        return this.darkCol;
    }

    clearCanvas() {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.clearCanvas();
        for(let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw();
        }
    }
}