var bands = [
        Pink = ["P", "I", "N", "K", "F", "L" ,"O", "Y", "D"],
        Eagles = ["E", "A", "G", "L", "E", "S"],
        Beatles = ["B", "E", "A", "T", "L", "E", "S"],
        LedZep = ["L", "E", "D", "Z", "E", "P", "P", "E", "L", "I", "N"],
        test = ["B", "E", "E", "E", "T", "S"]
];

var bandNum = (Math.floor(Math.random() * bands.length)); //picks a random array index number from the bands list
var userGuesses = []; //stores the players guesses
var guessLeft = 6; //number of guesses the player starts with
var currentWord = []; //function CurrentWordInitial Populates it with blank spaces base on length of guess word array


function currentWordInitial () { //determins the length of the band name & pushes that number of blanks into the guess array
    for ( let i = 0; i < (bands[bandNum].length); i++ ){
        currentWord.push (" _ ");
    }
};

// console.log("band lnength" + bands[bandNum].length);

currentWordInitial();

document.getElementById("currentWord1").innerHTML = currentWord.join(" ");


function solvePart(cL){ //adds the correct letter into the matching lines in the guess word
    
    for ( i = 0; i < (bands[bandNum].length) ; i++ ){
        if (cL === bands[bandNum][i]){
            currentWord[i] = cL;
        }
    }
    document.getElementById("currentWord1").innerHTML = currentWord.join(" ");
}

function addLetter(uG){ //adds guessed letters to the guessed letters line
    userGuesses.push(uG);
    document.getElementById("lettersChosen").innerHTML = userGuesses.join(" ");
}


function youWin() {
    setTimeout(function(){ alert("You Win"); }, 300);
};


document.onkeyup = function(event)  {
    let userGuess = event.key.toUpperCase();
    let x = userGuesses.indexOf(userGuess)
    if (event.keyCode < 65 || event.keyCode > 90){//checks to see if player entered a letter
        alert("Pick a letter!");
    
    }
    else{
            //checks to see if the players guess has been used before and if it matches a letter in the band name
        if ( x === -1 && bands[bandNum].indexOf(userGuess) !== -1 ) {
            addLetter(userGuess); //re-prints the array of chosen letters
            solvePart(userGuess); //runs function to add correct letter to guessed word
        
        }else if ( x === -1 ){
            addLetter(userGuess); //re-prints the array of chosen letters
            guessLeft --;
        
        }else {
            alert ("you have already chosen that letter");
        };
    };

    if (currentWord.indexOf (" _ ") === -1) {
        youWin();
    }else if (guessLeft <= 0){
        alert("You Lose!")
    };


};

