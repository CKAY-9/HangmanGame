import readline from "readline";

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const words: string[] = [
    "Omnichannel",
    "Grok",
    "White Hat Hacker",
    "Black Hat Hacker",
    "DES",
    "AES",
    "Social Engineering",
    "LAN",
    "CAN",
    "WAN",
    "Permutation Cipher"
];
let word: string = "";

// User
let guesses: number = 0;
let incorrectGuesses: number = 0;
let correct: boolean = false;
let wLetters: string[] = [];
let cLetters: string[] = [];

function printMan() {
    console.log(`0=========0=`)
    console.log(`|         | `)
    console.log(`|         ${incorrectGuesses >= 1 ? "O" : ""}`);
    console.log(`|        ${incorrectGuesses >= 3 ? "/" : ""}${incorrectGuesses >= 2 ? "I" : ""}${incorrectGuesses >= 4 ? "\\" : ""}`);
    console.log(`|         ${incorrectGuesses >= 5 ? "|" : ""}`);
    console.log(`|         ${incorrectGuesses >= 6 ? "^" : ""}`);
    console.log(`|        ${incorrectGuesses >= 7 ? "/" : ""} ${incorrectGuesses >= 8 ? "\\" : ""}`);
    console.log(`|           `);
    console.log(`L_________________`)
}

function guess() {
    line.question("Guess: ", (guess) => {
        if (guess.length === 1) {
            if (!word.toLowerCase().includes(guess.toLowerCase())) {
                incorrectGuesses++;
                wLetters.push(guess);
                if (incorrectGuesses >= 8) {
                    gameOver();
                }
            } else {
                for (let i = 0; i < word.length; i++) {
                    if (word[i].toLowerCase() === guess.toLowerCase()) {
                        cLetters[i] = guess.toLowerCase();
                    }
                } 

                let fString = "";
                for (let i = 0; i < cLetters.length; i++) {
                    if (cLetters[i] === undefined) continue;
                    fString += cLetters[i].toLowerCase();
                }

                correct = (fString.toLowerCase() === word.toLowerCase());
            }
        } else {
            if (guess.toLowerCase() === word.toLowerCase()) {
                correct = true;
            }
        }

        if (!correct) {
            game();
        } else {
            gameOver();
        }
    });
} 

function gameOver() {
    console.clear();
    if (correct) {
        console.log("YOU WON!!!");
    } else {
        console.log("you lost....");
    }
}

function game() {
    if (word === "") {
        word = words[Math.round(Math.random() * words.length)];
    }

    console.clear();
    printMan();
    
    for (let spacing = 0; spacing < 3; spacing++) {
        console.log("");
    }
    // Construct guess string 
    let correctSoFar = "";
    for (let i = 0; i < word.length; i++) {
        if (word[i] === " ") {
            correctSoFar += " ";
            continue;
        }
        if (cLetters.includes(word[i].toLowerCase())) {
            correctSoFar += word[i];
        } else {
            correctSoFar += "_";
        }
    }
    console.log(correctSoFar);
    console.log("");
    console.log("Incorrect Letters: " + wLetters.toString().replace(",", ", ").toUpperCase());
    for (let spacing = 0; spacing < 3; spacing++) {
        console.log("");
    }


    guess();
}

game();