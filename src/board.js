import BombTile from "./Tiles/bombTile.js";
import ClearTile from "./Tiles/clearTile.js";

export default class Board {
    constructor(canvas, rows, columns, numBombs, darkCol = "blue", lightCol = "red") {
        this.tiles = [];
        this.canvas = canvas;
        this.darkCol = darkCol;
        this.lightCol = lightCol;
        this.tileSize = this.calculateSize(canvas.width, canvas.height, rows, columns);
        this.rows = rows;
        this.columns = columns;
        this.play = true;
        this.flagCount = numBombs;
        this.createBoard(canvas, rows, columns);
        // Listen for mousedown events on the canvas.
        this.canvas.addEventListener("mousedown", (e) => {
            if(this.play) {

                switch (e.which) {
                    case 1:
                        this.getTile(this.mouseLocation(e)).handleClick(this.firstClick);
                        break;
                    case 3:
                        this.getTile(this.mouseLocation(e)).handleFlag();
                        break;
                    default:
                        break;
                }
            }
        });
        this.canvas.addEventListener("contextmenu", (e) => {
            if(this.play) {
                e.preventDefault();     // Prevent context menu opening
            }
        });
        this.firstClick = true;
        this.numBombs = numBombs;
        this.bombList = [];
    }

    setFirstClick(bool) {
        this.firstClick = bool;
    }

    changeFlagCount(change) {
        this.flagCount = this.flagCount + change;
    }
    getFlagCount() {
        return this.flagCount;
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

    createBombs(exceptions) {
        if(this.numBombs > this.tiles.length - exceptions.length) {
            this.numBombs = this.tiles.length - exceptions.length;
        }
        for(let i = 0; i < this.numBombs; i++) {
            let randIndex = Math.floor(Math.random() * this.tiles.length);
            while(this.tiles[randIndex].getName() == "BombTile" || exceptions.includes(this.tiles[randIndex])) {
                randIndex = Math.floor(Math.random() * this.tiles.length);
            }
            const save = this.tiles[randIndex];
            this.tiles[randIndex] = new BombTile(this.canvas, this, save.getID(), save.getX(), save.getY(), save.getSidelength(), save.getColor());
            this.bombList.push(this.tiles[randIndex]);
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
        return output;
    }

    revealBombs() {
        for(let i = 0; i < this.bombList.length; i++) {
            this.bombList[i].solve();
            this.bombList[i].draw();
        }
        this.play = false;
    }
}