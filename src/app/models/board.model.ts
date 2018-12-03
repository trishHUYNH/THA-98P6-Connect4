export class Board {
    filled: boolean;
    row: number;
    column: number;
    player: number;

    constructor(filled, row, column, player) {
        this.filled = filled;
        this.row = row;
        this.column = column;
        this.player = player;
    }
}