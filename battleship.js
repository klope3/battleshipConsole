//#region Variables
const readline = require("readline-sync");
const letters = "abc";
const numbers = "123";
const gridSize = 3;
const grid = [];
const instruction = "Enter a location to strike ie \'A2\'";
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
const getRandomIndex = () => Math.round(Math.random() * gridSize * gridSize);

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
        console.log("Placed a ship at " + randIndex);
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
    let xCoordinate = letters.number - 1;
    let yCoordinate = letters.indexOf(input.letter);
    let index = x + yCoordinate * gridSize;
    
}
//#endregion
//#region Execution
let r = getRandomIndex();
readline.keyIn("Press any key to start the game.");
buildGrid(3);
placeShips();
console.log(instruction);
readline.promptLoop((inputStr) =>
{
    if (inputStr.toLowerCase() === "quit") { return true; }
    let input = new Input(inputStr);
    if (input.isValid) { attack(input); }
    return false;
});
console.log("Successfully quit");
//#endregion