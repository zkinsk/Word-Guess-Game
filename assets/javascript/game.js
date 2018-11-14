/////VARIABLES!!!!!!///////
var bobWords = ["FAN BRUSH", "HAPPY LITTLE TREES", "EVERYONE NEEDS A FRIEND", "BOB ROSS", "TWO INCH BRUSH", "HAPPY LITTLE CLOUDS", "PRE-STRETCHED CANVAS", 
                "PEA POD", "SAP GREEN", "ROLL OF PAINT", "NEED THE DARK TO SHOW THE LIGHT", "CARROT NOISE", "HAPPY ACCIDENTS", "HAPPY PAINTINGS", "LITTLE FOOTY HILLS", 
                "YOUR WORLD", "BIG OLD MOUNTAIN" ];

var userGuesses = []; //stores the players guesses
var guessLeft = 6; //number of guesses the player starts with
var currentWord = []; //function CurrentWordInitial Populates it with blank spaces base on length of guess word array
var losses = 0;
var wins = 0;
var gameOn = false;

///START EVERYTHING!!!!/////

startGame();

//FUNCTIONS!!!!////////////

function startGame(){
    document.getElementById("spaceBar").innerHTML = "Press Space Bar To BEGIN!";
    currentWordInitial();
    document.onkeyup = function(event){
        if (event.keyCode === 32){ //tests for spacebar to be pressed
            document.getElementById("spaceBar").innerHTML = "Start Guessing!"; //after spacebar is pressed, game on!
            playGame();
        }
    }
};

function currentWordInitial () { 

    if (gameOn === true) {
        document.getElementById("spaceBar").innerHTML = "Press any letter to guess again.";
    }
    currentWord=[]; //clears current word array
    userGuesses = []; //clears guess letter array
    guessLeft = 6; //re-sets remaining guesses
    // bandNum = (Math.floor(Math.random() * bobWords.length));
    bWordString = bobWords[(Math.floor(Math.random() * bobWords.length))]; //randomly picks which word to guess
    bWordArr = bWordString.split(""); //converts picked word to array
    for ( let i = 0; i < (bWordArr.length); i++ ){ //fills guessing word with blanks
        currentWord.push (" _ ");
    }
    // document.getElementById("currentWord1").innerHTML = currentWord.join(" "); //automatically fills in dashes in guess blanks
    for ( i = 0; i < (bWordArr.length) ; i++ ){
        if ("-" === bWordArr[i]){
            currentWord[i] = "-";
        }
    };
    for ( i = 0; i < (bWordArr.length) ; i++ ){
        if (" " === bWordArr[i]){
            currentWord[i] = "&nbsp";
        }
    };
    document.getElementById("wins").innerHTML = wins; //writes wins to HTML page
    document.getElementById("losses").innerHTML = losses; //writes losses to HTML page
    document.getElementById("currentWord1").innerHTML = currentWord.join(" "); //writes out blanks on HTML page
    document.getElementById("lettersChosen").innerHTML = userGuesses.join(" ");//clears guessed letters on HTML page
    document.getElementById("gLeft").innerHTML = guessLeft; //re-starts guesses count down on HTML page
};





// document.getElementById("currentWord1").innerHTML = currentWord.join(" ");

function reStartGame(){
    gameOn = true;
    currentWordInitial();
    playGame();
};

function solvePart(cL){ //adds the correct letter into the matching lines in the guess word

    for ( i = 0; i < (bWordArr.length) ; i++ ){ //runs a loop for comparing guessed letter to word array
        if (cL === bWordArr[i]){ //finding matching guess to word
            currentWord[i] = cL; //adding guess letter to guess array
        }
    }
    document.getElementById("currentWord1").innerHTML = currentWord.join(" "); //updating array in HTML
}
//ADDS LETTER TO GUESS LETTER LINE
function addLetter(gL){  
    userGuesses.push(gL);
    document.getElementById("lettersChosen").innerHTML = userGuesses.join(" ");
};

//SHOW WINNING DIALOGE AND PICTURES
function youWin() {
    document.onkeyup = function (e) {
        e.preventDefault();		
      }
    document.getElementById("spaceBar").innerHTML = "YOU WIN!!!!"
    // setTimeout(function(){ alert("You Win"); }, 300);
    wins ++;
    document.getElementById("wins").innerHTML = wins;
    setTimeout(function(){ reStartGame(); }, 2000); //delays re-starting the game so we can see our letter choice and the final word
};

//YOU LOSE -  Shows complete word and re-starts game
function youLose() {
    document.onkeyup = function (e) {
        e.preventDefault();		
      }
    document.getElementById("spaceBar").innerHTML = "You Lose!";
    losses ++;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("currentWord1").innerHTML = bWordString;
     setTimeout(function(){ reStartGame(); }, 3000); //delays re-starting the game for a short while //updating array in HTML

}

function playGame(){  
    // document.getElementById("spaceBar").innerHTML = "Start Guessing!";
    document.onkeyup = function(event)  {  
        document.getElementById("spaceBar").innerHTML = "Keep Guessing!";
        let userGuess = event.key.toUpperCase(); //converts guessed letter to upper case
        let x = userGuesses.indexOf(userGuess) //compares guessed letter to guessed letter array
        if (event.keyCode < 65 || event.keyCode > 90){//checks to see if player entered a letter
            // alert("Pick a letter!");
            document.getElementById("spaceBar").innerHTML = "PICK A LETTER!"
        
        }
        else{
                //checks to see if the players guess has been used before and if it matches a letter in the chosen word
            if ( x === -1 && bWordArr.indexOf(userGuess) !== -1 ) {
                addLetter(userGuess); //re-prints the array of chosen letters
                solvePart(userGuess); //runs function to add correct letter to guessed word
            
            }else if ( x === -1 ){
                addLetter(userGuess); //re-prints the array of chosen letters
                guessLeft --; //subtracts a guess
                document.getElementById("gLeft").innerHTML = guessLeft; //udates guesses left HTML
            
            }else {
                // alert ("you have already chosen that letter");
                document.getElementById("spaceBar").innerHTML = "You have already chosen that letter! Try again!" //I need to change this to a modal or something
            };
        };

        if (currentWord.indexOf (" _ ") === -1) {
            youWin();
        }else if (guessLeft <= 0){

            // setTimeout(function(){ youLose(); }, 300);
            youLose()
            
        };


    };
};

