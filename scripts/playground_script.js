import { chessBoard, chessPiecesMoves, game } from "./myChessModule.js";



chessBoard.generateBoard()
chessBoard.gameInit(false)
chessBoard.addEventAll('w')



// chessBoard.addPiece(".pos-14",chessBoard.chessPieces.whiteKing)
// chessBoard.addPiece(".pos-75",chessBoard.chessPieces.blackKnight)

// chessBoard.addPiece(".pos-13",chessBoard.chessPieces.blackKing)
// chessBoard.addPiece(".pos-55",chessBoard.chessPieces.whiteBishop)
// chessBoard.addPiece(".pos-22",chessBoard.chessPieces.blackPawn)
// console.log(game.checkRoll(1,1,chessPiecesMoves.topRight,'b'));
// console.log(game.isCheck(game.side.white));
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

// chessBoard.clearEvents()

function getQueryParams() {
    var params = {};
    var search = window.location.search.substring(1);
    console.log(search);
    var pairs = search.split('&');
    console.log(pairs);
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1] || '');
      params[key] = value;
    }
    return params;
  }

  // Retrieve the values from the query parameters
  var queryParams = getQueryParams();
  var param1Value = queryParams.param1;
  var param2Value = queryParams.param2;

  // Use the values as needed
  console.log(param1Value); // Output: Hello
  console.log(param2Value); // Output: World


