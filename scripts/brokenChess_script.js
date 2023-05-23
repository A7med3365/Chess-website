import { chessBoard, chessPiecesMoves, game, Timer } from "./myChessModule.js";

chessBoard.generateBoard()

let search = window.location.search.substring(1);

const timer = search.split('=')[1]

function getRandomChessPieces(side) {
    const pieces = [`${side}r`,`${side}r`, `${side}n`, `${side}b`];
    const chessSet = [];
  
    
  
    // Generate random number of remaining pieces
    for (let i = 0; i < 6; i++) {
        const randomPiece = pieces[Math.floor(Math.random() * (pieces.length - 1)) + 1];
        chessSet[i] = randomPiece;
    }
    
    // Generate a random position for the queen (between 0 and 6)
    const queenPosition = Math.floor(Math.random() * 7);
    chessSet.splice(queenPosition, 0, `${side}q`);
    chessSet.splice(4, 0, `${side}k`);
    return chessSet;
  }
  
  // Example usage
  const whiteRandomPieces = getRandomChessPieces('w');
  const blackRandomPieces = getRandomChessPieces('b');

  for (let i = 1; i <= 8; i++) { chessBoard.addPiece(`.pos-2${i}`,'wp') }
  for (let i = 1; i <= 8; i++) { chessBoard.addPiece(`.pos-7${i}`,'bp') }

  for (const pieceIndex in whiteRandomPieces) {
    const x = Number(pieceIndex) + 1
    console.log(`.pos-1${x}`,whiteRandomPieces[pieceIndex]);
    chessBoard.addPiece(`.pos-1${x}`,whiteRandomPieces[pieceIndex])
  }

  for (const pieceIndex in blackRandomPieces) {
    const x = Number(pieceIndex) + 1
    console.log(`.pos-8${x}`,blackRandomPieces[pieceIndex]);
    chessBoard.addPiece(`.pos-8${x}`,blackRandomPieces[pieceIndex])
  }

  game.start(timer,true)
  
  
  