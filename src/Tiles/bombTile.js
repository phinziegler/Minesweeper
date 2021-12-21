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

        this.drawCircle(ctx, x, y, "rgba(255,255,255, .6)");

        let width = this.sidelength / 1.15;
        x = x + ((this.sidelength - width) / 2);
        y = y + ((this.sidelength - width) / 2);
        ctx.drawImage(image, x, y, width, width);
    }
    drawCircle(ctx, x, y, color) {
        ctx.beginPath();
        ctx.arc(x + (this.sidelength / 2.8), y + (this.sidelength / 2.5), this.sidelength / 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }
}