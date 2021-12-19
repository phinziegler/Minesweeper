import Tile from "./tile";

export default class ClearTile extends Tile {
    constructor(canvas, id, x, y, sidelength, color) {
        this.super(canvas, id, x, y, sidelength, color);
        this.name = "ClearTile";
    }
    handleClick() {
        checkSurrounding();
    }
}