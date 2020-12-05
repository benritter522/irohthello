// console.log(spaceDiv.classList.item(1)); 
// ^^^^THIS PROPERTY WOULD BE USEFUL IF I KNEW WHICH CLASS IS WHERE 
// IN THE CLASSLIST. USE LATER FOR SOMETHING ELSE BUT NEVER FORGET

// set up players 1 and 2
let player1 = true; // black plays first in othello
                    // less experienced player should choose black

let player1CanMove = true; // maybe put these lines inside of
let player2CanMove = true; // my start game setup method?

// global variable to determine if placing a piece is valid in only very niche sandwhicable cases
// let canPlace = false; // going to change it to local variables for each location

// set up global counters to tweak every time as piece is placed or flipped 
let blackCount = 0;
let whiteCount = 0;

// ===========================================================================================================================================================
// ===========================================================================================================================================================
//                                          GAME START 
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//  Declare neighbor direction arrays. Left->right, top->bottom.
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

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

// ===========================================================================================================================================================
// ===========================================================================================================================================================
//                                          BOARD CLASS
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


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

// ===========================================================================================================================================================
// ===========================================================================================================================================================
//                                          PIECE CLASS
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

class Piece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.pieceDivLocal = ;
        // this.canPlace = false;
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
            const currentPiece = this;
            // THIS EVENT LISTENER IS THE KEY TO MY CODE AND MY GAME WORKING
            piece.addEventListener("click", 
                function () {
                    currentPiece.placePiece(this);
                }
            );
        }

        // the id's are columns in the grid
        space.id = `R${this.x}C${this.y}Space`;
        piece.id = `R${this.x}C${this.y}`;
        
        grid.appendChild(space);
    }
    placePiece(piece) { 
        console.log(this.x);
        console.log(this.y);
        console.log(piece);
        // console.log(currentPiece);
        console.log(this);

        if(!this.isPiece(document.getElementById(piece.id))) {
            if(player1) {
                piece.classList.add('black'); 
            } else { 
                piece.classList.add('white'); // if invalid space, must do this.classList.remove('white') later
            }

            // grab center element's x and y indicies. right-left, top-bottom. 5 is center, AKA the piece being placed
            // const x_center = grabSecondCharAsNumber(piece.id); // don't need these now that I fixed my event listener.
            // const y_center = grabFourthCharAsNumber(piece.id); // going to just use this.x, this.y instead
            
            // for each neighbor
            for(let i = 1; i <= 9; i++) {
                if(i !== 5) {
                    const arr = [];
                    this.checkDirectionMove(i, this.x + x_neighborDirections[i], this.y + y_neighborDirections[i], arr);
                }
            }
            
            // if the piece being placed is a proper sandwich, this.canPlace is made true in checkDirection
            if(this.canPlace) {

                document.querySelector('.whatsPlayed').innerText = `${piece.id} was played.`;
                console.log(`${piece.id} placed.`);
                
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
                this.canPlace = false;
            } else {
                // invalidMoveAlert();
                piece.classList.remove('black');
                piece.classList.remove('white');
            }

            updatePieceCounters();    
            checkEndCondition(this);  

            if(player1 && !player1CanMove) {
                player1 = false;
                document.querySelector('.whosTurn').innerText = 'It\'s player 2\'s turn. \nPlay a white piece.';
            } else if(!player1 && !player2CanMove) {
                player1 = true;
                document.querySelector('.whosTurn').innerText = 'It\'s player 1\'s turn. \nPlay a black piece.';
            }     
        }
    }
    // Checks a direction of a neighbor recursively in that direction until end conditions
    checkDirectionMove(indexDirection, xDirection, yDirection, arr) {
        const neighbor = document.getElementById(`R${xDirection}C${yDirection}`);

        if(this.isPiece(neighbor)) {
            if(player1 && neighbor.classList.contains('white')) {   
                arr.push(neighbor.id);
                this.checkDirectionMove(indexDirection, xDirection + x_neighborDirections[indexDirection], yDirection + y_neighborDirections[indexDirection], arr);
            } else if (!player1 && neighbor.classList.contains('black')) {
                arr.push(neighbor.id);
                this.checkDirectionMove(indexDirection, xDirection + x_neighborDirections[indexDirection], yDirection + y_neighborDirections[indexDirection], arr);
            } else if (arr.length > 0 && ((player1 && neighbor.classList.contains('black')) || (!player1 && neighbor.classList.contains('white')))) {
                document.querySelector('.whatFlipped').innerText = `${arr} were flipped.`;
                this.flipSandwhichMeats(arr);
                this.canPlace = true;
                return arr;
            }
        } 
    }
    // Flip pieces when a sandwich happens AKA a piece is placed
    flipSandwhichMeats(arr) {
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
    // Checks if there is a white or black piece at a given location...need to update this to not need a parameter
    isPiece(location) {
        if(location && (location.classList.contains('black') || location.classList.contains('white'))) {      // if not null 
            return true;
        }
    }
}


// ===========================================================================================================================================================
// ===========================================================================================================================================================
//                                          SUPPORTING FUNCTIONS  
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 



// // Checks a direction of a neighbor recursively in that direction until end conditions
// const checkDirectionMove = (indexDirection, xDirection, yDirection, arr) =>{
//     const neighbor = document.getElementById(`R${xDirection}C${yDirection}`);

//     if(isPiece(neighbor)) {
//         if(player1 && neighbor.classList.contains('white')) {   
//             arr.push(neighbor.id);
//             checkDirectionMove(indexDirection, xDirection + x_neighborDirections[indexDirection], yDirection + y_neighborDirections[indexDirection], arr);
//         } else if (!player1 && neighbor.classList.contains('black')) {
//             arr.push(neighbor.id);
//             checkDirectionMove(indexDirection, xDirection + x_neighborDirections[indexDirection], yDirection + y_neighborDirections[indexDirection], arr);
//         } else if (arr.length > 0 && ((player1 && neighbor.classList.contains('black')) || (!player1 && neighbor.classList.contains('white')))) {
//             document.querySelector('.whatFlipped').innerText = `${arr} were flipped.`;
//             flipSandwhichMeats(arr);
//             this.canPlace = true;
//             return arr;
//         }
//     } 
// }

// // Flip pieces when a sandwich happens AKA a piece is placed
// const flipSandwhichMeats = (arr) => {
//     arr.forEach(element => {
//         document.getElementById(element).classList.toggle('black');
//         document.getElementById(element).classList.toggle('white');
//         if(player1) {
//             blackCount ++;
//             whiteCount --;
//         } else { 
//             whiteCount ++;
//             blackCount --;
//         }
//     });
// }

// const isPiece = (location) => {
//     if(location && (location.classList.contains('black') || location.classList.contains('white'))) {      // if not null 
//         return true;
//     }
// }
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

// ===========================================================================================================================================================
// ===========================================================================================================================================================
//                                          END CONDITIONS
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const checkEndCondition = (pieceInstance) => {
    player1CanMove = false;
    player2CanMove = false;
    // console.log(`player 1 can move: ${player1CanMove}`);
    // console.log(`player 2 can move: ${player2CanMove}`);

    // need to loop through whole 2D array, elements 1 to 8 at least for just game pieces 
    for(let x = 1; x <= 8; x++) {
        for(let y = 1; y <= 8; y ++) {
            piece = document.getElementById(`R${x}C${y}`);

            if(!pieceInstance.isPiece(piece)) {
                piece.classList.add('black');
                // console.log(`checking end conditions for player1 on ${piece.id}`);
                for(let i = 1; i <= 9; i++) {
                    if(i !== 5) {
                        // console.log('neighbor ' + i);
                        const arr = [];
                        checkDirectionForEnd(i, x + x_neighborDirections[i], y + y_neighborDirections[i], arr, piece.id, pieceInstance);
                    }
                }
                piece.classList.remove('black');

                piece.classList.add('white');
                // console.log(`checking end conditions for player2 on ${piece.id}`);
                for(let i = 1; i <= 9; i++) {
                    if(i !== 5) {
                        // console.log('neighbor ' + i);
                        const arr = [];
                        checkDirectionForEnd(i, x + x_neighborDirections[i], y + y_neighborDirections[i], arr, piece.id, pieceInstance);
                    }
                }
                piece.classList.remove('white');
            }
        }
    }
    // console.log(`player1 can move: ${player1CanMove}`);
    // console.log(`player2 can move: ${player2CanMove}`)

    if((!player1CanMove && !player2CanMove) || (blackCount + whiteCount === 64)) {
        console.log('game is over inside checkEndCondition');       
        gameOver();
    }
}

const checkDirectionForEnd = (indexDirection, xDirection, yDirection, arr, pieceID, pieceInstance) => {
    // console.log('checking direction for end');
    const neighbor = document.getElementById(`R${xDirection}C${yDirection}`);
    const piece = document.getElementById(pieceID);

    if(pieceInstance.isPiece(neighbor)) { // the player1 and player2 stuff are the problem here. this search needs to be more general
        if(piece.classList.contains('black') && neighbor.classList.contains('white')) {   
            arr.push(neighbor.id);
            checkDirectionForEnd(indexDirection, xDirection + x_neighborDirections[indexDirection], yDirection + y_neighborDirections[indexDirection], arr, pieceID, pieceInstance);
        } else if (piece.classList.contains('white') && neighbor.classList.contains('black')) {
            arr.push(neighbor.id);
            checkDirectionForEnd(indexDirection, xDirection + x_neighborDirections[indexDirection], yDirection + y_neighborDirections[indexDirection], arr, pieceID, pieceInstance);
        } 
        if (arr.length > 0 && piece.classList.contains('black') && neighbor.classList.contains('black')) { //don't care if it's player1 or not, care about class of piece being placed
            player1CanMove = true;
            // console.log(`player 1 can move, neighbor is ${neighbor.id}: ${player1CanMove}`)
            return arr;
        }
        if (arr.length > 0 && piece.classList.contains('white') && neighbor.classList.contains('white')) {
            player2CanMove = true;
            // console.log(`player 2 can move, neighbor is ${neighbor.id}: ${player2CanMove}`)
            return arr;
        } 
    }
}

const gameOver = () => {
    openEndModal();
}


// ===========================================================================================================================================================
// ===========================================================================================================================================================

//                                       GAME SETUP & CACHED DOM NODES
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


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
board.setUpStart(); // board.setUpLateGameForDebugging();
