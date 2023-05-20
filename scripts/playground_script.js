import { chessBoard } from "./myChessModule.js";

chessBoard.generateBoard()
chessBoard.gameInit()

chessBoard.addPiece(".pos-55",chessBoard.chessPieces.whiteBishop)

chessBoard.addEventAll()