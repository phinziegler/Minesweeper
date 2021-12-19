export default class Tile {
    constructor(canvas, board, id, x, y, sidelength, color) {
        this.ctx = canvas.getContext("2d");
        this.board = board;
        this.id = id;
        this.position = {   // top left corner
            x: x,
            y: y,
        }
        this.color = color;
        this.sidelength = sidelength;
        this.width = sidelength;
        this.height = sidelength;
        this.isSolved = false;
        this.name = "Tile";
    }

    getID() {
        return this.id;
    }
    getPosition() {
        return this.position;
    }
    getX() {
        return this.position.x;
    }
    getY() {
        return this.position.y;
    }
    getSidelength() {
        return this.sidelength;
    }
    getColor() {
        return this.color;
    }
    getName() {
        return this.name;
    }

    solve() {
        this.isSolved = true;
    }

    draw() {
        const x = this.position.x;
        const y = this.position.y;
        let ctx = this.ctx;

        if (this.isSolved) {
            this.drawFill(ctx, x, y, this.color);
            this.drawData(ctx, x, y, this.color);
        }
        else {
            const indentDepth = .25;
            this.drawFill(ctx, x, y, "rgb(150,150,150)");
            this.drawIndentLight(ctx, x, y, 2 / (indentDepth), "rgba(255, 255, 255, 0.7)");
            this.drawIndentDark(ctx, x, y, 2 / (indentDepth), "rgba(0, 0, 0, 0.33)");
        }
    }

    drawData(ctx,x,y,color) {
        console.error("unimplemented command");
    }
    drawFill(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.sidelength, this.sidelength);
    }
    drawIndentLight(ctx, x, y, fac, color) {
        const len = this.sidelength;
        const maxX = x + len;
        const maxY = y + len;
        const val = Math.floor(len / fac);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(maxX, y);
        ctx.lineTo(maxX - val, y + val);
        ctx.lineTo(x + val, y + val);
        ctx.lineTo(x + val, maxY - val);
        ctx.lineTo(x, maxY);
        ctx.closePath();
        ctx.fill();
    }
    drawIndentDark(ctx, x, y, fac, color) {
        const len = this.sidelength;
        const maxX = x + len;
        const maxY = y + len;
        const val = Math.floor(len / fac);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(maxX, maxY);
        ctx.lineTo(x, maxY);
        ctx.lineTo(x + val, maxY - val);
        ctx.lineTo(maxX - val, maxY - val);
        ctx.lineTo(maxX - val, y + val);
        ctx.lineTo(maxX, y);
        ctx.closePath();
        ctx.fill();
    }

    handleClick() {
        throw new Error("handleClick() cannot be called on abstract class \"Tile\"");
    }

}