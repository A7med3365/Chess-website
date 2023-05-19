
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
    $(pos).attr('value','empty')
    //console.log($(pos));
}

function addPiece(pos,piece) {          //add a piece of type *piece* in the positon *pos*
    //console.log(3);
    $(pos).addClass(piece)
    $(pos).attr('value',piece[0])
}

function movePiece(from, to, piece){    //move a piece of type *piece* 
    //console.log(1);
    removePiece(from,piece)
    addPiece(to,piece)

    $('.mv').removeClass("mv").off('click') //clear the previous displayed moves
    addEvent(piece)
    
}

function displayMoves(moves ,currPos, piece, clear = true) {
    
    if (clear) {
        chessPiecesMoves.clearMoves()
    }

    for (const move of moves) {

        const pos = ".pos-" + String(move.y)+String(move.x)

        //console.log(pos);

        if ($(pos).attr('value')=='empty') {

            $(pos).addClass("mv")

        $(`.mv${pos}`).on('click',function(e){       //this will add en event for the possible move, onClick -> movePiece to the clicked position

            let from = currPos
            let to = pos
    
            console.log(from,to);
    
            movePiece('.'+from, to, piece)
    
        })
        }
                
    }

}

function resCheck(x,y) {
    const pos = ".pos-" + String(y)+String(x)
    if ($(pos).attr('value')=='empty'){
        return false
    } else {
        return true
    }
}


function getXY(pos) {
    //console.log(pos);
    let x = Number(pos[5])
    let y = Number(pos[4])
    return [x,y]
}




function roll(posx,posy,dir) {
        
    moves = []

    const dx = dir[0]
    const dy = dir[1]

    let x = posx + dx
    let y = posy + dy

    while (x >= 1 && x <= 8 && y >= 1 && y <= 8) {  //the condition will keep us inside the board

        moves.push({        //add the next possible position
            'x': x,
            'y': y
        })
        
        if (resCheck(x,y)) { break } //break if we reach another piece

        x += dx         //increment in the desired direction
        y += dy         //increment in the desired direction
    }
    

    console.log(moves);
    return moves
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
    

    let [posx, posy] = getXY(pos);

    const moves = [
        roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
        roll(posx,posy,chessPiecesMoves.left), //Horizontal left
        roll(posx,posy,chessPiecesMoves.up), //vertical upward
        roll(posx,posy,chessPiecesMoves.down), //vertical downward
    ]
    

    chessPiecesMoves.clearMoves()

    for (const mv of moves) {
        displayMoves(mv, pos, 'wr', false);
    }
    
        
}

function blackRook(pos) {

    let [posx, posy] = getXY(pos);

    const moves = [
        roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
        roll(posx,posy,chessPiecesMoves.left), //Horizontal left
        roll(posx,posy,chessPiecesMoves.up), //vertical upward
        roll(posx,posy,chessPiecesMoves.down), //vertical downward
    ]
    

    chessPiecesMoves.clearMoves()

    for (const mv of moves) {
        displayMoves(mv, pos, 'br', false);
    }

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

    let [posx, posy] = getXY(pos);

    const moves = [
        roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
        roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
        roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
        roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
    ]
    

    chessPiecesMoves.clearMoves()

    for (const mv of moves) {
        displayMoves(mv, pos, 'wb', false);
    }
    
}

function blackBishop(pos) {
    
    let [posx, posy] = getXY(pos);

    const moves = [
        roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
        roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
        roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
        roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
    ]
    

    chessPiecesMoves.clearMoves()

    for (const mv of moves) {
        displayMoves(mv, pos, 'bb', false);
    }

}

function whiteQueen(pos) {
    
    let [posx, posy] = getXY(pos);

    const moves = [
        roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
        roll(posx,posy,chessPiecesMoves.left), //Horizontal left
        roll(posx,posy,chessPiecesMoves.up), //vertical upward
        roll(posx,posy,chessPiecesMoves.down), //vertical downward
        roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
        roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
        roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
        roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
    ]
    

    chessPiecesMoves.clearMoves()

    for (const mv of moves) {
        displayMoves(mv, pos, 'wq', false);
    }

}

function blackQueen(pos) {
   
    let [posx, posy] = getXY(pos);

    const moves = [
        roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
        roll(posx,posy,chessPiecesMoves.left), //Horizontal left
        roll(posx,posy,chessPiecesMoves.up), //vertical upward
        roll(posx,posy,chessPiecesMoves.down), //vertical downward
        roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
        roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
        roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
        roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
    ]
    

    chessPiecesMoves.clearMoves()

    for (const mv of moves) {
        displayMoves(mv, pos, 'bq', false);
    }

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
    clearMoves: function(){
        $('.mv').removeClass("mv").off('click') //clear the previous displayed moves
        addEventAll()
    },
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
    bk: blackKing,
    right:[1, 0],
    left:[-1, 0],
    up:[0, 1],
    down:[0, -1],
    topRight: [1,1],
    topLeft: [-1,1],
    bottomRight: [1,-1],
    bottomLeft: [-1,-1]
  };
  

  



/*
--------------------------chess Board generation----------------------------------
*/

const chessBoard = $('#chess-board')

for (let i = 8; i >= 1; i--) {

    for (let j = 1; j <= 8; j++) {
        chessBoard.append(`<div class='pos-${i}${j}' value="empty"></div>`)
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

    //gameInit()

    addPiece(`.pos-53`,'wq')
    addPiece(`.pos-56`,'wb ')

    

    addEventAll()

    //movePiece("pos-22.wp",'pos-32','wp')

    // function roll(dir,posx,posy) {
        
    //     moves = []
    //     for (let i = 1; i <= 8; i++) {

    //         if ((dir == 'h') && (i !== posx)) {
    //             moves.push({
    //                 x: i,
    //                 y: posy
    //             });

    //         } else if ((dir == 'v') && (i !== posy)) {
    //             moves.push({
    //                 x: posx,
    //                 y: i
    //             });
    //         }
    //     }

    //     console.log(moves);
    //     return moves
    // }
    
    
