console.log('yes connected');
console.log('maybe connected');

// modal

// set up players 1 and 2
// player 1 readout
// player 2 readout


class Board {
    constructor() {
        
    }
    createGrid() {

        // intial board setup
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid');
        
        // create 10x10 2D array
        // const gridArray = [];
        for(let x = 0; x < 10; x ++) {
            for(let y = 0; y < 10; y ++) {
                const piece = new Piece(/*0, */ x, y);
                piece.makePieceDiv(piece.x, piece.y);
            }
        }
        // console.log(gridArray);
        // outer row/column of the arrays = null
        // 8x8 'active' spaces
        
        
        
    }
    setUpStart() {
        // set up the 4 starting pieces

    }
}



// Going to make a js class for player pieces
class Piece {
    constructor(/*value, */x, y) {
        // this.value = value;
        this.x = x;
        this.y = y;
    }
    makePieceDiv(x, y) {
        const spaceDiv = document.createElement('div');
        const ghostPiece = document.createElement('div');
        const gridDiv = document.querySelector('.grid');
        
        spaceDiv.classList.add('spaces');
        ghostPiece.classList.add('pieces');
        ghostPiece.classList.add('empty');
        
        if(x === 0 || y === 0 || x === 9 || y === 9) {
            spaceDiv.classList.add('edgeSpaces'); 
        } else {
            spaceDiv.classList.add('gameSpaces'); 
            spaceDiv.appendChild(ghostPiece);
        }
        
        // the classes are rows 
        spaceDiv.classList.add(`${x}-Row`);
        ghostPiece.classList.add(`${x}-Row`);
        
        //making class names that aren't purely numerical for debugging's sake
        // spaceDiv.classList.add(`${y}`);
        // ghostPiece.classList.add(`${y}`);
        
        // // the id's are columns in the grid
        spaceDiv.id = `${y}-Column`;
        ghostPiece.id = `${y}-Column`;
        
        // gridArray[x[y]] = spaceDiv;
        
        gridDiv.appendChild(spaceDiv);
        // console.log(x + ", " + y);
        
        console.log(spaceDiv.classList.item(1)); // THIS IS IMPORTANT

    }
    isValidSpace(){}

    becomeBlack() {}
        // toggle black class
        // toggle white class
    becomeWhite() {}
        // toggle black class
        // toggle white class
}
const board = new Board();
board.createGrid();
board.setUpStart();

const firstCharAsNumber = (str) => {
    return Number(str[0]);
}
// console.log(firstCharAsNumber("5row")+5);

// player tries to make a move
    // isValidMove()

        // checkSpaceIsAvailable()
            // Seeing if space is empty--has a value of 0. value of 1 means white, value of 2 means black, value of null means out of bounds

        // checkNeighbors()
            // checkSingleNeighbor() // --in given direction as parameter? --maybe temporarily assign ids to help with logistics if it gets messy // WHILE neighbor.value !== null ?? maybe??
                // if neighbor.value = 0 // || neighbor.value = null // -- could I just do if neighbor.value == 0 bc that's 'falsey' and so is null?
                    // return false for this neighbor
                // else if neighbor.value = this.value //if both black or both white
                    // return false for this neighbor
                // else
                    //  call checkSingleNeighbor() from this neighbor -- RECURSIONNNN

                    /*  going to need to make conditions for the end boundary 
                        that's the same value as the placed piece. 
                        Keep track of 'last piece checked in line' or something */

                    /*  if just one of the directions is valid for the move,
                        the move is valid. can return when that is true and exit the function*/

    // if move is valid
        // flip pieces() // check all possible directions, don't stop after one direction is valid. Can sandwich in multiple directions with one move.

            

// end condition
    // loop through all elements of both arrays AFTER EVERY PIECE IS PLACED
        // if checkSpaceIsAvailable() (if value is 0)
            // if any move is valid for placing a value 1 piece (white) OR if any move is valid for placing value 2 (black)
                // return false, gameOver is not true yet
            // else --so if there is no valid move for this space
                // continue through the loop....if you get through the whole look return true game is over...
                // maybe decided by the current element being checked being the last in the array? this loop
                // should never get to the end of the board if ANY move is possible bc it returns as soon
                // as it finds a valid move, so that should be airtight.....hopefully :)
            

// ==============================================================================================================
// ==============================================================================================================
// EARLY PURE PSEUDOCODE
// ==============================================================================================================
// ==============================================================================================================


// modal

// set up players 1 and 2
    // player 1 readout
    // player 2 readout


// Going to make a js class for player pieces

// intial board setup

    // create 10x10 2D array

        // outer row/column of the arrays = null
        // 8x8 'active' spaces

    // set up the 4 starting pieces

// player tries to make a move
    // isValidMove()

        // checkSpaceIsAvailable()
            // Seeing if space is empty--has a value of 0. value of 1 means white, value of 2 means black, value of null means out of bounds

        // checkNeighbors()
            // checkSingleNeighbor() // --in given direction as parameter? --maybe temporarily assign ids to help with logistics if it gets messy // WHILE neighbor.value !== null ?? maybe??
                // if neighbor.value = 0 // || neighbor.value = null // -- could I just do if neighbor.value == 0 bc that's 'falsey' and so is null?
                    // return false for this neighbor
                // else if neighbor.value = this.value //if both black or both white
                    // return false for this neighbor
                // else
                    //  call checkSingleNeighbor() from this neighbor -- RECURSIONNNN

                    /*  going to need to make conditions for the end boundary 
                        that's the same value as the placed piece. 
                        Keep track of 'last piece checked in line' or something */

                    /*  if just one of the directions is valid for the move,
                        the move is valid. can return when that is true and exit the function*/

    // if move is valid
        // flip pieces() // check all possible directions, don't stop after one direction is valid. Can sandwich in multiple directions with one move.

            

// end condition
    // loop through all elements of both arrays AFTER EVERY PIECE IS PLACED
        // if checkSpaceIsAvailable() (if value is 0)
            // if any move is valid for placing a value 1 piece (white) OR if any move is valid for placing value 2 (black)
                // return false, gameOver is not true yet
            // else --so if there is no valid move for this space
                // continue through the loop....if you get through the whole look return true game is over...
                // maybe decided by the current element being checked being the last in the array? this loop
                // should never get to the end of the board if ANY move is possible bc it returns as soon
                // as it finds a valid move, so that should be airtight.....hopefully :)
            