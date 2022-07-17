
const grids = Array.from($('.grid')); 
const displayPlayer = $('.playerX') ;
const reset = $('#reset'); 
const resetScore = $('#resetScore');
const display = $('.display'); 
const whoWins = $('.whoWins');

let choices = ['','','','','','','','','']; 
let currentPlayer = 'X';
let gameActive = true;

let playerXScore = 0;
let playerOScore = 0;

const xWin = 'X';
const oWin = 'O';
const tie = 'tie';

const winChoice = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// start the game
const userAction = (grid, index) => {
    if(validGrid(grid) && gameActive) {
        grid.innerText = currentPlayer;
        $(grid).addClass(`player${currentPlayer}`);
    }
    updateGrid(index);
    checkResult();
    changePlayer();
};

//pick a box
grids.forEach( (grid, index) => {
    $(grid).on('click', () => userAction(grid, index));
});

// check if its valid as in you can not overwrite the box
const validGrid = (grid) => {
    if(grid.innerText === 'X' || grid.innerText === 'O') {
        return false;
    }
    return true;
}

//update the box
const updateGrid = (index) => {
    choices[index] = currentPlayer;
}

//players next turn
const changePlayer = () => {
    displayPlayer.removeClass(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayPlayer.text(currentPlayer);
    displayPlayer.addClass(`player${currentPlayer}`);
};

//check if there's a winner
const checkResult = function () {
    let winRound = false;
    for(let i = 0; i <= 7; i++) {
        const win = winChoice[i];
        const a = choices[win[0]];
        const b = choices[win[1]];
        const c = choices[win[2]];
        if (a ==='' || b ==='' || c ==='') {
            continue; // skip the iteration loop
        }
        if (a === b && b === c) {
            winRound = true;
            break; //break the loop
        } 
    }
    if(winRound) {
        displayWin(currentPlayer === 'X' ? xWin : oWin);
        gameActive = false;
        return;
    }

}

//display a winner
const displayWin = (type) => {
    switch(type){
        case xWin:
            $(whoWins).text(`Player X Wins`);
            playerXScore++; // add scores for X
            $('.Xscore').text(playerXScore)
            break;
        case oWin:
            $(whoWins).text(`Player O Wins`);
            playerOScore++; // add scores for O
            $('.Oscore').text(playerOScore)
            break;
        case tie:
            $(whoWins).text(`Tie!`);
    }
    whoWins.removeClass('hide');
    whoWins.addClass('show');
}

//restart the game
const resetBoard = () => {

    choices = ['','','','','','','','','']; 
    gameActive = true;
    whoWins.addClass('hide')

    if(currentPlayer === 'O') {
        changePlayer();
    }

    grids.forEach(grids => {
        grids.innerText = '';
        $('.grid').removeClass('playerX')
        $('.grid').removeClass('playerO')
    });
}

//restart buttons
$(reset).on('click',resetBoard) 

$(resetScore).click(function() {
    resetBoard()
    playerXScore = 0;
    $('.Xscore').text(playerXScore)
    playerOScore = 0;
    $('.Oscore').text(playerOScore)
})