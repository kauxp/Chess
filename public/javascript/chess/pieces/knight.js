var Knight = function(config){
    this.type = 'knight';
    this.constructor(config);
};



Knight.prototype = new Piece({});
Knight.prototype.isValidMove = function(newPosition) {
    let currCol = this.position.charCodeAt(0);
    let currRow = parseInt(this.position.charAt(1));
    let newCol = newPosition.col.charCodeAt(0);
    let newRow = parseInt(newPosition.row);
    
    // Calculate the differences
    let colDiff = Math.abs(newCol - currCol);
    let rowDiff = Math.abs(newRow - currRow);
    
    // Knight moves in an L-shape: 2 squares in one direction and 1 in the other
    return (colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2);
};

Knight.prototype.isPathClear = function(newPosition) {
    // Knights can jump over other pieces, so the path is always clear
    return true;
};

Knight.prototype.moveTo = function(newPosition) {
    if (this.isValidMove(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
    } else {
        console.warn("Invalid move for knight");
    }
};