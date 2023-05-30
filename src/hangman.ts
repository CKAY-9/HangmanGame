import { exit } from "process";
import readline from "readline";

const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

interface Word {
    word: string,
    hint: string,
    completed: boolean
}

const words: Word[] = [
    {word: "Omnichannel", hint: "A seamless expierence across all devices", completed: false},
    {word: "White Hat Hacker", hint: "Someone who uses their talents for good", completed: false},
    {word: "Black Hat Hacker", hint: "Someone who uses their talents for bad", completed: false},
    {word: "DES", hint: "An outdated method of encryption", completed: false},
    {word: "AES", hint: "An advanced method of encryption", completed: false},
    {word: "Social Engineering", hint: "Target individuals or groups to manipulate or to get something", completed: false},
    {word: "LAN", hint: "A network across a small/local area", completed: false},
    {word: "CAN", hint: "Allows the Electronic Control Units (ECUs) found in devices to communicate with each other in a reliable fashion", completed: false},
    {word: "WAN", hint: "A network that spans a vast area", completed: false},
    {word: "Permutation Cipher", hint: "A method of encryption which scrambles the positions of characters", completed: false},
    {word: "Substitution Cipher", hint: "Encrypt the plaintext by swapping each letter or symbol in the plaintext by a different symbol as directed by the key", completed: false},
    {word: "Computer Hardening", hint: "Increase security by reducing surface vulnerabilities", completed: false},
    {word: "Exploit", hint: "A segment of code or a program that maliciously takes advantage of vulnerabilities or security flaws in software or hardware to infiltrate", completed: false},
    {word: "Cybersecurity", hint: "The state of being protected against the criminal or unauthorized use of electronic data, or the measures taken to achieve this.", completed: false}
];
let word: Word = null;
let completed = 0;

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
            if (cLetters.includes(guess.toLowerCase()) || wLetters.includes(guess.toLowerCase())) {
                game();
                return;
            }
            if (!word.word.toLowerCase().includes(guess.toLowerCase())) {
                incorrectGuesses++;
                wLetters.push(guess);
                if (incorrectGuesses >= 9) {
                    gameOver();
                    return;
                }
            } else {
                for (let i = 0; i < word.word.length; i++) {
                    if (word.word[i].toLowerCase() === guess.toLowerCase()) {
                        cLetters[i] = word.word[i].toLowerCase();
                    }
                } 

                let fString = "";
                for (let i = 0; i < cLetters.length; i++) {
                    fString += cLetters[i].toLowerCase();
                }

                correct = (fString.toLowerCase() === word.word.toLowerCase());
            }
        } else {
            if (guess.toLowerCase() === word.word.toLowerCase()) {
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
    console.log("#########################################################");
    console.log("#                                                       #");
    if (correct) {
        console.log("#                       YOU WON!                        #");
        if (!word.completed) {
            completed++;
        }
        word.completed = true;
    } else {
        console.log("#                     you lost...                       #");
    }
    console.log(`#               You got ${incorrectGuesses} incorrect guesses             #`);
    console.log(`#             You have completed ${completed < 10 ? " " + completed : completed}/${words.length} words            #`);
    console.log("#                                                       #");
    console.log("#########################################################");

    line.question("Press any key to go to the menu...", () => {
        console.clear();
        incorrectGuesses = 0;
        word = null;
        correct = false;
        cLetters = [];
        wLetters = [];
        menu();
    });
}

function game() {
    if (word === null) {
        word = words[Math.floor(Math.random() * words.length)];
        for (let i = 0; i < word.word.length; i++) {
            if (word.word[i] === " ") {
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
    for (let i = 0; i < word.word.length; i++) {
        if (word[i] === " ") {
            correctSoFar += " ";
            continue;
        }
        if (cLetters.includes(word.word[i].toLowerCase())) {
            correctSoFar += word.word[i];
        } else {
            correctSoFar += "_";
        }
    }
    console.log(correctSoFar);
    console.log("");
    console.log("Hint: " + word.hint);
    console.log("Incorrect Letters: " + wLetters.toString().replace(/\,/g, ", "));
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

function wordsView() {
    console.clear();
    console.log("Possible Words: ");
    for (const word of words) {
        console.log(`${word.word}, Completed: ${word.completed ? "✓" : "✗"}`)
    }

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
    console.log("#        (2) Words       #");
    console.log("#        (3) About       #");
    console.log("#        (4) Quit        #");
    console.log("#========================#")

    
    line.question("", (input) => {
        const inp = Number.parseInt(input);
        switch (inp) {
            case 1: 
                game()
                break;
            case 2:
                wordsView();
                break;
            case 3: 
                about();
                break;
            case 4:
                exit(0);
            default:
                menu()
        }
    });
}

menu();