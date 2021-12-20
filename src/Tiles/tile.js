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
        this.hasFlag = false;
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
        throw new Error("solve() unimplemented");
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
            this.drawFlag(ctx, x, y, 2/indentDepth, "orange");
        }
    }

    drawData(ctx, x, y, color) {
        console.error("drawData() unimplemented");
    }
    drawFlag(ctx, x, y, fac, color) {
        const len = this.sidelength;
        const maxX = x + len;
        const maxY = y + len;
        const val = Math.floor(len / fac);

        if(this.hasFlag) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.moveTo(((maxX + x) / 2) - (val * 1.5) + (len * 0.03), y + (3 * val) - (len * 0.1));
            ctx.lineTo(((maxX + x) / 2) + (val * 1.5) + (len * 0.03), (maxY + y) / 2 - (len * 0.1));
            ctx.lineTo(((maxX + x) / 2) - (val * 1.5)+ (len * 0.03), maxY - (3 * val) - (len * 0.1));
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.fillRect(((maxX + x) / 2) - (val * 1.5) + (len * 0.03),y + (2 * val), len * 0.05, len - (4 * val));
        }
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
    handleFlag() {
        if(this.isSolved) {
            return;
        }
        if(this.hasFlag) {
            this.board.changeFlagCount(1);
            this.hasFlag = false;
            this.draw();
            console.log("FlagCount: " + this.board.getFlagCount());
            return;
        }
        if(this.board.getFlagCount() > 0) {
            this.board.changeFlagCount(-1);
            this.hasFlag = true;
            this.draw();
            console.log("FlagCount: " + this.board.getFlagCount());
        }
    }

}