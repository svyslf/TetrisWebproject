//board dimensions 
const height = 20; 
const width = 10;

//this creates the 2d array of empty strings 
let tetrisgrid = new Array(height);
for (var i=0; i< height; i++) {
    tetrisgrid[i]= new Array(width).fill(" ");
}


const tetrisdiv = document.querySelector('.tetris-bg'); //get the main div where the game will be played
var startbutton = document.getElementById("start"); //start button 

//game control boolean 
var playAllowed= true; 

//Score 
var score = 0
var scoreVal = document.getElementById("score");
function addScore() {
    score+=1;
    scoreVal.innerHTML = parseInt(scoreVal.innerHTML,10)+1;
}

//leaderboard table
var leaderBoard = document.getElementById("leadTable");
var centerpiece; 
var except;



document.addEventListener('keydown', controlPiece);

function controlPiece(event) {
    
        var blockToMove = document.querySelector('div .currentBlockDiv');
        if(blockToMove !== null){
            var children = blockToMove.childNodes;
        
            if(event.keyCode == 39) {
                //rightkey
                if(canMove() && currentBlock[3][0] < 9 && currentBlock[2][0]< 9 && currentBlock[1][0] < 9 && currentBlock[0][0] < 9){
                    for(var c=0; c < children.length; c++){ 
                        
                        currentBlock[c][0]+=1
                        children[c].style.transform=`translate(${currentBlock[c][0]*30}px,${currentBlock[c][1]*30}px)`;  
                    }
                }     
            }
            else if(event.keyCode == 37) {
            // leftPressed
                if(canMove() && currentBlock[0][0] > 0 && currentBlock[1][0] > 0 && currentBlock[2][0] > 0 && currentBlock[3][0] > 0){
                    for(var c=0; c < children.length; c++){ 

                        currentBlock[c][0]-=1
                        children[c].style.transform=`translate(${currentBlock[c][0]*30}px,${currentBlock[c][1]*30}px)`;  
                    }   
                }
            }
            if(event.keyCode == 40) {
            //downPressed
                if(canFall()) {
                    for(var c=0; c < children.length; c++){    
                        currentBlock[c][1]+=1; 
                        children[c].style.transform=`translate(${currentBlock[c][0]*30}px,${currentBlock[c][1]*30}px)`;
                    }
                }
            }
            else if(event.keyCode == 38) {
                //up key for rotation 
                if(currentBlockId !== "O"){
                    console.log(currentBlock) 
                        switch(currentBlockId){
                            case "I": 
                                centerpiece = currentBlock[1]
                                except = 1
                                break;
                            case "L":
                                centerpiece = currentBlock[1]
                                except = 1
                                break;
                            case "S":
                                centerpiece = currentBlock[2]
                                except = 2
                                break;
                            case "T": 
                                centerpiece = currentBlock[2];
                                except = 2
                                break;
                            case "Z":
                                centerpiece = currentBlock[2];
                                except = 2;
                                break;
                        }
                        if(canRotatedMove()){
                            for(var c= 0; c < children.length; c++){
                                if(c !== except){
                                    currentBlock[c][0] -= centerpiece[0];
                                    currentBlock[c][1] -= centerpiece[1];
                                    var temp = currentBlock[c][0];
                                    currentBlock[c][0] = currentBlock[c][1];
                                    currentBlock[c][1] = -temp;
                                    
                                    currentBlock[c][0] +=centerpiece[0];
                                    currentBlock[c][1] += centerpiece[1];

                                }
                            }
                            console.log(currentBlock)
                        }
                    
                        console.log(currentBlock)             
                    }
                }
            if(event.keyCode == 32){
                //spacebar
                while(canFall()){
                    for(var c=0; c < children.length; c++){    
                        currentBlock[c][1]+=1; 
                        children[c].style.transform=`translate(${currentBlock[c][0]*30}px,${currentBlock[c][1]*30}px)`;
                    }
                }
            }
        }
}




function setId() {
    //gamepiece associative array
    var gamepieces = {                      
        'L' :  [ [1,1],[1,2],[1,3],[2,3] ],
        'Z' :  [ [1,1],[2,1],[2,2],[3,2] ],
        'S' :  [ [1,2],[2,1],[2,2],[3,1] ],
        "T" :  [ [1,1],[2,1],[2,2],[3,1] ],
        "O" :  [ [1,1],[1,2],[2,1],[2,2] ],
        "I" :  [ [1,1],[1,2],[1,3],[1,4] ]
    };

    //select random Game piece object from gamepieces assoc array and assign it to currentblock var
    var keys = Object.keys(gamepieces);
 
    currentBlock = gamepieces[keys[Math.floor(Math.random()*keys.length)]];
    currentBlockId = keys.find(key => gamepieces[key] === currentBlock);
    
    for(var c=0; c < currentBlock.length; c++){
        if(tetrisgrid[currentBlock[c][1]-1][currentBlock[c][0]] === "set"){
            gameOver()
        }
    }
}



function gameOver(){
    playAllowed = false;
    
    startbutton.style.display="";
    startbutton.innerText="Try Again!"
    sendForm();
}

function sendForm() {
    var form = document.createElement("form");
    var scoreToSend = document.createElement("input");
    form.method = "POST";
    form.action = "leaderboard.php"
    scoreToSend.value= score;
    scoreToSend.name = "score";
    form.appendChild(scoreToSend);
    document.body.appendChild(form);

    form.submit();
}

function createBlock(id, color, x, y, passedDiv) {
    var block = document.createElement('div');
   
        block.setAttribute("id", `${id}`);
        block.style.backgroundColor=color; 
        block.style.transform=`translate(${30*x}px, ${30*y}px)`;
        passedDiv.appendChild(block);
        tetrisdiv.appendChild(passedDiv);   
}

function createTetromino() {
    setId()
   
    if(playAllowed){
        addScore();
        currentBlockdiv = document.createElement('div');
        currentBlockdiv.setAttribute("class", "currentBlockDiv");
            for(var c=0; c < currentBlock.length; c++){
                switch(currentBlockId){
                    case "I":
                        createBlock("I", "#7FDBFF", [currentBlock[c][0]], [currentBlock[c][1]],currentBlockdiv );
                        break;
                    case "O":
                        createBlock("O", "#FFDC00", [currentBlock[c][0]], [currentBlock[c][1]], currentBlockdiv);
                        break;
                    case "T":
                        createBlock("T", "#B10DC9", [currentBlock[c][0]], [currentBlock[c][1]], currentBlockdiv);
                        break;
                    case "S":
                        createBlock("S", "#2ECC40", [currentBlock[c][0]], [currentBlock[c][1]],currentBlockdiv);
                        break;
                    case "Z":
                        createBlock("Z", "#FF4136", [currentBlock[c][0]], [currentBlock[c][1]], currentBlockdiv);
                        break;
                    case "L":
                        createBlock("L", "#FF851B", [currentBlock[c][0]], [currentBlock[c][1]], currentBlockdiv);
                        break;
                }
            }
        fall = setInterval(drop, 1000);
    }

}


function drop() {
    
    if(canFall()) {
        var blockToMove = document.querySelector('div .currentBlockDiv');
        var children = blockToMove.childNodes;
        for(var c=0; c < children.length; c++){     
            tetrisgrid[currentBlock[c][1]][currentBlock[c][0]]=" ";
            currentBlock[c][1]+=1; 
            children[c].style.transform=`translate(${currentBlock[c][0]*30}px,${currentBlock[c][1]*30}px)`;
        }
        
    } else {
        const children = currentBlockdiv.children;
        for(var c=0; c < currentBlock.length; c++){
            tetrisgrid[currentBlock[c][1]][currentBlock[c][0]]="set"; //set id at position of collision
            for(var i = 0; i < children.length; i++){
                children[i].classList.add(`_${currentBlock[i][1]}${currentBlock[i][0]}`);
            }
           
        }
        
        checkForCompleteRow(); //call once to check 
        clearInterval(fall);
        createTetromino();
        console.table(tetrisgrid);
       
    }
    
}

function canFall() {
    for(var c=0; c < currentBlock.length; c++){
        if(currentBlock[c][1]===19 || tetrisgrid[currentBlock[c][1]+1][currentBlock[c][0]] === "set"){
            currentBlockdiv.setAttribute("class", `block`);
            return false;
       }
    }
    return true;
}


function canMove() {
    for(var c=0; c < currentBlock.length; c++){

        if(tetrisgrid[currentBlock[c][1]][currentBlock[c][0]+1] === "set"){
            return false;
        }
        if(tetrisgrid[currentBlock[c][1]][currentBlock[c][0]-1] === "set"){
            return false;
        }
    }
    return true;
}

function canRotatedMove(){
    //check rotated coords collision 
    var newCoords = [[,], [,], [,], [,]];
    for(var c= 0; c < currentBlock.length; c++){
        newCoords[c] = [...currentBlock[c]];
        if(c !== except){
            newCoords[c][0] -= centerpiece[0];
            newCoords[c][1] -= centerpiece[1];

            var temp = newCoords[c][0];
            newCoords[c][0] = newCoords[c][1];
            newCoords[c][1] = -temp;
            
            newCoords[c][0] +=centerpiece[0];
            newCoords[c][1] += centerpiece[1];

        }
        if(newCoords[3][0] > 9 || newCoords[2][0]> 9 || newCoords[1][0] > 9 || newCoords[0][0] >9){
            return false;
        }
        else if(newCoords[3][0] < 0 || newCoords[2][0]< 0 || newCoords[1][0] < 0 || newCoords[0][0] < 0){
            return false;
        }
        if(newCoords[c][1]===19 || tetrisgrid[newCoords[c][1]+1][newCoords[c][0]] === "set") {
         
            return false;
        }
        if(tetrisgrid[newCoords[c][1]][newCoords[c][0]+1] === "set"){
            
            return false;
        }
        if(tetrisgrid[newCoords[c][1]][newCoords[c][0]-1] === "set"){

            return false;
        }
    
    }
    console.log(newCoords);
    return true;
}


function checkForCompleteRow() {
    const isSet = (space) => space !== " "; 
    for(var y= 0; y < tetrisgrid.length; y++){
        while(tetrisgrid[y].every(isSet)){//if row full, delete blocks in it
            reset(y); //resets the 2d array 
            removeRow(y); //removes all blocks from the full line 
            adjustBlocks(y-1); //moves the rest of the blocks down 
        }
    }
}


function removeRow(y){
    for(var x= 0; x < tetrisgrid[y].length; x++){
        var blocksToRemove = document.querySelectorAll(`._${y}${x}`);
        blocksToRemove.forEach(block => {
            block.remove(); //remove blocks from full row 
        })
    }
}


function adjustBlocks(index) {
    for(index; index > 1; index--){
        for(i =0; i < 10; i++){
            //get all blocks starting from the Y coord of the line before the removed line
            var blocksToAdjust = document.querySelectorAll(`._${index}${i}`); 

            blocksToAdjust.forEach(block => {
                block.style.animation = "flash 1s";   
                block.style.transform=`translate(${i*30}px,${(index+1)*30}px)`; //move down by one 
                block.classList.remove(`_${(index)}${i}`); //remove old coordinates from block
                block.classList.add(`_${(index+1)}${i}`); // add new coordinates to block
            })
        }
    }
   
}




function reset(index) {
    for(index; index > 1; index--){
        tetrisgrid[index].splice(0, tetrisgrid[index].length, ...tetrisgrid[index-1]); //copy prev array onto removed index in grid
    }
}

function clearBoard() {
    if (!playAllowed) {
        //clear the board and allow restart after 
        while(tetrisdiv.firstChild) tetrisdiv.removeChild(tetrisdiv.firstChild);
        for(var y= 0; y < tetrisgrid.length; y++){
            for(var x= 0; x < tetrisgrid[y].length; x++){
                tetrisgrid[y][x] = " ";
            }
        }
        playAllowed = true;
    } 
    createTetromino();
    
}



function startgame() { 
    
    clearBoard()
    startbutton.style.display="none";
    var backMusic = new Audio("audio/Aviva.mp3"); // to play audio 
    backMusic.play();   
    backMusic.loop = true; 
    

}