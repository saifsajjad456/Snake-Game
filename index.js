let inputDir = {x:0,y:0};
const foodsound= new Audio("food.mp3");
const gameover = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 15;
let score=0;
let lastPaintTime=0;
let snakeArray=[{x:13,y:10}];
let food = {x:6,y:7};
let gameboard = document.getElementById('gameboard');
// let highscoreboard=document.getElementById("highscoreboard");
let highScore=localStorage.getItem("highScore");
if(highScore===null){
    hicore=0;
    localStorage.setItem("highScore",JSON.stringify(hicore));
 
    

}else{
    highScore=JSON.parse(highScore);
    highscoreboard.innerHTML="High Score:"+ highScore;

}




// Start background music
musicSound.loop = true;
musicSound.play();

const volUpBtn = document.getElementById('vol-up');
const volDownBtn = document.getElementById('vol-down');

volUpBtn.addEventListener('click', () => {
    musicSound.volume = Math.min(1, musicSound.volume + 0.1);
});

volDownBtn.addEventListener('click', () => {
    musicSound.volume = Math.max(0, musicSound.volume - 0.1);
});

//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}
function isCollide(snake){
  //if u touch the wall
  for(let i=1;i<snake.length;i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }}
   if(snake[0].x>=30 || snake[0].x<=0 || snake[0].y>=30 || snake[0].y<=0){
    return true;
  
   }
   return false;
    
}
function gameEngine(){
    //Update snake array & food array
    if(isCollide(snakeArray)){
        gameover.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press OK to Restart");
        snakeArray=[{x:13,y:10}];
        musicSound.play();
        score=0;
        

    }
    //if u ate the food,increment the score and regenerate the food
    if(snakeArray[0].x===food.x && snakeArray[0].y===food.y){
        foodsound.play();
        score+=1;
        if(score>highScore){
            highScore=score;
            localStorage.setItem("highScore",JSON.stringify(highScore));
            highscoreboard.innerHTML="High Score:"+ highScore;
        }
        scoreBoard.innerHTML= "Score:" + score;
        snakeArray.unshift({x:snakeArray[0].x+inputDir.x,y:snakeArray[0].y+inputDir.y});
        let a=1;
        let b=30;
        food = {x:1+Math.round(a +(b-a)*Math.random()),y:1+Math.round(a +(b-a)*Math.random())}
    }
    //move snake
    for(let i=snakeArray.length-2;i>=0;i--){
        
        snakeArray[i+1]={...snakeArray[i]};
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;
    

    //Display snake 
    gameboard.innerHTML="";
    snakeArray.forEach((e, index)=>{
        let snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }else{
        snakeElement.classList.add('snake');}
        gameboard.appendChild(snakeElement);

    });
    //Display the food
    let foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    gameboard.appendChild(foodElement);

}





  //Main Logic Starts here
  window.requestAnimationFrame(main);
  window.addEventListener('keydown',e =>{
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir = {x:0,y:-1};
            break;
        case "ArrowDown":
            inputDir = {x:0,y:1};
            break;
        case "ArrowLeft":
            inputDir = {x:-1,y:0};
            break;
        case "ArrowRight":
            inputDir = {x:1,y:0};
            break;
        default:
            break;

    }
  });