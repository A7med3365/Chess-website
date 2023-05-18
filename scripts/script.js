

/*
--------------------------Functions----------------------------------
*/

function gameInit() {
    
    for (let i = 1; i <= 8; i++) { $(`.pos-7${i}`).addClass('wp') }
    $(`.pos-11`).addClass('wr')
    $(`.pos-18`).addClass('wr')
    $(`.pos-12`).addClass('wn')
    $(`.pos-17`).addClass('wn')
    $(`.pos-13`).addClass('wb')
    $(`.pos-16`).addClass('wb')
    $(`.pos-14`).addClass('wq')
    $(`.pos-15`).addClass('wk')
}

function removePiece(pos,piece) {
    console.log(2);
    $(`.${pos}`).removeClass(piece)
    console.log($(pos));
}

function addPiece(pos,piece) {
    console.log(3);
    $(`.${pos}`).addClass(piece)
}

function movePiece(from, to, piece){
    console.log(1);
    removePiece(from,piece)
    addPiece(to,piece)
}






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
        
        $(`.pos-${i}${j}`).on('click',function(){

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



    
}


/*
--------------------------expermints----------------------------------
*/

    $('div.pos-23').addClass('wp')
    $('div.pos-24').addClass('wp')

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
