import Tile from "./tile.js";

export default class BombTile extends Tile {
    constructor(canvas, board, id, x, y, sidelength, color) {
        super(canvas, board, id, x, y, sidelength, color);
        this.name = "BombTile";
    }
    handleClick() {
        this.board.revealBombs();
    }
    solve() {
        this.isSolved = true;
    }
    drawData(ctx, x, y, color) {
        let image = document.getElementById("mine");
        this.drawFill(ctx, x, y, "rgba(220, 50, 50, 1)");
        let width = this.sidelength / 1.15;
        x = x + ((this.sidelength - width) / 2);
        y = y + ((this.sidelength - width) / 2);
        ctx.drawImage(image, x, y, width, width);
    }
}