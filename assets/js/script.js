// first listener, is code that will be executed when the page has finished loading
// second kind islistening to the button clicks 

document.addEventListener("DOMContentLoaded", function() {
    let buttons = this.getElementsByTagName("button");

    for (let button of buttons) {
            button.addEventListener('click', function(){
                if (this.getAttribute("data-type") === "submit") {
                    checkAnswer();
                } else {
                    let gameType = this.getAttribute("data-type");
                    runGame(gameType);
                }

            })
    }

    runGame("addition");

})

/** 
 * The main "loop", called when the script is first loaded
 * and after the user's answer has been processed
 * */
function runGame(gameType) {
   
    //Assign random numbers between 1 and 25 
    let num1 = Math.ceil(Math.random()*25);
    let num2 = Math.ceil(Math.random()*25);

    if (gameType === "addition") {
        displayAdditionQuestion(num1,num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1,num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1,num2);
    } else {
        displayDivisionQuestion(num1,num2);
    }
}

/**
 * Checks the answer against the first element
 * in the returnedCalculatedAnswer array 
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert(`Hey! You got it right! :D`);
        incrementScore();
    } else {
        alert(`Awwww... you answered ${userAnswer}, but right answer is ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (numbers) and the operators (+, -, etc.)
 * directly from the DOM and returns the correct value
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else {
        return [operand1 / operand2, "division"];
    }
}

/**
 * Get the current score from DOM and increment it by 1
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Get the current 'incorrect' value from DOM and increment it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
   
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(operand1, operand2) {
   
    let multiplier = Math.ceil(Math.random()*10);
    document.getElementById('operand1').textContent = operand2 * multiplier;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '/';
}