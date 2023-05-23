import { chessBoard, chessPiecesMoves, game, Timer } from "./myChessModule.js";

chessBoard.generateBoard()

let search = window.location.search.substring(1);

const timer = search.split('=')[1]

console.log(Number(timer));

game.start(timer)



