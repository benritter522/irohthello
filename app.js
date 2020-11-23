// console.log(spaceDiv.classList.item(1)); 
// ^^^^THIS PROPERTY WOULD BE USEFUL IF I KNEW WHICH CLASS IS WHERE 
// IN THE CLASSLIST. USE LATER FOR SOMETHING ELSE BUT NEVER FORGET

// still need modal

// set up players 1 and 2
let player1 = true; // black plays first in othello
                    // less experienced player should choose black

let player1CanMove = true; // maybe put these lines inside of
let player2CanMove = true; // my start game setup method?

// global variable to determine if placing a piece is valid in only very niche sandwhicable cases
let canPlace = false;

// set up global counters to tweak every time as piece is placed or flipped 
let blackCount = 0;
let whiteCount = 0;


// ==============================================================================================================
// START Declare neighbor direction arrays. Left-right, top-bottom.

const x_neighborDirections = [0,
    -1,     // neigbor 1
    -1,     // neigbor 2
    -1,     // neigbor 3
    0,      // neigbor 4
    0,      // neigbor 5 = SELF
    0,      // neigbor 6
    1,      // neigbor 7
    1,      // neigbor 8
    1,      // neigbor 9
];

const y_neighborDirections = [0,
    -1,     // neigbor 1
    0,      // neigbor 2
    1,      // neigbor 3
    -1,     // neigbor 4
    0,      // neigbor 5 = SELF
    1,      // neigbor 6
    -1,     // neigbor 7
    0,      // neigbor 8
    1,      // neigbor 9
];

// END Declare neighbor direction arrays
// ==============================================================================================================



// ==============================================================================================================
// ==============================================================================================================
// START Board Class

class Board {
    constructor() {
        // this.array2D = [];
    }
    createGrid() {      
        // intial board setup as a 2D array of divs
        for(let x = 0; x < 10; x ++) {
            for(let y = 0; y < 10; y ++) {
                const piece = new Piece(x, y);
                piece.makePiece();
            }
        }
    }
    setUpStart() {      
        // set up the 4 starting pieces
        const starterWhitePieces = [
            document.getElementById('R4C4'),
            document.getElementById('R5C5')
        ];
        const starterBlackPieces = [
            document.getElementById('R4C5'),
            document.getElementById('R5C4')
        ];
        starterBlackPieces.forEach(element => {
            element.classList.add('black');
            blackCount ++;
        });
        starterWhitePieces.forEach(element => {
            element.classList.add('white');
            whiteCount ++;
        });
        updatePieceCounters();            
    }
    setUpLateGameForDebugging() {
        for(let x = 2; x < 9; x++) {
            for(let y = 1; y < 9; y++) {
                const piece = document.getElementById(`R${x}C${y}`);
                if(x === 2 && y === 2) {
                    piece.classList.add('white');
                } else if(x === 2) {
                    piece.classList.add('black');
                    blackCount ++;
                } else {
                    piece.classList.add('white');
                    whiteCount ++;
                }
                
                if(y === 1) {
                    piece.classList.remove('black');
                }

            }
        }
        updatePieceCounters();            
    }
}
// END Board Class
// ==============================================================================================================
// ==============================================================================================================





// ==============================================================================================================
// ==============================================================================================================
// START Piece Class

class Piece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    makePiece() { 
        const space = document.createElement('div');
        const piece = document.createElement('div');
        const grid = document.querySelector('.grid');
        
        space.classList.add('spaces');
        piece.classList.add('pieces');
        // pieceDiv.classList.add('empty');
        
        // weeds out the edge layer of the board
        if(this.x === 0 || this.y === 0 || this.x === 9 || this.y === 9) {
            space.classList.add('edgeSpaces');
            if(!(this.x === 0 && this.y === 0)) {
                if(this.x === 0 && this.y !== 9) {
                    space.innerText = this.y;
                } else if (this.y === 0 && this.x !== 9) {
                    space.innerText = this.x;
                } 
            } 
        } else {
            // if piece is not an edge space, adds a piece with an event listener
            space.classList.add('gameSpaces'); 
            space.appendChild(piece);
            piece.addEventListener("click", this.placePiece);
        }

        // the id's are columns in the grid
        space.id = `R${this.x}C${this.y}Space`;
        piece.id = `R${this.x}C${this.y}`;
        
        grid.appendChild(space);
    }
    
    placePiece() { 
        
        if(!isPiece(document.getElementById(this.id))) {
            if(player1) {
                this.classList.add('black'); 
            } else { 
                this.classList.add('white'); // if invalid space, must do this.classList.remove('white') later
            }

            // grab center element's x and y indicies. right-left, top-bottom. 5 is center, AKA the piece being placed
            const x_center = grabSecondCharAsNumber(this.id);
            const y_center = grabFourthCharAsNumber(this.id);
            
            // for each neighbor
            for(let i = 1; i <= 9; i++) {
                if(i !== 5) {
                    const arr = [];
                    checkDirectionMove(i, x_center + x_neighborDirections[i], y_center + y_neighborDirections[i], arr);
                }
            }
            
            //If the piece being placed is a proper sandwich, canPlace is made true in checkDirection
            if(canPlace) {
                document.querySelector('.whatsPlayed').innerText = `${this.id} was played.`;
                console.log(`can place a piece here at ${this.id}`);
                
                if(player1) {
                    player1 = false;
                    blackCount ++;
                    document.querySelector('.whosTurn').innerText = 'It\'s player 2\'s turn. \nPlay a white piece.';
                } 
                else { 
                    player1 = true;
                    whiteCount ++;
                    document.querySelector('.whosTurn').innerText = 'It\'s player 1\'s turn. \nPlay a black piece.';
                }
                canPlace = false;
            } else {
                // invalidMoveAlert();
                this.classList.remove('black');
                this.classList.remove('white');
            }

            updatePieceCounters();    
            checkEndCondition();  

            if(player1 && !player1CanMove) {
                player1 = false;
                document.querySelector('.whosTurn').innerText = 'It\'s player 2\'s turn. \nPlay a white piece.';
            } else if(!player1 && !player2CanMove) {
                player1 = true;
                document.querySelector('.whosTurn').innerText = 'It\'s player 1\'s turn. \nPlay a black piece.';
            }     
        }
    }
}
// END Piece Class
// ==============================================================================================================
// ==============================================================================================================




// ==============================================================================================================
// ==============================================================================================================
// Supporting Functions outside of classes
// ==============================================================================================================
// ==============================================================================================================



// ==============================================================================================================
// Checks a direction of a neighbor recursively in that direction until end conditions

const checkDirectionMove = (indexDir, xDir, yDir, arr) =>{
    const neighbor = document.getElementById(`R${xDir}C${yDir}`);

    if(isPiece(neighbor)) {
        if(player1 && neighbor.classList.contains('white')) {   
            arr.push(neighbor.id);
            checkDirectionMove(indexDir, xDir + x_neighborDirections[indexDir], yDir + y_neighborDirections[indexDir], arr);
        } else if (!player1 && neighbor.classList.contains('black')) {
            arr.push(neighbor.id);
            checkDirectionMove(indexDir, xDir + x_neighborDirections[indexDir], yDir + y_neighborDirections[indexDir], arr);
        } else if (arr.length > 0 && ((player1 && neighbor.classList.contains('black')) || (!player1 && neighbor.classList.contains('white')))) {
            document.querySelector('.whatFlipped').innerText = `${arr} were flipped.`;
            flipSandwhichMeats(arr);
            canPlace = true;
            return arr;
        }
    } 
}

// End checking direction
// ==============================================================================================================




// ==============================================================================================================
// Flip pieces when a sandwich happens AKA a piece is placed

const flipSandwhichMeats = (arr) => {
    arr.forEach(element => {
        document.getElementById(element).classList.toggle('black');
        document.getElementById(element).classList.toggle('white');
        if(player1) {
            blackCount ++;
            whiteCount --;
        } else { 
            whiteCount ++;
            blackCount --;
        }
    });
}

// End flipping pieces
// ==============================================================================================================

const isPiece = (location) => {
    if(location && (location.classList.contains('black') || location.classList.contains('white'))) {      // if not null 
        return true;
    }
}
const updatePieceCounters = () => {
    document.getElementById('blackCount').innerText = `Player 1 has ${blackCount} black pieces.`;
    document.getElementById('whiteCount').innerText = `Player 2 has ${whiteCount} white pieces.`;
}
const grabSecondCharAsNumber = (str) => {
    return Number(str[1]);
}
const grabFourthCharAsNumber = (str) => {
    return Number(str[3]);
}
const invalidMoveAlert = () => {
    alert('Please select a valid move.');
}

// ==============================================================================================================
// ==============================================================================================================
// END CONDITION FUNCTIONS

const checkEndCondition = () => {
    player1CanMove = false;
    player2CanMove = false;
    console.log(`player 1 can move: ${player1CanMove}`);
    console.log(`player 2 can move: ${player2CanMove}`);

    // need to loop through whole 2D array, elements 1 to 8 at least for just game pieces 
    for(let x = 1; x <= 8; x++) {
        for(let y = 1; y <= 8; y ++) {
            piece = document.getElementById(`R${x}C${y}`);

            if(!isPiece(piece)) {
                piece.classList.add('black');
                // console.log(`checking end conditions for player1 on ${piece.id}`);
                for(let i = 1; i <= 9; i++) {
                    if(i !== 5) {
                        // console.log('neighbor ' + i);
                        const arr = [];
                        checkDirectionForEnd(i, x + x_neighborDirections[i], y + y_neighborDirections[i], arr, piece.id);
                    }
                }
                piece.classList.remove('black');

                piece.classList.add('white');
                // console.log(`checking end conditions for player2 on ${piece.id}`);
                for(let i = 1; i <= 9; i++) {
                    if(i !== 5) {
                        // console.log('neighbor ' + i);
                        const arr = [];
                        checkDirectionForEnd(i, x + x_neighborDirections[i], y + y_neighborDirections[i], arr, piece.id);
                    }
                }
                piece.classList.remove('white');
            }
        }
    }
    console.log(`player1 can move: ${player1CanMove}`);
    console.log(`player2 can move: ${player2CanMove}`)

    if((!player1CanMove && !player2CanMove) || (blackCount + whiteCount === 64)) {
        console.log('game is over inside checkEndCondition');       
        gameOver();
    }
}

const checkDirectionForEnd = (indexDir, xDir, yDir, arr, pieceID) =>{
    // console.log('checking direction for end');
    const neighbor = document.getElementById(`R${xDir}C${yDir}`);
    const piece = document.getElementById(pieceID);

    if(isPiece(neighbor)) { // the player1 and player2 stuff are the problem here. this search needs to be more general
        if(piece.classList.contains('black') && neighbor.classList.contains('white')) {   
            arr.push(neighbor.id);
            checkDirectionForEnd(indexDir, xDir + x_neighborDirections[indexDir], yDir + y_neighborDirections[indexDir], arr, pieceID);
        } else if (piece.classList.contains('white') && neighbor.classList.contains('black')) {
            arr.push(neighbor.id);
            checkDirectionForEnd(indexDir, xDir + x_neighborDirections[indexDir], yDir + y_neighborDirections[indexDir], arr, pieceID);
        } 
        if (arr.length > 0 && piece.classList.contains('black') && neighbor.classList.contains('black')) { //don't care if it's player1 or not, care about class of piece being placed
            player1CanMove = true;
            console.log(`player 1 can move, neighbor is ${neighbor.id}: ${player1CanMove}`)
            return arr;
        }
        if (arr.length > 0 && piece.classList.contains('white') && neighbor.classList.contains('white')) {
            player2CanMove = true;
            console.log(`player 2 can move, neighbor is ${neighbor.id}: ${player2CanMove}`)
            return arr;
        } 
    }
}

const gameOver = () => {
    openEndModal();
}

// End End condition
// ==============================================================================================================



// ==============================================================================================================
// ==============================================================================================================
// Set up the game, finally
// ==============================================================================================================
// ==============================================================================================================


// =========================
// GAME SETUP DOM NODES
// =========================

const speakButton = document.querySelector(".speakButton");
const beginModal = document.querySelector(".beginModal");
const sitButton = document.querySelector(".sitButton");
const endModal = document.querySelector(".endModal");
const restartButton = document.querySelector(".restartButton");
const endScores = document.querySelector(".endScores");




const openBeginModal = () => {
    beginModal.classList.toggle("open"); 
    speakButton.classList.toggle("closed"); 
}
// toggleModal();
const closeBeginModal = () => {
    beginModal.classList.toggle("open"); 
}


const openEndModal = () => {
    endModal.classList.toggle("open");
    endModal.classList.remove("closed");

    if(blackCount > whiteCount) {
        endScores.innerText =   `Player 1 wins with ${blackCount} black pieces!
                                \n\n\n\n\n\nWould you like to play again?`;
                // alert(`Game over! Player 1 wins with ${blackCount} black pieces!`)
    } else if (whiteCount > blackCount) {
        endScores.innerText =   `Player 2 wins with ${whiteCount} white pieces!
                                \n\n\n\n\n\nWould you like to play again?`;
        // alert(`Game over! Player 2 wins with ${whiteCount} white pieces!`)
    } else {
        endScores.innerText =   `It's a tie! Each player has ${blackCount} pieces!
                                \n\n\n\n\n\nWould you like to play again?`;
        // alert(`Game over! It's a tie!`)
    }
}

speakButton.addEventListener("click", openBeginModal);
sitButton.addEventListener("click", closeBeginModal);
restartButton.addEventListener("click", () => {
    document.location.reload();
});



const board = new Board();
board.createGrid();
board.setUpStart();
// board.setUpLateGameForDebugging();

