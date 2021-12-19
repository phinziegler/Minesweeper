import BombTile from "./bombTile.js";
import Tile from "./tile.js";

export default class ClearTile extends Tile {
    constructor(canvas, board, id, x, y, sidelength, color) {
        super(canvas, board, id, x, y, sidelength, color);
        this.nearbyBombs = 0;
        this.name = "ClearTile";
    }

    getNearbyBombs() {
        return this.nearbyBombs;
    }

    drawData(ctx, x, y, color) {
        if(this.nearbyBombs > 0) {

            ctx.fillStyle = this.numberColor();


            let fontSize = Math.floor(this.sidelength)/1.2;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fontWeight = "bold";
            ctx.font = parseInt(fontSize) + "px Impact";

            let text = ctx.measureText(parseInt(this.nearbyBombs));
            let width = text.width;

            x = x + (width / 2) + ((this.sidelength - width)/2);
            y = y + (width / 1.7) + ((this.sidelength - width)/2);

            ctx.fillText(parseInt(this.nearbyBombs), x, y);
        }
    }

    numberColor() {
        switch(this.nearbyBombs) {
            case 1:
                return "#42a";
            case 2:
                return "#351";
            case 3:
                return "#a00";
            case 4: 
                return "#c73";
            case 5:
                return "#000";
        }
        return "black";
    }
    calculateNearbyBombs() {
        let surrounding = this.board.getSurroundingTiles(this.id);
        let bombs = 0;
        for(let i = 0; i < surrounding.length; i++) {
            if(surrounding[i].getName() == "BombTile") {
                bombs++;
            }
        }
        // console.log(bombs + " nearby bombs");
        this.nearbyBombs = bombs;
        this.solve();
        return bombs;
    }
    handleClick(firstClick) {
        if(firstClick) {
            let all = this.board.getSurroundingTiles(this.id);
            all.push(this);
            this.board.createBombs(all);
            this.board.setFirstClick(false);
        }
        let surrounding = this.board.getSurroundingTiles(this.id);
        let numBombs = this.calculateNearbyBombs();
        if(numBombs == 0) {
            console.log("did search");
            this.search(this, surrounding);
        }
        this.board.draw();

    }

    // Use push and shift to operate queue
    search(root, surrounding) {
        let visited = [root]; // contains the ID's for all visted tiles.
        let queue = [];

        for(let i = 0; i < surrounding.length; i++) {
            let s = surrounding[i];
            s.calculateNearbyBombs();
            if(s.getNearbyBombs() == 0) {
                queue.push(s);
            }
        }

        while(queue.length > 0) {
            let next = queue.shift();

            if(!visited.includes(next)) {
                let nextSur = this.board.getSurroundingTiles(next.getID());
                visited.push(next)
                
                for(let i = 0; i < nextSur.length; i++) {
                    let s = nextSur[i];
                    s.calculateNearbyBombs();
                    if(s.getNearbyBombs() == 0) {
                        queue.push(s);
                    }
                }
            }
            else {
                // console.log("repeat skipped");
            }
        }
    }
}