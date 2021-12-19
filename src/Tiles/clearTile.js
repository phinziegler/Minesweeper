import BombTile from "./bombTile.js";
import Tile from "./tile.js";

export default class ClearTile extends Tile {
    constructor(canvas, board, id, x, y, sidelength, color) {
        super(canvas, board, id, x, y, sidelength, color);
        this.nearbyBombs = 0;
        this.name = "ClearTile";
    }

    calculateNearbyBombs() {
        let sur = this.board.getSurroundingTiles(this.id);
        let bombs = 0;
        for(let i = 0; i < sur.length; i++) {
            if(sur[i].getName() == "BombTile") {
                bombs++;
            }
        }
        this.nearbyBombs = bombs;
        console.log(bombs + " nearby bombs");
    }
    handleClick() {
        console.log(this.id + " safe:");
        this.calculateNearbyBombs();
    }
}