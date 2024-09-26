var Rook = function(config){
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidMove = function(newPosition){
    let currCol = this.position.charAt(0);
    let currRow = this.position.charAt(1);
    let newCol = newPosition.col;
    let newRow = newPosition.row;
    
    return currCol === newCol || currRow === newRow;
}

Rook.prototype.isPathClear = function(newPosition) {
    let currCol = this.position.charAt(0);
    let currRow = this.position.charAt(1);
    let targetCol = newPosition.col;
    let targetRow = newPosition.row;
    let board = this.Board;

    let colDiff = targetCol.charCodeAt(0) - currCol.charCodeAt(0);
    let rowDiff = targetRow - currRow;

    let colStep = Math.sign(colDiff);
    let rowStep = Math.sign(rowDiff);

    if (colDiff !== 0 && rowDiff !== 0) {
        return false;
    }

    let currentColCode = currCol.charCodeAt(0) + colStep;
    let currentRow = parseInt(currRow) + rowStep;

    while (currentColCode !== targetCol.charCodeAt(0) || currentRow !== parseInt(targetRow)) {
        let currentPosition = {
            col: String.fromCharCode(currentColCode),
            row: currentRow.toString()
        };

        if (board.getPieceAt(currentPosition)) {
            return false;
        }

        currentColCode += colStep;
        currentRow += rowStep;
    }

    return true;
};

Rook.prototype.moveTo = function(newPosition){
    if(this.isValidMove(newPosition) && this.isPathClear(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
    }
    else {
        console.warn("Invalid move for rook");
    }
}