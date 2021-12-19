import Tile from "./tile.js";

export default class BombTile extends Tile {
    constructor(canvas, board, id, x, y, sidelength, color) {
        super(canvas, board, id, x, y, sidelength, color);
        this.name = "BombTile";
    }
    handleClick() {
        console.log("BOOOOOOOOOOOOOOOOOOOM");
    }
}