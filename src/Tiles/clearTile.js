import Tile from "./tile.js";

export default class ClearTile extends Tile {
    constructor(canvas, id, x, y, sidelength, color) {
        super(canvas, id, x, y, sidelength, color);
        this.name = "ClearTile";
    }
    handleClick() {
        console.log("safe!");
    }
}