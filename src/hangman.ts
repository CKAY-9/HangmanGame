import { exit } from "process";
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
    "Permutation Cipher",
    "Substitution Cipher",
    "Computer Hardening",
    "Exploit",
    "Cybersecurity"
];
let word: string = "";

// User
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
                if (incorrectGuesses >= 9) {
                    gameOver();
                    return;
                }
            } else {
                for (let i = 0; i < word.length; i++) {
                    if (word[i].toLowerCase() === guess.toLowerCase()) {
                        cLetters[i] = word[i].toLowerCase();
                    }
                } 

                let fString = "";
                for (let i = 0; i < cLetters.length; i++) {
                    fString += cLetters[i].toLowerCase();
                }

                correct = (fString.toLowerCase() === word.toLowerCase());
            }
        } else {
            if (guess.toLowerCase() === word.toLowerCase()) {
                correct = true;
            } else {
                wLetters.push(guess);
                incorrectGuesses++;
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
        console.log("YOU WON!");
    } else {
        console.log("you lost...");
    }

    console.log(`You got ${incorrectGuesses} wrong guesses.`);

    line.question("Press any key to go to the menu...", () => {
        console.clear();
        incorrectGuesses = 0;
        word = "";
        correct = false;
        cLetters = [];
        wLetters = [];
        menu();
    });
}

function game() {
    if (word === "") {
        word = words[Math.round(Math.random() * words.length)];
        for (let i = 0; i < word.length; i++) {
            if (word[i] === " ") {
                cLetters.push(" ");
            } else {
                cLetters.push("");
            }
        }
    }

    console.clear();
    printMan();
    
    console.log("\n");
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
    console.log("\n");

    guess();
}

function about() {
    console.clear();
    console.log("#===================================================#")
    console.log("#                                                   #");
    console.log("#             Developed by Cameron A.               #");
    console.log("#              Written in TypeScript                #");
    console.log("#      https://github.com/Camerxxn/HangmanGame      #");
    console.log("#                                                   #");
    console.log("#===================================================#")
    line.question("\nPress any key to go back...", () => {
        menu();
    })
}

function menu() {
    console.clear();

    console.log("#========================#")
    console.log("#         Hangman        #")
    console.log("#========================#")
    console.log("#    (1) Play Hangman    #");
    console.log("#        (2) About       #");
    console.log("#        (3) Quit        #");
    console.log("#========================#")

    
    line.question("", (input) => {
        const inp = Number.parseInt(input);
        switch (inp) {
            case 1: 
                game()
                break;
            case 2: 
                about();
                break;
            case 3:
                exit(0);
        }
    });
}

menu();