//#region Variables
const readline = require("readline-sync");
const letters = "abc";
const numbers = "123";
const gridSize = 3;
const grid = [];
const instruction = "Enter a location to strike ie \'A2\'";
const hitMessage = "Hit. You have sunk a battleship. 1 ship remaining.";
const missMessage = "You have missed!";
const repeatMessage = "You have already picked this location. Miss!";
const debugMessages = false;
let shipsRemaining = 0;
//#endregion
//#region Classes
class Input
{
    constructor(input)
    {
        this.letter = input.charAt(0).toLowerCase();
        this.number = input.slice(1);
        this.isValid = letters.includes(this.letter) && 
        numbers.includes(this.number);
        if (!this.isValid)
        {
            console.log("Invalid input! " + instruction);
            return;
        }
    }
}
class Cell
{
    constructor()
    {
        this.hasShip = false;
        this.wasHit = false;
    }
}
//#endregion
//#region Functions
const getRandomIndex = () => Math.floor(Math.random() * gridSize * gridSize);

function placeShips()
{
    for (let i = 0; i < 2; i++)
    {
        let randIndex = 0;
        do
        {
            randIndex = getRandomIndex();
        } while (grid[randIndex].hasShip);
        grid[randIndex].hasShip = true;
        shipsRemaining++;
        debugLog("Placed a ship at " + randIndex);
    }
}


function buildGrid(squareSize)
{
    let cellCount = squareSize * squareSize;
    for (let i = 0; i < cellCount; i++)
    {
        grid[i] = new Cell();
    }
}

function attack(input)
{
    let xCoordinate = input.number - 1;
    let yCoordinate = letters.indexOf(input.letter);
    let index = xCoordinate + yCoordinate * gridSize;

    debugLog(xCoordinate + ", " + yCoordinate);
    debugLog("Attacked index " + index);
    if (grid[index].wasHit)
    {
        console.log(repeatMessage);
        return;
    }
    grid[index].wasHit = true;
    if (grid[index].hasShip)
    {
        grid[index].hasShip = false;
        shipsRemaining--;
        if (shipsRemaining > 0) { console.log(hitMessage); }
    }
    else
    {
        console.log(missMessage);
    }
}

function debugLog(message)
{
    if (debugMessages) { console.log(message); }
}
//#endregion
//#region Execution
readline.keyIn("Press any key to start the game.");
let quit = false;
do
{
    buildGrid(3);
    console.log(grid);
    placeShips();
    console.log(instruction);
    readline.promptLoop((inputStr) =>
    {
        if (inputStr.toLowerCase() === "quit") 
        { 
            quit = true;
            return true; 
        }
        let input = new Input(inputStr);
        if (input.isValid) { attack(input); }
        return shipsRemaining === 0;
    });
} while (!quit && readline.keyInYN("You have destroyed all battleships. Would you like to play again?"));
console.log("Successfully quit");
//#endregion