import BombTile from "./Tiles/bombTile.js";
import ClearTile from "./Tiles/clearTile.js";

export default class Board {
    constructor(canvas, rows, columns, darkCol = "blue", lightCol = "red") {
        this.tiles = [];
        this.canvas = canvas;
        this.darkCol = darkCol;
        this.lightCol = lightCol;
        this.tileSize = this.calculateSize(canvas.width, canvas.height, rows, columns);
        this.rows = rows;
        this.columns = columns;
        this.createBoard(canvas, rows, columns);
        // Listen for mousedown events on the canvas.
        this.canvas.addEventListener("mousedown", (e) => {
            this.getTile(this.mouseLocation(e)).handleClick();
        });
    }

    // INITIALIZE THE BOARD
    createBoard(canvas, rows, cols) {
        const size = this.tileSize;
        let id = 0;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let color = this.changeColor(i, j);
                this.tiles.push(new ClearTile(canvas, this, id, size * j, size * i, size, color));
                id++;
            }
        }
    }

    getRow(index) {
        let row = Math.floor(index / this.columns);
        // console.log("index = " + index + ", row = " + row);
        return row;
    }
    getCol(index) {
        let col = Math.floor(index % this.columns);
        // console.log("index = " + index + ", col = " + col);
        return col;
    }

    // CALCULATE CORRECT TILE SIZE, AND REFIT CANVAS
    calculateSize(width, height, rows, columns) {
        const colSize = (width / columns);
        const rowSize = (height / rows);
        const min = Math.floor(Math.min(rowSize, colSize));

        this.canvas.height = min * rows;
        this.canvas.width = min * columns;

        // console.log(this.canvas.width + ", " + this.canvas.height);

        return min;
    }

    // SELECT THE CORRECT COLOR
    changeColor(i, j) {
        if ((i + j) % 2 == 0) {
            return this.lightCol;
        }
        return this.darkCol;
    }

    // DRAW THE TILES ON CANVAS
    draw() {
        this.clearCanvas();
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw();
        }
    }

    // CLEAR THE CANVAS
    clearCanvas() {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // GET TILE FROM (X,Y) POSITION
    getTile(pos) {
        const x = pos.x;
        const y = pos.y;

        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        const index = ((col) + (row * this.columns));
        // console.log(this.tiles[index].id);

        return this.tiles[index];
    }
    getTileCoord(col, row) {
        if(col < 0 || col >= this.columns || row < 0 || row >= this.rows) {
            return null;
        }
        const index = ((col) + (row * this.columns));
        if (this.tiles[index] != null) {
            return this.tiles[index];
        }
        return null;
    }

    mouseLocation(e) {
        let rect = this.canvas.getBoundingClientRect();  // abs. size of element
        let scaleX = this.canvas.width / rect.width;         // relationship bitmap vs. element for X
        let scaleY = this.canvas.height / rect.height;       // relationship bitmap vs. element for Y

        let x = Math.floor((e.clientX - rect.left) * scaleX) + 1;
        let y = Math.floor((e.clientY - rect.top) * scaleY) + 1;
        return {
            x: x, 
            y: y
        };
    }

    createBombs(numBombs) {
        if(numBombs > this.tiles.length) {
            numBombs = this.tiles.length;
        }
        for(let i = 0; i < numBombs; i++) {
            let randIndex = Math.floor(Math.random() * this.tiles.length);
            while(this.tiles[randIndex].getName() == "BombTile") {   // REPEAT until the tile is not already a bomb
                randIndex = Math.floor(Math.random() * this.tiles.length);
            }
            const save = this.tiles[randIndex];
            this.tiles[randIndex] = new BombTile(this.canvas, this, save.getID(), save.getX(), save.getY(), save.getSidelength(), save.getColor());
        }        
    }

    getSurroundingTiles(index) {
        const col = this.getCol(index);
        const row = this.getRow(index);

        let checks = [
            this.getTileCoord(col - 1, row - 1),
            this.getTileCoord(col + 0, row - 1),
            this.getTileCoord(col + 1, row - 1),

            this.getTileCoord(col - 1, row + 0),
            this.getTileCoord(col + 1, row + 0),
            
            this.getTileCoord(col - 1, row + 1),
            this.getTileCoord(col + 0, row + 1),
            this.getTileCoord(col + 1, row + 1),
        ]
        
        let output = [];
        for(let i = 0; i < checks.length; i++) {
            if(checks[i] != null) {
                output.push(checks[i]);
            }
        }

        // console.log(index + " has " + output.length + " surrounding tiles:");
        // for(let i = 0; i < output.length; i++) {
        //     console.log(output[i].getID());
        // }

        return output;
    }
}