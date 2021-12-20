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

        // let c2 = document.getElementById("c2");
        // let c2ctx = c2.getContext("2d");

        // let image = new Image();
        // image.onload = function() {
            // console.log("load");
            let width = this.sidelength / 1.3;
            x = x + ((this.sidelength - width) / 2);
            y = y + ((this.sidelength - width) / 2);
            ctx.drawImage(image, x, y, width, width);
            // console.log("done");
        // };
        // image.src = "/src/images/mine.png";
    }
}