import BombTile from "./Tiles/bombTile.js";
import ClearTile from "./Tiles/clearTile.js";
import Timer from "./timer.js";

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
        this.updateFlagCounter();
        this.createBoard(canvas, rows, columns);
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
        this.solvedList = [];
        this.timer = new Timer(this);
    }

    win() {
        this.timer.stop();
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.font = "70px Impact";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.fillText("You Win!", this.canvas.width/2, this.canvas.height/2.5);
        this.play = false;
    }

    addToSolvedList(tile) {
        if(!this.solvedList.includes(tile)) {
            this.solvedList.push(tile);
        }
        if(this.solvedList.length == this.tiles.length - this.bombList.length) {
            this.win();
        }
    }

    doFirstClick() {
        this.timer.start();
        this.firstClick = false;
    }

    changeFlagCount(change) {
        this.flagCount = this.flagCount + change;
        this.updateFlagCounter();
    }
    updateFlagCounter() {
        const element = document.getElementById("flagCount");
        element.innerText = "Flags: "+ this.flagCount;
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
        return row;
    }
    getCol(index) {
        let col = Math.floor(index % this.columns);
        return col;
    }

    // CALCULATE CORRECT TILE SIZE, AND REFIT CANVAS
    calculateSize(width, height, rows, columns) {
        const colSize = (width / columns);
        const rowSize = (height / rows);
        const min = Math.floor(Math.min(rowSize, colSize));

        this.canvas.height = min * rows;
        this.canvas.width = min * columns;

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
        // console.trace("draw");
        this.clearCanvas();
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw();
        }
        if(this.solvedList.length == this.tiles.length - this.bombList.length) {
            this.win();
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
        this.timer.stop();
        for(let i = 0; i < this.bombList.length; i++) {
            this.bombList[i].solve();
            this.bombList[i].draw();
        }
        this.play = false;
    }
}