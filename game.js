// Iteration 1: Declare variables required for this game
let gameBody = document.getElementById('game-body')
let live = document.getElementById('lives')
var time = document.getElementById("timer").textContent
let zombieId = 0
let imageArray = [
    "assets/zombie-1.png",
    "assets/zombie-2.png",
    "assets/zombie-3.png",
    "assets/zombie-4.png",
    "assets/zombie-5.png",
    "assets/zombie-6.png",
  ];

// Iteration 1.2: Add shotgun sound
let shotSound = new Audio('./assets/shotgun.wav')
gameBody.onclick = () => {
    shotSound.pause()
    shotSound.currentTime = 0
    shotSound.play()
}

// Iteration 1.3: Add background sound
let bgSound = new Audio('./assets/bgm.mp3')
bgSound.play()
bgSound.loop = true

// Iteration 1.4: Add lives
let lives =  4

// Iteration 2: Write a function to make a zombie
function generateZombie(){
    let index = imageArray[getRandomInt(0, imageArray.length)]
    gameBody.innerHTML += `<img src = ${index} alt = '' id = ${zombieId} class = 'zombie-image' >`
    let zombie = document.getElementById(zombieId)
    zombie.style.transform = `translateX(${getRandomInt(20, 80)}vw)`
    zombie.style.animationDuration = `${getRandomInt(2, 8)}s`;
    zombie.onclick =() =>{
        zombieDestruct(zombie)
    }
}
// Iteration 3: Write a function to check if the player missed a zombie
function checkZombie(zombie){
    if(zombie.getBoundingClientRect().top <= 0){
        lives--;
        return true;
  }
  return false;
}
// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function zombieDestruct(zombie){    
    zombie.style.display = 'none'
    zombieId++ 
    generateZombie()

}
// Iteration 5: Creating timer
let timer = setInterval(() => {
    time--;
    document.getElementById("timer").textContent = time;
    let zombie = document.getElementById(zombieId)
    if(checkZombie(zombie)){
        zombieDestruct(zombie)
        if(lives == 0){
            clearInterval(timer)
            location.href = './game-over.html'
        }
    }
    if(time == 0){
        clearInterval(timer)
        location.href = './win.html'
    }
}, 1000);


// Iteration 6: Write a code to start the game by calling the first zombie
 generateZombie()

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min,max){
    min = Math.floor(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min;
}