const chessBoard = $('#chess-board')
console.log(chessBoard);
for (let i = 1; i <= 8; i++) {

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


    $('div.pos-23').addClass('wk')

