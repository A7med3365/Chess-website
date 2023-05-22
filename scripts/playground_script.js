import { chessBoard, chessPiecesMoves, game } from "./myChessModule.js";



chessBoard.generateBoard()
//chessBoard.gameInit()
chessBoard.addPiece(".pos-14",chessBoard.chessPieces.whiteKing)
chessBoard.addPiece(".pos-75",chessBoard.chessPieces.blackKnight)

chessBoard.addPiece(".pos-13",chessBoard.chessPieces.blackKing)
chessBoard.addPiece(".pos-55",chessBoard.chessPieces.whiteBishop)
chessBoard.addPiece(".pos-22",chessBoard.chessPieces.blackPawn)
// console.log(game.checkRoll(1,1,chessPiecesMoves.topRight,'b'));
console.log(game.isCheck(game.side.white));
//console.log(game.isCheck(game.side.black));

// console.log($('.pos-55').attr('class').split(/\s+/))
//chessBoard.addEventAll()

const buttons = $('div#spawn button')
const buttonsBlack = $('div#spawn-black button')

buttons.each(function(index){
    
    $(this).on('click',function() {

        const piece = $(this).attr('value')
        chessBoard.addPiece('.pos-55',piece)
    })
})

buttonsBlack.each(function(index){
    
    $(this).on('click',function() {

        const piece = $(this).attr('value')
        chessBoard.addPiece('.pos-15',piece)
    })
})

$('button#init').on('click',function(){
    chessBoard.gameInit()
})

$('button#clear').on('click',function(){
    chessBoard.clearBoard()
})


