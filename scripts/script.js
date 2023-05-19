
const piecesTypes = [       //chess pieces types
    "bp",   //black pawn
    "br",   //black rook
    "bb",   //black bishop
    "bn",   //black knight
    "bq",   //black queen
    "bk",   //black king
    "wp",   //white pawn
    "wr",   //white rook
    "wb",   //white bishop
    "wn",   //white knight
    "wq",   //white queen
    "wk"    //white king

]

/*
--------------------------Functions----------------------------------
*/

function gameInit() { //initlizing the game, putting every piece in the starting position. only white for now
    
    for (let i = 1; i <= 8; i++) { addPiece(`pos-2${i}`,'wp') }
    addPiece(`pos-11`,'wr')
    addPiece(`pos-18`,'wr')
    addPiece(`pos-12`,'wn')
    addPiece(`pos-17`,'wn')
    addPiece(`pos-13`,'wb')
    addPiece(`pos-16`,'wb')
    addPiece(`pos-14`,'wq')
    addPiece(`pos-15`,'wk')
}


function addEvent(piece) {  //this will add onClick event on all pieces of type *piece*, might add a position input to target one piece
    $(`.${piece}`).on('click',function(){

        const piece = event.target.classList[1]
        const pos = event.target.classList[0]
        console.log(pos);
        //console.log(piece,pos.split("-")[1][0]);

        posx = pos.split("-")[1][1]
        posy = pos.split("-")[1][0]
        newPos="pos-"+String(Number(posy)+1)+posx
        console.log(newPos);
        console.log(posx,posy);
        movePiece(pos,newPos,piece)
        
    })
}

function addEventAll() { //this will add onClick event on all pieces on the board
    
    for (const piece of piecesTypes) {
        addEvent(piece)
    }
}

function removePiece(pos,piece) {       //remove a piece of type *piece* in the positon *pos*
    console.log(2);
    $(`.${pos}`).removeClass(piece)
    //console.log($(pos));
}

function addPiece(pos,piece) {          //add a piece of type *piece* in the positon *pos*
    //console.log(3);
    $(`.${pos}`).addClass(piece)
}

function movePiece(from, to, piece){    //move a piece of type *piece* 
    console.log(1);
    removePiece(from,piece)
    addPiece(to,piece)
    addEvent(piece)
}


function possibleMove(pos) {        //this will display a possible move on the board at *pos*
    
}

function addEventPossibleMove(pos) {    //this will add en event for the possible move, onClick -> movePiece to the clicked position
    
}




/*
--------------------------chess pieces moves----------------------------------
*/


function whitePawn() {

}
function blackPawn() {

}
function whiteRook() {

}
function blackRook() {

}
function whiteKnight() {

}
function blackKnight() {

}
function whiteBishop() {

}
function blackBishop() {

}
function whiteQueen() {

}
function blackQueen() {

}
function whiteKing() {

}
function blackKing() {

}



/*
--------------------------objects----------------------------------
*/

const chessPiecesMoves = {
    wp: whitePawn,
    bp: blackPawn,
    wr: whiteRook,
    br: blackRook,
    wn: whiteKnight,
    bn: blackKnight,
    wb: whiteBishop,
    bb: blackBishop,
    wq: whiteQueen,
    bq: blackQueen,
    wk: whiteKing,
    bk: blackKing
  };
  





/*
--------------------------chess Board generation----------------------------------
*/

const chessBoard = $('#chess-board')

for (let i = 8; i >= 1; i--) {

    for (let j = 1; j <= 8; j++) {
        chessBoard.append(`<div class='pos-${i}${j}'></div>`)
        const currentBox = $(`.pos-${i}${j}`)

        if ((j % 2 == 0 && i % 2 == 0)||(j % 2 == 1 && i % 2 == 1)) {
            currentBox.css({'background-color':'gray'})
        } else {
            currentBox.css({'background-color':'white'})
        }
        
    }



    
}


/*
--------------------------expermints----------------------------------
*/

    // $('div.pos-23').addClass('wp')
    // $('div.pos-24').addClass('wp')

    // $('.wp').on('click',function(){

    //     const piece = event.target.classList[1]
    //     const pos = event.target.classList[0]
    //     console.log(pos);
    //     //console.log(piece,pos.split("-")[1][0]);

    //     posx = pos.split("-")[1][1]
    //     posy = pos.split("-")[1][0]
    //     newPos="pos-"+String(Number(posy)+1)+posx
    //     console.log(newPos);
    //     console.log(posx,posy);
    //     movePiece(pos,newPos,piece)

    // })

    gameInit()

    addEventAll()
    chessPiecesMoves.bb()
