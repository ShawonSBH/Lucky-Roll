let score = 0;
let attempt = 0;
let circleHTML = `<div class="circle"></div>`;
let target = 0;
let maxAttempt = 0;
let level = 0;

const modifyInnerHTML = ( (className, stringHTML, value) => {
    document.querySelector(className).innerHTML = stringHTML + value;
})

const randomGenerator = ( (minLimit,maxLimit) => {
    let diff = maxLimit-minLimit;
    return (Math.floor(Math.random()*diff))+minLimit;
});

function gameStart() {
    console.log(level);
    target = randomGenerator(25,50);
    maxAttempt = randomGenerator(0,25);
    if(maxAttempt === 0 ) {
        setTimeout( () => {
            alert(`Better Luck Next Time`);
        }, 1000);
        gameStart();
    }
    score = 0;
    attempt = 0;
    modifyInnerHTML(".level-shower", `Level: `, level);
    modifyInnerHTML(".target", `Target: `, target);
    modifyInnerHTML(".max-attempt-shower", `Max Attempt: `, maxAttempt);
    document.querySelector(".score-circle-grid").innerHTML = "";
    modifyInnerHTML(".score", `Score: `, score);
    modifyInnerHTML(".attempt-counter", `Attempts: `, attempt);
    modifyInnerHTML(".roll-result", `You rolled: `, "");
}

function clickPlay() {
    let roll = randomGenerator(1,5);
    if(score+roll <= target) score += roll;
    else roll = 0;
    attempt++;
    if(roll) modifyInnerHTML(".roll-result", `You rolled: `, roll);
    else modifyInnerHTML(".roll-result", `You rolled: `, "more than Target");
    modifyInnerHTML(".score", `Score: `, score);
    modifyInnerHTML(".attempt-counter", `Attempts: `, attempt);
    for ( let i = 0; i < roll; i++ ) {
        document.querySelector(".score-circle-grid").innerHTML += circleHTML;
    }
    if(score === target || maxAttempt === attempt) {
        setTimeout( () => {
            validate();
        }, 500);
    } else {
        validate();
    }

}

function validate() {
    if(score === target) {
        alert(`Yay! Congratulate on getting to Level ${++level}`);
        gameStart();
    } 
    else {
        if(maxAttempt <= attempt)  {
            alert(`Better Luck Next Time`);
            gameStart();
        }
    }
}