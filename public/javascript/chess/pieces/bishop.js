var Bishop = function(config){
    this.type = 'bishop';
    this.constructor(config);
};

Bishop.prototype = new Piece({});

// Check if the move is valid for a bishop (diagonal movement)
Bishop.prototype.isValidMove = function(newPosition){
    let currCol = this.position.charAt(0);
    let currRow = parseInt(this.position.charAt(1));
    let newCol = newPosition.col;
    let newRow = parseInt(newPosition.row);

    // Convert columns to numerical ASCII codes
    let currColCode = currCol.charCodeAt(0);
    let newColCode = newCol.charCodeAt(0);

    // Calculate the absolute differences
    let colDiff = Math.abs(newColCode - currColCode);
    let rowDiff = Math.abs(newRow - currRow);

    // For a diagonal move, the column and row differences must be equal
    return colDiff === rowDiff;
};

// Check if the path is clear for the bishop to move
Bishop.prototype.isPathClear = function(newPosition) {
    let currCol = this.position.charAt(0);
    let currRow = parseInt(this.position.charAt(1));
    let targetCol = newPosition.col;
    let targetRow = parseInt(newPosition.row);
    let board = this.Board;

    // Convert columns to ASCII codes
    let currColCode = currCol.charCodeAt(0);
    let targetColCode = targetCol.charCodeAt(0);

    // Calculate the differences
    let colDiff = targetColCode - currColCode;
    let rowDiff = targetRow - currRow;

    // Ensure the move is diagonal
    if (Math.abs(colDiff) !== Math.abs(rowDiff)) {
        return false;
    }

    // Determine the direction of movement
    let colStep = colDiff > 0 ? 1 : -1;
    let rowStep = rowDiff > 0 ? 1 : -1;

    // Start checking from the next square
    let currentColCode = currColCode + colStep;
    let currentRow = currRow + rowStep;

    // Check each square along the path
    while (currentColCode !== targetColCode) {
        let currentPosition = {
            col: String.fromCharCode(currentColCode),
            row: currentRow.toString()
        };

        // If there's a piece blocking the path, return false
        if (board.getPieceAt(currentPosition)) {
            return false;
        }

        currentColCode += colStep;
        currentRow += rowStep;
    }

    return true; // Path is clear
};

// Move the bishop, mayanks; code  to a new position if the move is valid and the path is clear
// mayank's code
Bishop.prototype.moveTo = function(newPosition){
    if(this.isValidMove(newPosition) && this.isPathClear(newPosition)){
        this.position = newPosition.col + newPosition.row;
        this.render();
    }
    else {
        console.warn("Invalid move for bishop");
    }
};
