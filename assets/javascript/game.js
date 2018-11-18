/////VARIABLES!!!!!!///////
var bobWords = ["FAN BRUSH", "HAPPY LITTLE TREES", "EVERYONE NEEDS A FRIEND", "BOB ROSS", "TWO INCH BRUSH", "HAPPY LITTLE CLOUDS", "PRE-STRETCHED CANVAS", 
                "PEA POD", "SAP GREEN", "ROLL OF PAINT", "NEED THE DARK TO SHOW THE LIGHT", "CARROT NOISE", "HAPPY ACCIDENTS", "HAPPY PAINTINGS", "LITTLE FOOTY HILLS", 
                "THIS IS YOUR WORLD", "BIG OLD MOUNTAIN", "LETS GET CRAZY", "PRACTICE", "BELIEVE HERE", "YOU CAN DO IT", "NO LIMITS HERE", "YOU CAN DO IT", "THINK LIKE WATER",
                "FREEDOM ON THE CANVAS", "EVERY DAY IS A GOOD DAY WHEN YOU PAINT" ];
var winImages = ["ls-1", "ls-2", "ls-3", "ls-4", "ls-5", "ls-6", "ls-7", "ls-8", "ls-9", "bob-sparkle"]
var winSounds = ["Anything-Make-You-Happy.m4a", "Enjoy-my-life.m4a", "Enjoy-What-You-Do.m4a", "Feel-Good.m4a", "happy-person.m4a", "needs-friend.m4a", "painting-happy.m4a", "sparkling-shiny.m4a"]
var userGuesses = []; //stores the players guesses
var guessLeft; //number of guesses the player starts with
var currentWord = []; //function CurrentWordInitial Populates it with blank spaces base on length of guess word array
var losses = 0;
var wins = 0;
var gameOn = false;
var bWordString;
var bWordArr = [];
var bWordPriorIndex = [];
var bWordIndex;
var startAudio = new Audio("assets/sounds/If this is your first time with us....mp3");
var remixAudio = new Audio("Bob Ross Remixed  Happy Little Clouds  PBS Digital Studios.m4a");
var loseAudio = new Audio("assets/sounds/We dont make mistakes here....mp3");
var winAudio;
// winAudio.addEventListener ("ended", alert("sound has ended!"));
var reStartAudio = new Audio("assets/sounds/I tell you what lets have one more.mp3");


//FUNCTIONS!!!!////////////
function playRemix(){
    remixAudio.play();

}
function pauseRemix(){
    remixAudio.pause();
}
function startGame(){
    document.getElementById("gameArea").style.opacity = "0";
    // document.getElementById("bobFloat").innerHTML = "PRESS SPACEBAR TO BEGIN!";
    // document.getElementById("gameArea").style.display = "none";
    // document.getElementById("spaceBar").innerHTML = "Press Space Bar To BEGIN!";
    currentWordInitial();
    document.onkeyup = function(event){
        if (event.keyCode === 32){ //tests for spacebar to be pressed
            startAudio.play();
            document.getElementById("spaceBar").innerHTML = "Start Guessing!"; //after spacebar is pressed, game on!
            playGame();
            // document.getElementById("bobFloat").innerHTML = "Bob Ross Word Guess!";
            document.getElementById("bobImg").style.height="350px";
            // document.getElementById("gameArea").style.display = "block";
            document.getElementById("gameArea").style.opacity = "1";
            document.getElementById("bobFloat").style.position = "absolute";
            document.getElementById("bobFloat").style.color = "white";
            document.getElementById("bobFloat").style.background = "black";
            document.getElementById("bobFloat").style.mixBlendMode = "darken";
            // document.getElementById("bobFloat").style.width = "471px";
            document.getElementById("bobRoss").style.opacity = "1";
            document.getElementById("bobRoss").style.height = "auto";
            document.getElementById("bobRoss").style.width = "auto";
            document.getElementById("bobRoss").style.fontSize = "50%";

            document.getElementById("spaceBarPress").style.display = "none";
            // document.getElementById("spaceBarPress").style.width = "0";
            // document.getElementById("spaceBarPress").style.height = "0";
        }
    }
};


function currentWordInitial () { 
    //checks to see if all the words have been used and if so, re-sets the already chosen word array
    if (bWordPriorIndex.length >= bobWords.length) {
        bWordPriorIndex=[];
    };
    currentWord=[]; //clears current word array
    userGuesses = []; //clears guess letter array
    guessLeft = 6; //re-sets remaining guesses
    //checks to see if a word from the array has already been chosen and if so chooses another
    for (let k = 0; k < bobWords.length; k++){
        bWordIndex = (Math.floor(Math.random() * bobWords.length))
        if ( bWordPriorIndex.includes(bWordIndex) === false ) {
            break;
        }
    };
    bWordPriorIndex.push (bWordIndex);// pushes the current index number into the already chosen word array
    bWordString = bobWords[bWordIndex]; //pulls the indexed word from the array
    bWordArr = bWordString.split(""); //converts picked word string to array
    //fills guessing word with blanks
    for ( let i = 0; i < (bWordArr.length); i++ ){ 
        currentWord.push (" _ ");
    };
    //adds a hyphen for the word that has a hyphen
    for ( let i = 0; i < (bWordArr.length) ; i++ ){
        if ("-" === bWordArr[i]){
            currentWord[i] = "-";
        }
    };
    //adds spaces for the phrases that contain more than one word
    for ( let i = 0; i < (bWordArr.length) ; i++ ){
        if (" " === bWordArr[i]){
            currentWord[i] = "&nbsp";
        }
    };
    document.getElementById("wins").innerHTML = wins; //writes wins to HTML page
    document.getElementById("losses").innerHTML = losses; //writes losses to HTML page
    document.getElementById("currentWord1").innerHTML = currentWord.join(" "); //writes out blanks on HTML page
    document.getElementById("lettersChosen").innerHTML = userGuesses.join(" ");//clears guessed letters on HTML page
    document.getElementById("gLeft").innerHTML = guessLeft; //re-starts guesses count down on HTML page
    if (gameOn === true) {
        document.getElementById("spaceBar").innerHTML = "Press any letter to guess again.";
        playGame();
    }
};

//restarts the game after a word has been completed or missed
function reStartGame(){
    gameOn = true;
    dimBob(1);
    currentWordInitial();
    reStartAudio.play();
    document.getElementById("gameImage").src="#";
    document.getElementById("gameImage").style.opacity="0";
    document.getElementById("gameImage").style.visiblity = "hidden";
    document.getElementById("gameStats").style.opacity = "1";
    document.getElementById("currentWord1").style.color = "rgb(235, 116, 5)";
    document.getElementById("currentWord1").style.fontSize = "18px";

};

//adds the correct letter into the matching lines in the guess word
function solvePart(cL){ 
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
    dimBob(0);
    document.getElementById("currentWord1").innerHTML = bWordString;
    document.getElementById("currentWord1").style.color = "red";
    document.getElementById("currentWord1").style.fontSize = "200%";
    document.getElementById("gameStats").style.opacity = "0";
    document.getElementById("gameStats").style.transition = "all 0.1s";
    document.getElementById("gameImage").style.visibility="visible";
    document.getElementById("gameImage").style.opacity="1";
    let w = (Math.floor(Math.random() * winImages.length));
    document.getElementById("gameImage").src="assets/images/" + winImages[w] + ".jpg";
    let wa = (Math.floor(Math.random() * winSounds.length));
    var winAudio = new Audio("assets/sounds/" + winSounds[wa]);
    winAudio.play();
    winAudio.onended = function (){
        setTimeout(function(){ reStartGame(); }, 500); //delays re-starting the game so we can see our letter choice and the final word
    };
    document.getElementById("spaceBar").innerHTML = "YOU WIN!!!!";
    wins ++;
    document.getElementById("wins").innerHTML = wins;
    // setTimeout(function(){ reStartGame(); }, 4000); //delays re-starting the game so we can see our letter choice and the final word
};

//function to dim bobs picture on missed guesses and to bring him back on re-start
function dimBob (bL){
    var element = document.getElementById('bobImg');
    element.style.opacity = bL;
    element.style.filter  = "alpha(opacity=" + bL + ")";
    element.style.transition = "opacity 0.75s";
};

//YOU LOSE -  Shows complete word and re-starts game
function youLose() {
    document.onkeyup = function (e) {
        e.preventDefault();		
      };
    // getElementById("gameImage").src="assets/images/sad_tree.jpg";
    document.getElementById("gameImage").style.visibility="visible";
    document.getElementById("gameImage").style.opacity="1";
    document.getElementById("gameImage").src="assets/images/sad_tree.jpg";
    document.getElementById("gameStats").style.opacity = "0";
    document.getElementById("gameStats").style.transition = "all 0.1s";
    // document.getElementById("gameStats").style.visibility = "hidden";

    // getElementById("gameImage").height = "200px";
    
    loseAudio.play();
    document.getElementById("spaceBar").innerHTML = "You Lose!";
    losses ++;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("currentWord1").innerHTML = bWordString;
    document.getElementById("currentWord1").style.color = "red";
    document.getElementById("currentWord1").style.fontSize = "200%";
     setTimeout(function(){ reStartGame(); }, 4000); //delays re-starting the game for a short while //updating array in HTML

};
//takes keyboard input and decides whether your letter matches or does't match the existing word
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
                dimBob(guessLeft/6);
            
            }else {
                // alert ("you have already chosen that letter");
                document.getElementById("spaceBar").innerHTML = "You have already chosen that letter! Try again!" //I need to change this to a modal or something
            };
        };
        if ( (currentWord.includes (" _ ")) === false) {
            youWin();
        }else if (guessLeft <= 0){
            youLose();
        };
    };
};

