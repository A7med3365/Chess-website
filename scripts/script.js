
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
    
    for (let i = 1; i <= 8; i++) { addPiece(`.pos-2${i}`,'wp') }
    addPiece(`.pos-11`,'wr')
    addPiece(`.pos-18`,'wr')
    addPiece(`.pos-12`,'wn')
    addPiece(`.pos-17`,'wn')
    addPiece(`.pos-13`,'wb')
    addPiece(`.pos-16`,'wb')
    addPiece(`.pos-14`,'wq')
    addPiece(`.pos-15`,'wk')
}
 

function addEvent(piece) {  //this will add onClick event on all pieces of type *piece*, might add a position input to target one piece


    $(`.${piece}`).on('click',function(e){

        

        const piece = e.target.classList[1]
        const pos = e.target.classList[0]
        //console.log(pos)
        
        chessPiecesMoves[piece](pos)
        
        
        //console.log(piece);
        //console.log(piece,pos.split("-")[1][0]);

        
        // console.log(pos);
        // let [posx,posy] = getXY(pos)
        // newPos="pos-"+String(Number(posy)+1)+posx
        // console.log(newPos);
        // console.log(posx,posy);
        // movePiece(pos,newPos,piece)
        
    })
}

function addEventAll() { //this will add onClick event on all pieces on the board
    
    for (const piece of piecesTypes) {
        addEvent(piece)
    }
}

function removePiece(pos,piece) {       //remove a piece of type *piece* in the positon *pos*
    console.log(2);
    $(pos).removeClass(piece)
    //console.log($(pos));
}

function addPiece(pos,piece) {          //add a piece of type *piece* in the positon *pos*
    //console.log(3);
    $(pos).addClass(piece)
}

function movePiece(from, to, piece){    //move a piece of type *piece* 
    console.log(1);
    removePiece(from,piece)
    addPiece(to,piece)

    $('.mv').removeClass("mv").off('click') //clear the previous displayed moves
    addEvent(piece)
    
}

function displayMoves(moves ,currPos, piece) {
    
    $('.mv').removeClass("mv").off('click') //clear the previous displayed moves
    addEventAll()

    for (const move of moves) {

        const pos = ".pos-" + String(move.y)+String(move.x)

        console.log(pos);
        
        $(pos).addClass("mv")

        $(`.mv${pos}`).on('click',function(e){       //this will add en event for the possible move, onClick -> movePiece to the clicked position

            let from = currPos
            let to = pos
    
            console.log(from,to);
    
            movePiece('.'+from, to, piece)
    
        })

        
    }

}



function getXY(pos) {
    console.log(pos);
    let x = Number(pos[5])
    let y = Number(pos[4])
    return [x,y]
}


/*
--------------------------chess pieces moves----------------------------------
*/


function whitePawn(pos) { 

    moves=[]

    //console.log(pos);
    let [posx,posy] = getXY(pos)
    //console.log(typeof(x),x,y)

    moves.push({
        x:posx,
        y:posy+1
    })
    
     if (posy == 2) {
        moves.push({
            x:posx,
            y:posy+2
        })
     }

     displayMoves(moves,pos,'wp');




}
function blackPawn(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    moves.push({
        x: posx,
        y: posy - 1
    });

    if (posy == 7) {
        moves.push({
            x: posx,
            y: posy - 2
        });
    }

    displayMoves(moves, pos, 'bp');
}

function whiteRook(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Horizontal moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posx) {
            moves.push({
                x: i,
                y: posy
            });
        }
    }

    // Vertical moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posy) {
            moves.push({
                x: posx,
                y: i
            });
        }
    }

    displayMoves(moves, pos, 'wr');
}

function blackRook(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Horizontal moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posx) {
            moves.push({
                x: i,
                y: posy
            });
        }
    }

    // Vertical moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posy) {
            moves.push({
                x: posx,
                y: i
            });
        }
    }

    displayMoves(moves, pos, 'br');
}

function whiteKnight(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Knight moves
    const knightMoves = [
        { x: posx + 1, y: posy + 2 },
        { x: posx + 1, y: posy - 2 },
        { x: posx - 1, y: posy + 2 },
        { x: posx - 1, y: posy - 2 },
        { x: posx + 2, y: posy + 1 },
        { x: posx + 2, y: posy - 1 },
        { x: posx - 2, y: posy + 1 },
        { x: posx - 2, y: posy - 1 }
    ];

    moves.push(...knightMoves);

    displayMoves(moves, pos, 'wn');
}

function blackKnight(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Knight moves
    const knightMoves = [
        { x: posx + 1, y: posy + 2 },
        { x: posx + 1, y: posy - 2 },
        { x: posx - 1, y: posy + 2 },
        { x: posx - 1, y: posy - 2 },
        { x: posx + 2, y: posy + 1 },
        { x: posx + 2, y: posy - 1 },
        { x: posx - 2, y: posy + 1 },
        { x: posx - 2, y: posy - 1 }
    ];

    moves.push(...knightMoves);

    displayMoves(moves, pos, 'bn');
}

function whiteBishop(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Diagonal moves
    for (let i = 1; i <= 8; i++) {
        if (posx + i <= 8 && posy + i <= 8) {
            moves.push({
                x: posx + i,
                y: posy + i
            });
        }
        if (posx - i >= 1 && posy - i >= 1) {
            moves.push({
                x: posx - i,
                y: posy - i
            });
        }
        if (posx + i <= 8 && posy - i >= 1) {
            moves.push({
                x: posx + i,
                y: posy - i
            });
        }
        if (posx - i >= 1 && posy + i <= 8) {
            moves.push({
                x: posx - i,
                y: posy + i
            });
        }
    }

    displayMoves(moves, pos, 'wb');
}

function blackBishop(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Diagonal moves
    for (let i = 1; i <= 8; i++) {
        if (posx + i <= 8 && posy + i <= 8) {
            moves.push({
                x: posx + i,
                y: posy + i
            });
        }
        if (posx - i >= 1 && posy - i >= 1) {
            moves.push({
                x: posx - i,
                y: posy - i
            });
        }
        if (posx + i <= 8 && posy - i >= 1) {
            moves.push({
                x: posx + i,
                y: posy - i
            });
        }
        if (posx - i >= 1 && posy + i <= 8) {
            moves.push({
                x: posx - i,
                y: posy + i
            });
        }
    }

    displayMoves(moves, pos, 'bb');
}

function whiteQueen(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Horizontal moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posx) {
            moves.push({
                x: i,
                y: posy
            });
        }
    }

    // Vertical moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posy) {
            moves.push({
                x: posx,
                y: i
            });
        }
    }

    // Diagonal moves
    for (let i = 1; i <= 8; i++) {
        if (posx + i <= 8 && posy + i <= 8) {
            moves.push({
                x: posx + i,
                y: posy + i
            });
        }
        if (posx - i >= 1 && posy - i >= 1) {
            moves.push({
                x: posx - i,
                y: posy - i
            });
        }
        if (posx + i <= 8 && posy - i >= 1) {
            moves.push({
                x: posx + i,
                y: posy - i
            });
        }
        if (posx - i >= 1 && posy + i <= 8) {
            moves.push({
                x: posx - i,
                y: posy + i
            });
        }
    }

    displayMoves(moves, pos, 'wq');
}

function blackQueen(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // Horizontal moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posx) {
            moves.push({
                x: i,
                y: posy
            });
        }
    }

    // Vertical moves
    for (let i = 1; i <= 8; i++) {
        if (i !== posy) {
            moves.push({
                x: posx,
                y: i
            });
        }
    }

    // Diagonal moves
    for (let i = 1; i <= 8; i++) {
        if (posx + i <= 8 && posy + i <= 8) {
            moves.push({
                x: posx + i,
                y: posy + i
            });
        }
        if (posx - i >= 1 && posy - i >= 1) {
            moves.push({
                x: posx - i,
                y: posy - i
            });
        }
        if (posx + i <= 8 && posy - i >= 1) {
            moves.push({
                x: posx + i,
                y: posy - i
            });
        }
        if (posx - i >= 1 && posy + i <= 8) {
            moves.push({
                x: posx - i,
                y: posy + i
            });
        }
    }

    displayMoves(moves, pos, 'bq');
}

function whiteKing(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // King moves
    const kingMoves = [
        { x: posx + 1, y: posy },
        { x: posx + 1, y: posy + 1 },
        { x: posx + 1, y: posy - 1 },
        { x: posx - 1, y: posy },
        { x: posx - 1, y: posy + 1 },
        { x: posx - 1, y: posy - 1 },
        { x: posx, y: posy + 1 },
        { x: posx, y: posy - 1 }
    ];

    moves.push(...kingMoves);

    displayMoves(moves, pos, 'wk');
}

function blackKing(pos) {
    moves = [];

    let [posx, posy] = getXY(pos);

    // King moves
    const kingMoves = [
        { x: posx + 1, y: posy },
        { x: posx + 1, y: posy + 1 },
        { x: posx + 1, y: posy - 1 },
        { x: posx - 1, y: posy },
        { x: posx - 1, y: posy + 1 },
        { x: posx - 1, y: posy - 1 },
        { x: posx, y: posy + 1 },
        { x: posx, y: posy - 1 }
    ];

    moves.push(...kingMoves);

    displayMoves(moves, pos, 'bk');
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

    //movePiece("pos-22.wp",'pos-32','wp')
    
