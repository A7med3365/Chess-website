import { chessBoard } from "./myChessModule.js";

chessBoard.generateBoard()
//chessBoard.gameInit()

chessBoard.addPiece(".pos-55",chessBoard.chessPieces.whiteBishop)

chessBoard.addEventAll()

const buttons = $('div#spawn button')

buttons.each(function(index){
    
    $(this).on('click',function() {

        const piece = $(this).attr('value')
        chessBoard.addPiece('.pos-55',piece)
    })
})

$('button#init').on('click',function(){
    chessBoard.gameInit()
})

$('button#clear').on('click',function(){
    chessBoard.clearBoard()
})
