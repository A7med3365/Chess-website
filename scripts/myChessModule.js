
class Timer {
    constructor() {
      this.countdown = null;
      this.seconds = 0;
      this.isPaused = false;
      this.remainingSeconds = 0;
      this.selector = ''
    }
  
    start() {
      if (!this.countdown) {
        this.countdown = setInterval(this.updateTimer.bind(this), 1000);
      }
    }
  
    pause() {
      if (this.countdown) {
        console.log('paused');
        clearInterval(this.countdown);
        this.countdown = null;
        this.isPaused = true;
        this.remainingSeconds = this.seconds;
      }
    }
  
    resume() {
      if (this.isPaused) {
        console.log('resume');
        this.seconds = this.remainingSeconds;
        this.start();
        this.isPaused = false;
        this.remainingSeconds = 0;
      }
    }
  
    updateTimer() {
      const timerDisplay = $(this.selector); // HTML element to display the timer
      console.log(this.selector);
      const minutes = Math.floor(this.seconds/60)
      const sec = (this.seconds%60)
      timerDisplay.text(`${minutes}:${sec}`); // Update the timer display
  
      if (this.seconds > 0) {
        this.seconds--; // Decrease the countdown value by 1
      } else {
        clearInterval(this.countdown); // Clear the countdown interval when the timer reaches 0
        this.countdown = null;
      }
    }
  }
  



const timer = {
    w: 'whiteTimer',
    b: 'blackTimer'
}




const game = {

    whiteTimer : new Timer(),
    blackTimer : new Timer(),

    start:function() {
        
        chessBoard.gameInit()

        

        this.whiteTimer.seconds = this.gameTimer
        this.blackTimer.seconds = this.gameTimer

        this.whiteTimer.selector = '#timer-white'
        this.blackTimer.selector = '#timer-black'

        this.blackTimer.start()
        this.whiteTimer.start()
        
        this.switchTurn('b')

    },

    switchTurn: function(side) {
        
        const oppSide = this.side.oppSide[side]

        

        chessBoard.clearEvents(side)
        chessBoard.addEventAll(oppSide)
        
        this[timer[side]].pause()
        this[timer[oppSide]].resume()

    },

    endGame: function() {
        
    },
    
    isStarted: true,
    isOver: false,

    gameTimer : 600,



    isCheck: function(side , x = 0  , y = 0) {

        const oppSide = this.side.oppSide[side]
        
        // let checkAdj = []

        if (x==0 && y==0) {
            
            const kingPos = chessBoard.getPos(`.${side}k`)
            const [x,y] = chessBoard.getXY(kingPos)            
        }
        
        // console.log(x,y); 


        //checks from queen, rooks and bishops
        
        const queenAndRooks ={
            right : this.checkRoll(x,y,chessPiecesMoves.right),
            left : this.checkRoll(x,y,chessPiecesMoves.left),
            up : this.checkRoll(x,y,chessPiecesMoves.up),
            down : this.checkRoll(x,y,chessPiecesMoves.down)
        }
        const queenAndBishops ={
            bottomRight : this.checkRoll(x,y,chessPiecesMoves.bottomRight),
            bottomLeft : this.checkRoll(x,y,chessPiecesMoves.bottomLeft),
            topRight : this.checkRoll(x,y,chessPiecesMoves.topRight),
            topLeft : this.checkRoll(x,y,chessPiecesMoves.topLeft)
        }

        for (const rollSide in queenAndRooks) {
            const oppPiece = queenAndRooks[rollSide]
            // console.log(oppPiece[1]);
            if (oppPiece) {
                if (oppPiece == `${oppSide}q` || oppPiece == `${oppSide}r` ) {
                    // console.log(queenAndRooks[rollSide],rollSide); 
                    // console.log(x+chessPiecesMoves[rollSide][0],y+chessPiecesMoves[rollSide][1]);
                    // console.log(chessPiecesMoves[rollSide]);

                    // checkAdj.push(
                    //     {
                    //         'x': x+chessPiecesMoves[rollSide][0],
                    //         'y': y+chessPiecesMoves[rollSide][1]
                    //     })
                    // console.log(checkAdj);

                    return true
                }  
            }
        }
        
        for (const rollSide in queenAndBishops) {
            const oppPiece = queenAndBishops[rollSide]
            // console.log(oppPiece[1]);
            if (oppPiece) {
                if (oppPiece == `${oppSide}q` || oppPiece == `${oppSide}b` ) {
                    // console.log(queenAndBishops[rollSide],rollSide);    
                    // console.log(x+chessPiecesMoves[rollSide][0],y+chessPiecesMoves[rollSide][1]);
                    // console.log(chessPiecesMoves[rollSide]);

                    // checkAdj.push(
                    //     {
                    //         'x': x+chessPiecesMoves[rollSide][0],
                    //         'y': y+chessPiecesMoves[rollSide][1]
                    //     })
                    
                    return true
                }  
            }
        }


        //checks from knights

        const knightMoves = [
            { x: x + 1, y: y + 2 },
            { x: x + 1, y: y - 2 },
            { x: x - 1, y: y + 2 },
            { x: x - 1, y: y - 2 },
            { x: x + 2, y: y + 1 },
            { x: x + 2, y: y - 1 },
            { x: x - 2, y: y + 1 },
            { x: x - 2, y: y - 1 }
        ];
        // console.log(x,y);
        // console.log(knightMoves);
        for (const position of knightMoves) {
            
            if (chessBoard.isPiece(position.x,position.y,oppSide,'n')) { 
                
                return true
                 
            }
        }



        //checks for pawns
        let pawnMoves =[]
        if (side == 'w') {

            pawnMoves = [
                { x: x + 1, y: y + 1 },
                { x: x - 1, y: y + 1 }
            ]
            
        } else {

            pawnMoves = [
                { x: x + 1, y: y - 1 },
                { x: x - 1, y: y - 1 }
            ]
        }
        for (const position of pawnMoves) {
            
            if (chessBoard.isPiece(position.x,position.y,oppSide,'p')) { 
                
                return true
                 
            }
        }




        //check from king moves, for moves preventions

        const kingMoves = [
            { x: x + 1, y: y },
            { x: x + 1, y: y + 1 },
            { x: x + 1, y: y - 1 },
            { x: x - 1, y: y },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y - 1 },
            { x: x, y: y + 1 },
            { x: x, y: y - 1 }
        ]

        for (const position of kingMoves) {
            
            if (chessBoard.isPiece(position.x,position.y,oppSide,'k')) { 
                
                return true
                 
            }
        }


        return false

        // if (checkAdj.length === 0) {
        //     return 0
        // } else {
        //     return checkAdj
        // }

    },

    checkRoll: function(posX,posY,dir,side) {

        let oppPiece = 0
    
        const dx = dir[0]
        const dy = dir[1]
    
        let x = posX + dx
        let y = posY + dy
    
        while (chessBoard.isInside(x,y)) {  //the condition will keep us inside the board
    
            
            
            if (chessBoard.isEmpty(x,y)) { 
                const pos = ".pos-" + String(y)+String(x)
                // console.log(pos);
                oppPiece = $(pos).attr('class').split(/\s+/)[1]
                break 
            } //break if we reach another piece
    
            x += dx         //increment in the desired direction
            y += dy         //increment in the desired direction
            
        }
        
        if (side == oppPiece[0]) {
            return 0
        } else {
            return oppPiece    
        }
        
    },


    side:{
        white:'w',
        black:'b',
        oppSide:{
            w:'b',
            b:'w'
        }
    },




}






/*
--------------------------moves object----------------------------------
*/

const chessPiecesMoves = {

    

    wp: function(pos) {

        let moves = []

        //console.log(pos);
        let [posx,posy] = chessBoard.getXY(pos)
        //console.log(typeof(x),x,y)

        if ((!chessBoard.isEmpty(posx,posy+1))) {

            moves.push({
                x:posx,
                y:posy+1
            })
            
            if (posy == 2 && !chessBoard.isEmpty(posx,posy+2)) {
                moves.push({
                    x:posx,
                    y:posy+2
                })
            }
        }

        if ((chessBoard.isEmpty(posx-1,posy+1))) {
            moves.push({
                x: posx - 1,
                y: posy + 1
            });
        }
        if ((chessBoard.isEmpty(posx+1,posy+1))) {
            moves.push({
                x: posx + 1,
                y: posy + 1
            });
        }
        

        chessBoard.displayMoves(moves,pos,'wp');

    },

    bp: function(pos) {

        let moves = [];

        let [posx, posy] = chessBoard.getXY(pos);

        if ((!chessBoard.isEmpty(posx,posy-1))) {

            moves.push({
                x: posx,
                y: posy - 1
            });
    
            if (posy == 7 && !chessBoard.isEmpty(posx,posy-2)) {
                moves.push({
                    x: posx,
                    y: posy - 2
                });
            }

        }
        
        if ((chessBoard.isEmpty(posx-1,posy-1))) {
            moves.push({
                x: posx - 1,
                y: posy - 1
            });
        }
        if ((chessBoard.isEmpty(posx+1,posy-1))) {
            moves.push({
                x: posx + 1,
                y: posy - 1
            });
        }

        chessBoard.displayMoves(moves, pos, 'bp');

    },

    wr: function(pos) {

        let [posx, posy] = chessBoard.getXY(pos);

        const moves = [
            chessBoard.roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.left), //Horizontal left
            chessBoard.roll(posx,posy,chessPiecesMoves.up), //vertical upward
            chessBoard.roll(posx,posy,chessPiecesMoves.down), //vertical downward
        ]
        

        chessBoard.clearMoves()

        for (const mv of moves) {
            chessBoard.displayMoves(mv, pos, 'wr', false);
        }

    },

    br: function(pos) {

        let [posx, posy] = chessBoard.getXY(pos);

        const moves = [
            chessBoard.roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.left), //Horizontal left
            chessBoard.roll(posx,posy,chessPiecesMoves.up), //vertical upward
            chessBoard.roll(posx,posy,chessPiecesMoves.down), //vertical downward
        ]
        

        chessBoard.clearMoves()

        for (const mv of moves) {
            chessBoard.displayMoves(mv, pos, 'br', false);
        }

    },

    wn: function(pos) {

        let moves = [];

        let [posx, posy] = chessBoard.getXY(pos);

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

        for (const move of knightMoves) {
            let moveX = move.x
            let moveY = move.y

            if(chessBoard.isInside(moveX,moveY)){
                moves.push(move);
            }
        }

        chessBoard.displayMoves(moves, pos, 'wn');

    },

    bn: function(pos) {

        let moves = [];

        let [posx, posy] = chessBoard.getXY(pos);

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

        for (const move of knightMoves) {
            let moveX = move.x
            let moveY = move.y

            if(chessBoard.isInside(moveX,moveY)){
                moves.push(move);
            }
        }

        //console.log(moves);


        

        chessBoard.displayMoves(moves, pos, 'bn');

    },

    wb: function(pos) {

        let [posx, posy] = chessBoard.getXY(pos);

        const moves = [
            chessBoard.roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
        ]
        

        chessBoard.clearMoves()

        for (const mv of moves) {
            chessBoard.displayMoves(mv, pos, 'wb', false);
        }

    },

    bb: function(pos) {

        let [posx, posy] = chessBoard.getXY(pos);

        const moves = [
            chessBoard.roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
        ]
        

        chessBoard.clearMoves()

        for (const mv of moves) {
            chessBoard.displayMoves(mv, pos, 'bb', false);
        }

    },

    wq: function(pos) {

        let [posx, posy] = chessBoard.getXY(pos);

        const moves = [
            chessBoard.roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.left), //Horizontal left
            chessBoard.roll(posx,posy,chessPiecesMoves.up), //vertical upward
            chessBoard.roll(posx,posy,chessPiecesMoves.down), //vertical downward
            chessBoard.roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
        ]
        

        chessBoard.clearMoves()

        for (const mv of moves) {
            chessBoard.displayMoves(mv, pos, 'wq', false);
        }

    },

    bq: function(pos) {

        let [posx, posy] = chessBoard.getXY(pos);

        const moves = [
            chessBoard.roll(posx,posy,chessPiecesMoves.right), //Horizontal Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.left), //Horizontal left
            chessBoard.roll(posx,posy,chessPiecesMoves.up), //vertical upward
            chessBoard.roll(posx,posy,chessPiecesMoves.down), //vertical downward
            chessBoard.roll(posx,posy,chessPiecesMoves.topRight), //Diagonal Top Right 
            chessBoard.roll(posx,posy,chessPiecesMoves.topLeft), //Diagonal Top left
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomRight), //Diagonal Bottom Right
            chessBoard.roll(posx,posy,chessPiecesMoves.bottomLeft), //vDiagonal Bottom leftt
        ]
        

        chessBoard.clearMoves()

        for (const mv of moves) {
            chessBoard.displayMoves(mv, pos, 'bq', false);
        }


    },

    wk: function(pos) {
        
        let moves = [];

        let [posx, posy] = chessBoard.getXY(pos);

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

        for (const move of kingMoves) {
            if(!game.isCheck(game.side.white,move.x,move.y) && chessBoard.isInside(move.x,move.y)){
                moves.push(move)
            }
        }
        // moves.push(...kingMoves);

        chessBoard.displayMoves(moves, pos, 'wk');

    },
    
    bk: function(pos) {

        let moves = [];

        let [posx, posy] = chessBoard.getXY(pos);

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

        for (const move of kingMoves) {
            if(!game.isCheck(game.side.black,move.x,move.y) && chessBoard.isInside(move.x,move.y)){
                moves.push(move)
            }
        }
        // moves.push(...kingMoves);

        chessBoard.displayMoves(moves, pos, 'bk');

    },

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
--------------------------moves object----------------------------------
*/


const chessBoard = {

    getPos: function(selector) {
        return $(selector).attr('class').split(/\s+/)[0]
    },

    
    getPiece: function(pos) {
        return $(pos).attr('class').split(/\s+/)[1]
    },

    isInside: function(x,y) {
        return(x >= 1 && x <= 8 && y >= 1 && y <= 8)
    },

    isPiece: function(x,y,side,pieceType) {

        if (chessBoard.isEmpty(x,y) && chessBoard.isInside(x,y)) { // if there is a piece at the position and the positon inside the boundries of the board
            const pos = ".pos-" + String(y)+String(x)
            
            const piece = $(pos).attr('class').split(/\s+/)[1]
            
            if (piece == `${side}${pieceType}` ) {
                return true
            }
             
        }
        return false
        
    },




    /**
     * generate the chess board in side div#chess-board
     *
     * @param {String} light    - The color of the light squares, defualt = white.
     * @param {string} dark     - The color of the dark squares, defualt = gray.
     */
    generateBoard: function(light = 'white',dark = 'gray'){



        this.light = light
        this.dark = dark

        const chessBoardSelector = $('#chess-board')

        for (let i = 8; i >= 1; i--) {

            for (let j = 1; j <= 8; j++) {
                chessBoardSelector.append(`<div class='pos-${i}${j}' value="empty"></div>`)
                const currentBox = $(`.pos-${i}${j}`)

                if ((j % 2 == 0 && i % 2 == 0)||(j % 2 == 1 && i % 2 == 1)) {
                    //currentBox.addClass('dark')
                    currentBox.css({'background-color':this.dark})
                } else {
                    //currentBox.addClass('light')
                    currentBox.css({'background-color':this.light})
                }
                
            }



            
        }

    },

    /**
     * clears teh displyed moves and the onClick listeners
     */
    clearMoves: function(){
        $('.mv').removeClass("mv").off('click') //clear the previous displayed moves
        //console.log(1);
        const takeMoves = $('.take')
        

        takeMoves.each(function(index) {
            const pos = $(this).attr('class').split(/\s+/)[0]
            let [x,y] = chessBoard.getXY(pos)
            //console.log(pos);
            const takenPiece = $(this).attr('class').split(/\s+/)[1];

            if (chessBoard.isDark(x,y)) {
                $(this).css({'background-color':chessBoard.dark})
                // $(this).removeClass("take").toggleClass('dark')
            } else {
                $(this).css({'background-color':chessBoard.light})
                // $(this).removeClass("take").toggleClass('light')
            }
            $(this).removeClass('take').off('click')
            chessBoard.addEvent(takenPiece,'.'+pos)
            
        })
        

        
        //chessBoard.addEventAll()
    },


    piecesTypes : [       //chess pieces types

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

    ],

    blackPieces : [       //chess black pieces 

        "bp",   //black pawn
        "br",   //black rook
        "bb",   //black bishop
        "bn",   //black knight
        "bq",   //black queen
        "bk",   //black king

    ],

    whitePieces : [       //chess pieces types

        "wp",   //white pawn
        "wr",   //white rook
        "wb",   //white bishop
        "wn",   //white knight
        "wq",   //white queen
        "wk"    //white king

    ],


    chessPieces : {
        blackPawn: 'bp',
        blackRook: 'br',
        blackKnight: 'bn',
        blackBishop: 'bb',
        blackQueen: 'bq',
        blackKing: 'bk',
        whitePawn: 'wp',
        whiteRook: 'wr',
        whiteKnight: 'wn',
        whiteBishop: 'wb',
        whiteQueen: 'wq',
        whiteKing: 'wk'
      },


    /**
     * this will take the position class and return a numbers array of x and y 
     * 
     * @param {String} pos      - the position class, pos-yx
     * @returns {Array<number>} - x and y coordinates, Number type
     */
    getXY : function(pos) {
        //console.log(pos);
        let x = Number(pos[5])
        let y = Number(pos[4])
        return [x,y]
    },



    /**
     * check if the there is another piece in xy position
     * 
     * @param {Number} x    - the coloumn
     * @param {Number} y    - the row
     * @returns {boolean}   - the answar in bool
     */
    isEmpty : function(x,y) {
        const pos = ".pos-" + String(y)+String(x)
        if ($(pos).attr('value')=='empty'){
            return false
        } else {
            return true
        }
    },


    /**
     * move a piece of type *piece* 
     * 
     * @param {string} from     -the current positon of the piece
     * @param {string} to       -the new position of the piece
     * @param {String} piece    -the type of the piece
     */
    movePiece : function(from, to, piece){    
        //console.log(1);
        
    
        $('.mv').removeClass("mv").off('click') //clear the previous displayed moves

        chessBoard.clearMoves()

        chessBoard.removePiece(from,piece)
        chessBoard.addPiece(to,piece)

        if (game.isStarted) {
            game.switchTurn(piece[0])
        }

        //chessBoard.addEvent(piece,to)//CHANGE
        
    },





    /**
     * this will add onClick event on all pieces of type *piece*, might add a position input to target one piece
     * 
     * @param {String} piece    - the class of the chess piece
     */
    addEvent : function(piece,pos) {  

        // console.log(2);
        //$(`${pos}`).off('click')
        $(`${pos}`).on('click',function(e){
    
    
            // const piece = e.target.classList[1]
            const pos = e.target.classList[0]
            
            //console.log(pos)
            //console.log(e.target.classList);
            chessPiecesMoves[piece](pos)
            
        })
    },




    clearEvents: function(side = 'a') {
        
        console.log(`clear ${side}`);

        if (side == 'a') {
            for (let i = 8; i >= 1; i--) {

                for (let j = 1; j <= 8; j++) {
                    
                    const currentBox = $(`.pos-${i}${j}`)
                    currentBox.off('click')
                    
                }
               
            }
        } else if (side == 'w') {
            

            for (const piece of chessBoard.whitePieces) {
                const pieces = $(`.${piece}`)
                
                pieces.off('click')
            }
            
        } else if (side == 'b') {

            for (const piece of chessBoard.blackPieces) {
                const pieces = $(`.${piece}`)
                
                pieces.off('click')
            }

        }
    },



    /**
     * this will add onClick event on all pieces on the board
     */
    addEventAll : function(side = 'a') { 

        console.log(`add ${side}`);
    
        if (side == 'a') {
            for (const piece of chessBoard.piecesTypes) {
                const pieces = $(`.${piece}`)
    
                pieces.each(function(index) {
                    const pos = $(this).attr('class').split(/\s+/)[0]
                    chessBoard.addEvent(piece,'.'+pos)
                })
            }
        } else if (side == 'w') {
            console.log('in w');
            for (const piece of chessBoard.whitePieces) {
                const pieces = $(`.${piece}`)
                
                pieces.each(function(index) {
                    const pos = $(this).attr('class').split(/\s+/)[0]
                    console.log(pos,piece);
                    chessBoard.addEvent(piece,'.'+pos)
                })
            }
        } else if (side == 'b') {
            console.log('in b');
            for (const piece of chessBoard.blackPieces) {
                const pieces = $(`.${piece}`)
                // console.log(piece);
                pieces.each(function(index) {
                    const pos = $(this).attr('class').split(/\s+/)[0]
                    console.log(pos,piece);
                    chessBoard.addEvent(piece,'.'+pos)
                })
            }
        }
        
    },

     



    /**
     * clears the board of pieces
     */
    clearBoard : function() { 
    
        for (const piece of chessBoard.piecesTypes) {

            $(`.${piece}`).attr('value','empty')
            $(`.${piece}`).removeClass(piece).removeClass('mv').removeClass('take')
            chessBoard.clearMoves()
            $('#black-taken').html('')
            $('#white-taken').html('')
            
        }
    },



    /**
     * remove a piece of type *piece* in the positon *pos*
     * 
     * @param {String} pos  - the position class, pos-yx
     * @param {string} piece     - the class of the chess piece     
     */
    removePiece : function(pos,piece) {       
        //console.log(2);
        $(pos).removeClass(piece)
        $(pos).off('click')
        $(pos).attr('value','empty')
        //console.log($(pos));
    },
    

    /**
     * add a piece of type *piece* in the positon *pos*
     * 
     * @param {String} pos  - the position class, pos-yx
     * @param {string} piece     - the class of the chess piece     
     */
    addPiece : function(pos,piece) {          
        //console.log(3);
        $(pos).addClass(piece)
        chessBoard.addEvent(piece,pos)
        $(pos).attr('value',piece[0])
    },




    /**
     * initlizing the game, putting every piece in the starting position. only white for now
     * 
     */
    gameInit : function(cond = true) { 
    
        for (let i = 1; i <= 8; i++) { chessBoard.addPiece(`.pos-2${i}`,'wp') }
        chessBoard.addPiece(`.pos-11`,'wr')
        chessBoard.addPiece(`.pos-18`,'wr')
        chessBoard.addPiece(`.pos-12`,'wn')
        chessBoard.addPiece(`.pos-17`,'wn')
        chessBoard.addPiece(`.pos-13`,'wb')
        chessBoard.addPiece(`.pos-16`,'wb')
        chessBoard.addPiece(`.pos-14`,'wq')
        chessBoard.addPiece(`.pos-15`,'wk')

        for (let i = 1; i <= 8; i++) { chessBoard.addPiece(`.pos-7${i}`,'bp') }
        chessBoard.addPiece(`.pos-81`,'br')
        chessBoard.addPiece(`.pos-88`,'br')
        chessBoard.addPiece(`.pos-82`,'bn')
        chessBoard.addPiece(`.pos-87`,'bn')
        chessBoard.addPiece(`.pos-83`,'bb')
        chessBoard.addPiece(`.pos-86`,'bb')
        chessBoard.addPiece(`.pos-84`,'bq')
        chessBoard.addPiece(`.pos-85`,'bk')

        if (cond) {
            chessBoard.addEventAll()    
        }
        
    },

    

    /**
     * this will roll from the piece positon until it finds another piece in the direction sellected and it will add every possible move in that direction.
     * it works for Horizontal, vertical and diagonal directions
     * 
     * chessPiecesMoves ____
     * `````````````````````|__ .right
     * `````````````````````|__ .left
     * `````````````````````|__ .up
     * `````````````````````|__ .down
     * `````````````````````|__ .topRight
     * `````````````````````|__ .topLeft
     * `````````````````````|__ .bottomRight
     * `````````````````````|__ .bottomLeft
     * 
     * 
     * @param {Number} posx         -The current coloumn
     * @param {Number} posy         -The current row
     * @param {Array<Number>} dir   -An array of numbers indicating the direction, use chessPiecesMoves.right .left and so on...
     * @returns {Array<Object>}     -Returns the array of the moves genrated
     */
    roll : function(posx,posy,dir) {
        
        let moves = []
    
        const dx = dir[0]
        const dy = dir[1]
    
        let x = posx + dx
        let y = posy + dy
    
        while (chessBoard.isInside(x,y)) {  //the condition will keep us inside the board
    
            moves.push({        //add the next possible position
                'x': x,
                'y': y
            })
            
            if (chessBoard.isEmpty(x,y)) { break } //break if we reach another piece
    
            x += dx         //increment in the desired direction
            y += dy         //increment in the desired direction
        }
        
    
        //console.log(moves);
        return moves
    },



    /**
     * display the moves on the board and add onClick events to the possible positions
     * 
     * @param {Array<Object>} moves -array contains the moves position x and y
     * @param {Strin} currPos -the current position of the piece
     * @param {String} piece -the type of the piece
     * @param {Boolean} clear -flag for clearing the displayed moves on the board, set to false if you want to add moves
     */
    displayMoves : function(moves ,currPos, piece, clear = true) {
        
        //console.log(moves);
        if (clear) {
            chessBoard.clearMoves()
        }
    
        for (const move of moves) {
    
            const pos = ".pos-" + String(move.y)+String(move.x)
    
            //console.log(pos);
    
            if ($(pos).attr('value')=='empty') {
    
                $(pos).addClass("mv")
    
            $(pos).on('click',function(e){       //this will add en event for the possible move, onClick -> movePiece to the clicked position
    
                let from = currPos
                let to = pos
        
                //console.log(1);
        
                chessBoard.movePiece('.'+from, to, piece)
        
            })
            //console.log($(pos).attr('value'),piece);
            } else if ($(pos).attr('value')[0]!=piece[0]) {
                
                $(pos).attr('value')
                $(pos).css({'background-color':"rgba(255, 0, 0, 0.200)"})
                $(pos).addClass("take")
                $(pos).off('click')
                $(pos).on('click',function(e){       //this will add en event for the possible move, onClick -> movePiece to the clicked position
    
                    let from = currPos
                    let to = pos
                    
                    const takenPiece = $(pos).attr('class').split(/\s+/)[1]
                    // console.log(takenPiece);
                    
                    chessBoard.displayTakenPiece(takenPiece,pos)
                    chessBoard.removePiece(pos,takenPiece)
                    $(pos).off('click') //----------------------------------------------
                    
                    chessBoard.movePiece('.'+from, to, piece)
            
                })

                //chessBoard.take(pos)
            }
                    
        }
    
    },
    

    // take : function(pos) {

    //     $(pos).css({'background-color':"rgba(255, 0, 0, 0.200)"})
    //     $(pos).addClass("take")

    //     $(pos).on('click',function(e) {
            

    //     })
        
        
    // },

    /**
     * check if the box should be dark colored
     * @param {Number} x -x coordinates of a position
     * @param {Number} y -y coordinates of a position
     * @returns **true** if the position should be dark
     */
    isDark : function(x,y) {
        return((x % 2 == 0 && y % 2 == 0)||(x % 2 == 1 && y % 2 == 1))
    },


    displayTakenPiece : function(takenPiece,pos) {
        //console.log(`<div class="taken ${takenPiece}"></div>`);
        const pieceType = $(pos).attr('value')
        // console.log(pieceType);
        if (pieceType == 'w') {
            $('#white-taken').append(`<div class="taken ${takenPiece}"></div>`)
        } else {
            $('#black-taken').append(`<div class="taken ${takenPiece}"></div>`)
        }
        
    }







    
}

export {chessPiecesMoves , chessBoard, game, Timer}






    
