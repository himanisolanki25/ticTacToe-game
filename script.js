const boxes=document.querySelectorAll(".box")
const gameInfo=document.querySelector(".game-info")
const newGameBtn=document.querySelector(".btn")

// it will tell us whose turn is it
let currentPlayer;

// it will tell us the current status of the game i.e., whether the game is finished or should i give more chances to the players
let gameGrid;

// these are the winning positions of the game
const winPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// lets create a function for initialising the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    // UI pr bhi empty karna padega boxes ko
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        // box.classList.remove("win");
        // upar wale ki jagah ye bhi likh sakte h
        box.classList=`box box${index+1}`;
        // isse box purani css properties se initialise ho jayega
    })

    newGameBtn.classList.remove("active");   // this removes the active class and make the buttons display none
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else currentPlayer="X"

    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    // all 3 boxes should be non-empty and same in value
    winPositions.forEach((position)=>{
        if((gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="" ) && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){
            // check if winner is X
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else answer="O";

            //disable pointer events i.e., we dont want boxes to be clicked after the winner is announced
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            // now we know the winner and hence we will mark the background green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            gameInfo.innerText=`Winner is - ${answer}`;
            newGameBtn.classList.add("active");
        }
    })

    // lets check whether there is game tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
    })
    console.log(fillCount)

    // board is filled i.e., game is tie
    if(fillCount===9){
        gameInfo.innerText=`Game is TIED`;
        newGameBtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index]==""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        // gameGrid hamne apne liye banaya h to check whether someone wins or not or we still have to continue the same process

        boxes[index].style.pointerEvents="none";

        // swap karo turn ko
        swapTurn();

        // check koi jeet to nhi gya
        checkGameOver();
    }
}

// initialise the game by calling the function
initGame();

// passed index jisse pata chal sake kis box pr click hua h
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})
newGameBtn.addEventListener("click",()=>{
    initGame();
})