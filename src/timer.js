export default class Timer {
    constructor(board) {
        this.board = board;
        this.time = 0.0;

    }
    start() {
        let i = 0;
        let out;
        const element = document.getElementById("timer");
        this.interval = setInterval(function () {
            i += 0.01;
            out = i.toFixed(2);
            element.innerText = out + "s";
            // i = parseFloat(out);
        }, 10);
    }
    stop() {
        clearInterval(this.interval);
    }
}