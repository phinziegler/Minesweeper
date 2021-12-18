class Tile {
    constructor(context, id, x, y, sidelength, color) {
        this.ctx = context;
        this.id = id;
        this.position = {   // top left corner
            x: x,
            y: y,
        }
        this.color = color;
        this.width = sidelength;
        this.height = sidelength;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height); // x y width height
    }
    handleClick() {
        throw new Error("handleClick() cannot be called on abstract class \"Tile\"");
    }

}