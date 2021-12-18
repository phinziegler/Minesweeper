import Tile from "./Tiles/tile.js";

class Board {
    constructor(canvas, rows, columns) {
        this.tiles = [];
        this.createBoard(canvas, rows, columns);
    }
    createBoard(canvas, rows, cols) {
        let color = "red";      // start color
        const size = calculateSize(canvas.width, canvas.height, rows, cols);

        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                color = colorToggle(color);
                this.tiles.push(new Tile(canvas, size * j, size * i, size, color));
            }        
        }
    }

    calculateSize(width, height, rows, columns) {
        let rowSize = (width / rows);
        let colSize = (height / columns);
    
        return Math.min(rowSize, colSize);
    }

    colorToggle(color) {
        if(color == "blue") {
            return "red";
        }
        return "blue";
    }

    draw() {
        this.tiles.foreach(tile => (tile.draw()));
    }
}