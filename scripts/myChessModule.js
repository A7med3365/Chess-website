








/*
--------------------------moves object----------------------------------
*/

const chessPiecesMoves = {

    

    wp: function(pos) {

        let moves = []

        //console.log(pos);
        let [posx,posy] = chessBoard.getXY(pos)
        //console.log(typeof(x),x,y)

        moves.push({
            x:posx,
            y:posy+1
        })
        
        if ((posy == 2) && (!chessBoard.isEmpty(posx,posy+1))) {
            moves.push({
                x:posx,
                y:posy+2
            })
        }

        chessBoard.displayMoves(moves,pos,'wp');

    },

    bp: function(pos) {

        let moves = [];

        let [posx, posy] = chessBoard.getXY(pos);

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

        moves.push(...knightMoves);

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

        moves.push(...knightMoves);

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

        moves.push(...kingMoves);

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

        moves.push(...kingMoves);

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
        console.log(1);
        const takeMoves = $('.take')
        
        takeMoves.each(function(index) {
            let [x,y] = chessBoard.getXY($(this).attr('class').split(/\s+/)[0])
            if (chessBoard.isDark(x,y)) {
                $(this).css({'background-color':chessBoard.dark})
                // $(this).removeClass("take").toggleClass('dark')
            } else {
                $(this).css({'background-color':chessBoard.light})
                // $(this).removeClass("take").toggleClass('light')
            }
        })
        takeMoves.removeClass('take').off('click')

        
        chessBoard.addEventAll()
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
        
    
        // $('.mv').removeClass("mv").off('click') //clear the previous displayed moves

        chessBoard.clearMoves()

        chessBoard.removePiece(from,piece)
        chessBoard.addPiece(to,piece)

        chessBoard.addEvent(piece)
        
    },





    /**
     * this will add onClick event on all pieces of type *piece*, might add a position input to target one piece
     * 
     * @param {String} piece    - the class of the chess piece
     */
    addEvent : function(piece) {  


        $(`.${piece}`).on('click',function(e){
    
    
            const piece = e.target.classList[1]
            const pos = e.target.classList[0]
            //console.log(pos)
            //console.log(e.target.classList);
            chessPiecesMoves[piece](pos)
            
        })
    },



    /**
     * this will add onClick event on all pieces on the board
     */
    addEventAll : function() { 
    
        for (const piece of chessBoard.piecesTypes) {
            chessBoard.addEvent(piece)
        }
    },



    /**
     * clears the board of pieces
     */
    clearBoard : function() { 
    
        for (const piece of chessBoard.piecesTypes) {

            $(`.${piece}`).attr('value','empty')
            $(`.${piece}`).removeClass(piece)
            chessBoard.clearMoves()
            
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
        chessBoard.addEvent(piece)
        $(pos).attr('value',piece[0])
    },




    /**
     * initlizing the game, putting every piece in the starting position. only white for now
     * 
     */
    gameInit : function() { 
    
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

        chessBoard.addEventAll()
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
    
        while (x >= 1 && x <= 8 && y >= 1 && y <= 8) {  //the condition will keep us inside the board
    
            moves.push({        //add the next possible position
                'x': x,
                'y': y
            })
            
            if (chessBoard.isEmpty(x,y)) { break } //break if we reach another piece
    
            x += dx         //increment in the desired direction
            y += dy         //increment in the desired direction
        }
        
    
        console.log(moves);
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
        
        console.log(moves);
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
        
                console.log(1);
        
                chessBoard.movePiece('.'+from, to, piece)
        
            })

            } else if ($(pos).attr('value')[0]!=piece[0]) {
                
                $(pos).css({'background-color':"rgba(255, 0, 0, 0.200)"})
                $(pos).addClass("take")

                $(pos).on('click',function(e){       //this will add en event for the possible move, onClick -> movePiece to the clicked position
    
                    let from = currPos
                    let to = pos
                    
                    const takenPiece = $(pos).attr('class').split(/\s+/)[1]
                    console.log(takenPiece);
            
                    chessBoard.removePiece(pos,takenPiece)
                    $(pos).off('click') //----------------------------------------------
                    chessBoard.displayTakenPiece(takenPiece)
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

    isDark : function(x,y) {
        return((x % 2 == 0 && y % 2 == 0)||(x % 2 == 1 && y % 2 == 1))
    },


    displayTakenPiece : function(takenPiece) {
        
    }







    
}

export {chessPiecesMoves , chessBoard}






    
