import Tile from "./tile.js";

export default class BombTile extends Tile {
    constructor(canvas, id, x, y, sidelength, color) {
        super(canvas, id, x, y, sidelength, color);
        this.name = "BombTile";
    }
    handleClick() {
        console.log("BOOOOOOOOOOOOOOOOOOOM");
    }
}