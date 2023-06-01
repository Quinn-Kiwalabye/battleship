const flipButton = document.querySelector('#flip-button'); /**used qu.. metho to selct the element with the id of flip button...
it was assigned to flipButton */
const optionsContainer = document.querySelector('.options-container'); /**we assign the optionsContainer to the the class options-container, by using the queryselector method() */
const gameBoardContainer = document.querySelector('#gameBoard-container');
const startButton = document.querySelector('#start-button');
const infoDisplay = document.querySelector('#Info-display')
const turnDisplay = document.querySelector('#turn-display')

let angle = 0;

function flip() { /**flip functions is called */
  const optionShips = Array.from(optionsContainer.children); /** array.from method is used to make
   a new array from the collection of children elements of the optionscontainer*/
  if (angle === 0) { /**used if else statement check the value of the varible of angle, */
    angle = 90; /**angle is assigned to 90  */
  } else { /**if not it is 0 */
    angle = 0;
  }
  optionShips.forEach((optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)); /**this line is used to iterate over 
  each elememnt in the optionships array,for each elemnet,it sets the CSS transform property of the element's style to rotate
  (${angle}deg). it then rotates element by specified angles and degrees */
}

flipButton.addEventListener('click', flip); /**flip function is called by adding the event listener that makes the button clickable */

//creating ships
class Ship {
  constructor(name, length, color) { /**constructor is a special method in which we make new instances of clases. 
  there are 3 parameters being passed */
    this.name = name;
    this.length = length;
    this.color = color;
  }
}

const width = 10;
const destroyer = new Ship('destroyer', 2, 'purple');
const submarine = new Ship('submarine', 3, 'blue');
const cruiser = new Ship('cruiser', 3, 'orange');
const battleship = new Ship('battleship', 4, 'green');
const carrier = new Ship('carrier', 5, 'pink');

const Ships = [destroyer, battleship, cruiser, submarine, carrier];
let notDropped; /**a varible notDropped has been declared but not given a value */

function getValidity(allBoardBlocks, isHorizontal, Ship, startIndex) { /**the getValidity function has been declared, used to get the validty
 of placing ships */
  const width = Math.sqrt(allBoardBlocks.length); /**calulates the width of the game board by taking the square root of the length in the 
  allBoardBlocks array.  */
  let validStart = isHorizontal /**validStart is assigned to the boolean isHorizontal */
    ? startIndex <= width * width - Ship.length /**this section calculates the valid starting position for the ship on the game board 
    based on the startIndex
    and the ship's length */
      ? startIndex //the starting position is determind defferently,depending on where the ship is placed horizontally
      : width * width - Ship.length 
    : startIndex <= width * width - width * Ship.length 
    ? startIndex
    : startIndex - Ship.length * width + width;
  let shipCells = []; // it is empty because we want to populate it with corressponding cells on the game board that the ship occupies

  for (let i = 0; i < Ship.length; i++) { //the ship, length is iterated multiple times and pushes the appropriate
    if (isHorizontal) { // cell into the array based on the ships orientation 'isHorizontal' and the caculated position 'validStart'
      shipCells.push(allBoardBlocks[Number(validStart) + i]);
    } else {
      shipCells.push(allBoardBlocks[Number(validStart) + i * width]);
    }
  }

  let valid = true; // this section checks the validity of the ship's placement.

  if (isHorizontal) { //if the ship is placed horizontally
    shipCells.every((_shipCell, index) => { //it ensures that the ships arent placed at the edge of the row
      valid = shipCells[0].id % width !== width - (shipCells.length - (index + 1)); /**shipCells[0].id: shipCells is an array that
       contains the grid cells occupied by a ship. shipCells[0] retrieves the first element of this array, which represents the starting 
       cell of the ship.
      % operator: This is the modulus operator, which calculates the remainder when the left operand (shipCells[0].id) is divided by the 
      right operand (width).
      width: It is a variable or value representing the width of the grid. In this context, it indicates the number of cells in each row 
      of the grid.
      !==: It is a strict inequality operator that checks if the left operand is not equal to the right operand.
      width - (shipCells.length - (index + 1)): This expression calculates the expected value for the last cell of the ship in the current
       row. It subtracts the length of the ship (shipCells.length) from the width of the grid (width), and then subtracts (index + 1) from 
       it. The (index + 1) part ensures that the expected value decreases by 1 for each subsequent cell of the ship.
      valid: It is a boolean variable that stores the result of the comparison between the calculated value for the last cell of the ship 
      and the actual id of the first cell (shipCells[0]). */
    });
  } else {
    shipCells.every((_shipCell, index) => { //if the ship is places vertically
      valid = shipCells[0].id < 90 + width * (index + 1); //it ensures that the ships cells do not exceed the last row of the game board
    });
  }

  const notTaken = shipCells.every((shipCell) => !shipCell.classList.contains('taken')); //this line checks if ship cells arent already taken
  //it returns true if they are unoccupied

  return { shipCells, valid, notTaken };
  //the function returns shipcell array, valid position and not taken as in the shipcells  are occupied or not
}


function createGrids() { //this function gets the grids that have already been defined in the html file
  const myGrid = document.getElementById('my-grid');
  const enemyGrid = document.getElementById('enemy-grid');

  // create cells for the enemy grid
  for (let i = 0; i < width * width; i++) { //a loop made to create cells in the enemy grid, iterated width * width
    // (width is already given a value somewhere)
    const enemyCell = document.createElement('div'); // we use the createElement() method (creates html elements)to 
    //make a div for each iteration in html and we assign it to enemyCell
    enemyCell.classList.add('enemyCell'); //adds enemy class to cell from css, allows cell to be styled
    enemyCell.id = `enemy-cell-${i}`; // assigns id to each enemy cell, format 'enemy-cell-' followed by the current index i.
    enemyGrid.appendChild(enemyCell); //enemyCell is attached to the enemyGrid element. this adds the cell to the html structure. 
    //making it visible
  }

  // create cells for the my grid
  for (let i = 0; i < width * width; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = `my-cell-${i}`; // assigns id to each my cell, format 'my-cell-' followed by the current index i.
    myGrid.appendChild(cell);//Cell is attached to the myGrid element. this adds the cell to the html structure. making it visible
  }
}

createGrids(); // calls the function, executes the code within the function 
/**the createGrids function creates cells for two grids: the enemy grid and 
 * the player's grid. It uses loops to create a specified number of cells, assigns 
 * classes and IDs to each cell, and appends them to their respective grid elements in the HTML structure. */

function addShipPiece(user, Ship) { //function is used to add ship to a specified user board 
  const allBoardBlocks = document.querySelectorAll(`#${user} div`); // allboards is assigned to a div with the element
  // of user, it assumes that the is a corresponding element with the id of user
  const width = Math.sqrt(allBoardBlocks.length); // width is calucated by taking the square root of number of div eleemnts
  // in the allboard blocks nodelist
  let randomBoolean = Math.random() < 0.5; //generates a random boolean value(true or false) by checking if a random generated
  // number btween 0 and 1 is less than 0.5
  let isHorizontal = user === 'player' ? angle === 0 : randomBoolean; //checks if the ship should be placed horizontally or vertically
  let randomStartIndex = Math.floor(Math.random() * width * width); //generates a random index within the range of possible start on
  // the start the board based on the calculated width value

  let startIndex = startId ? startId : randomStartIndex; // determines the start and end indices  for placing the ship on board
  //if startId is provided , it is used as the start index. the end index is calculated based on whether the ship is placed horizonatlly
  // or vertically
  let endIndex = isHorizontal ? startIndex + Ship.length - 1 : startIndex + (Ship.length - 1) * width;

  const { shipCells, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, Ship, startIndex); //called the getvalicity to see if 
  //ship placement is unoccupied and valid

  if (valid && notTaken) { /**this block of code is executed if the ship placement is valid and unoccupied. appropriate classes are added 
  to the cells in the shipcells array representing the ship's name, occupation status, and color. */
    shipCells.forEach((cell) => {
      cell.classList.add(Ship.name);
      cell.classList.add('taken');
      cell.classList.add(Ship.color);
    });
    return true;
  }

  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const enemyGrid = document.getElementById("enemy-grid");

  Ships.forEach(Ship => addShipPiece(enemyGrid, Ship)); /**This code listens for the 'DOMContentLoaded' event, which fires 
  when the initial HTML document has been completely loaded and parsed. Once the event is triggered, it selects the enemy-grid 
  element and iterates over each ship in the Ships array. For each ship, it calls the addShipPiece function, passing the
   enemyGrid and the current ship as arguments. This adds ships to the enemy's grid. */
});



// Drag player ships
const myGrid = document.getElementById("my-grid"); /**This line selects the HTML element
 with the ID "my-grid" and assigns it to the variable myGrid. It represents the grid where the ships will be placed. */
let draggedShip;/**This line declares a variable draggedShip without assigning it a value.
It will be used to keep track of the ship being dragged during the drag and drop operation. */
const optionShips = Array.from(optionsContainer.children); /**This line selects all the children of the optionsContainer
 element and converts them into an array. It assumes that optionsContainer is defined elsewhere in the code. 
 These elements represent the ships that can be dragged onto the grid. */
optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart)); /**This line adds 
a 'dragstart' event listener to each element in the optionShips array. When a ship is dragged, the dragStart function will be called. */

const allPlayerBlocks = document.querySelectorAll(`#${myGrid.id} div`); /**This line selects all the <div> elements within the myGrid 
element and assigns them to the allPlayerBlocks variable. It represents all the cells in the player's grid where ships can be dropped. */
allPlayerBlocks.forEach(playerBlock => { //These lines add event listeners to each element in the allPlayerBlocks NodeList
  playerBlock.addEventListener('dragover', dragOver); //When a ship is dragged over a player block, the dragOver function will be called
  playerBlock.addEventListener('drop', dropShip); //When a ship is dropped onto a player block, the dropShip function will be called.
}); /**Overall, the code sets up the necessary event listeners and initializes variables to enable drag and drop functionality. 
It allows ships to be dragged from a container and dropped onto the player's grid. */

function dragStart(e) {
  notDropped = false;
  draggedShip = e.target;
} /**This function is called when a ship drag operation starts. 
It sets the notDropped variable to false and assigns the element being dragged (e.target) to the draggedShip variable. */

function dragOver(e) {
  e.preventDefault();// preventDefault() -Stops the default action.
  const Ship = Ships[draggedShip.id]
  highlightArea(e.target.id, Ship)
} /**This function is called when a ship is dragged over a drop target. It prevents the default behavior of the event
 (prevents the browser's default handling of the dragover event). It retrieves the ship object associated with the dragged 
 ship using the draggedShip.id as the index in the Ships array. It then calls the highlightArea function, passing the ID of 
 the drop target (e.target.id) and the ship object. */

function dropShip(e) {
  const startId = e.target.id;
  const Ship = Ships[draggedShip.id];
  const placed = addShipPiece(myGrid, Ship, startId);

  if (placed) {
    draggedShip.remove();
  }/**This function is called when a ship is dropped onto a drop target. 
  It retrieves the ID of the drop target (e.target.id) and the ship object 
  associated with the dragged ship using the draggedShip.id as the index in the Ships array. 
  It then calls the addShipPiece function, passing the myGrid, the ship object, and the start ID. 
  The addShipPiece function attempts to place the ship on the grid and returns a boolean value (placed) 
  indicating whether the placement was successful. If the ship was placed successfully, the draggedShip element is removed from the DOM */
}


function addShipPiece(myGrid, Ship, startId) { /**This function takes three parameters: myGrid, which represents the player's grid, Ship, 
which represents the ship being placed, and startId, which is the ID of the starting cell for the ship placement.
*/
  const allPlayerBlocks = document.querySelectorAll(`#${myGrid.id} div`); //This line selects all the <div> elements within the player's grid 
  //and assigns them to the allPlayerBlocks variable.
  const width = Math.sqrt(allPlayerBlocks.length); //the width of the grid by taking the square root of the number of cells in allPlayerBlocks.
  const isHorizontal = angle === 0;/**determines whether the ship should be placed horizontally or vertically based on the value of the angle 
  variable.
   If angle is equal to 0, the ship is placed horizontally. */
  let randomStartIndex = Math.floor(Math.random() * width*width); /**This line generates a random start index within the range of possible 
  start positions 
  on the grid based on the calculated width.  */
  const endIndex = isHorizontal ? randomStartIndex + Ship.length - 1 : randomStartIndex + (Ship.length - 1) * width;/**This line calculates 
  the end index of the ship placement based on whether it is horizontal or vertical.  */

  const validPlacement = isHorizontal ? endIndex < width * width : endIndex < allPlayerBlocks.length; /**This line checks if the calculated 
  endIndex is within 
  the valid range of indices based on the grid's width and the total number of cells.  */

  if (validPlacement) {
    const shipCells = [];
    for (let i = randomStartIndex; i <= endIndex; i += isHorizontal ? 1 : width) {
      shipCells.push(allPlayerBlocks[i]);
    } //If the placement is valid, the code inside this block will be executed.
/**This loop creates an array shipCells containing the cells that will be occupied by the ship. 
 * It starts from the randomStartIndex and iterates up to the endIndex, incrementing by 1 if the ship is horizontal 
 * or by the grid's width if the ship is vertical.
 */

    const notTaken = shipCells.every(shipCell => !shipCell.classList.contains('taken')); 
/**This line checks if all the cells in shipCells do not have the 'taken' class, meaning they are unoccupied. */
    if (notTaken) { /**If all the cells are unoccupied, the code inside this block is executed. It adds appropriate 
    classes to each cell in shipCells, representing the ship's name, occupation status, and color.
     It then returns true to indicate successful placement.*/
      shipCells.forEach(cell => { /** */
        cell.classList.add(Ship.name);
        cell.classList.add('taken');
        cell.classList.add(Ship.color);
      });
      return true;
    }
  }

  return false; /**If the placement is invalid or the cells are already occupied, false is returned to indicate failure. */
} /**the addShipPiece function checks if the ship placement is valid and unoccupied on the player's grid. If so, it adds
 the ship to the grid by modifying the appropriate cell elements' classes. It returns true if the placement is successful and false otherwise. */

function highlightArea(startIndex, Ship) { /**This function takes two parameters: startIndex, which represents the starting index of 
the highlighted area, and Ship, which represents the ship being placed.*/
  const allBoardBlocks = document.querySelectorAll(`#${myGrid.id} div`);/**This line selects all the <div> elements within 
  the player's grid and assigns them to the allBoardBlocks variable.  */
  const isHorizontal = angle === 0; /**This line determines whether the ship should be placed horizontally 
  or vertically based on the value of the angle variable. If angle is equal to 0, the ship is placed horizontally.  */
  const { shipCells, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, Ship, startIndex);/**the getValidity function,
   passing the allBoardBlocks, isHorizontal, Ship, and startIndex as arguments. It destructures the returned object to extract the shipCells, 
   valid, and notTaken variables. */

  if (valid && notTaken) {
    shipCells.forEach((shipCell) => {
      shipCell.classList.add('highlight');
      setTimeout(() => shipCell.classList.remove('highlight'), 500);
    });
  }
}/**If the placement is valid and the cells are unoccupied, the code inside this block is executed. It iterates over each cell in shipCells and 
adds the 'highlight' class to it.
 After 500 milliseconds, the 'highlight' class is removed from the cells, effectively highlighting the area temporarily. */

let gameOver = false /**declare the gameOver and playerTurn variables without assigning them values.
 These variables are likely used elsewhere in the code to track the game state and player's turn. */
let playerTurn
/**the highlightArea function highlights the cells in the grid where a ship can potentially be placed. It checks 
 * if the placement is valid and unoccupied, adds the 'highlight' class to the cells temporarily, and sets the 
 * gameOver and playerTurn variables. */
function startGame() {
  if (playerTurn === undefined) { /**This condition checks if the playerTurn variable is undefined, which means the game hasn't started yet.*/
    if (optionsContainer.children.length != 0) { //If the player hasn't placed all their pieces on the grid, this block of code is executed. 
      infoDisplay.textContent ='Please place all your pieces first!'/**It displays a message on the infoDisplay element informing the player
       to place all their pieces before starting the game. */
    }else{
      const allBoardBlocks = document.querySelectorAll(`#enemy-grid div`);
      allBoardBlocks.forEach(cell => cell.addEventListener('click', handleClick))
      playerTurn = true
      turnDisplay.textContent = 'Your Go, duhh!'
      infoDisplay.textContent = 'The game has started dummy!'
    } /**if the player has placed all their pieces, this block of code is executed.
     It selects all the cells in the enemy grid and adds a click event listener to each cell,
      calling the handleClick function when clicked. It sets the playerTurn variable to true to indicate 
      that it's the player's turn. It updates the turnDisplay to indicate that it's the player's turn, 
      and it updates the infoDisplay to inform the player that the game has started. */
   
  }
}
startButton.addEventListener('click', startGame) /**This line adds an event listener to the startButton element, calling 
the startGame function when the button is clicked. */

let playerHits =[]
let computerHits = []
const playerSunkShips =[]
const computerSunkShips=[]
/**These lines declare the variables playerHits, 
 * computerHits, playerSunkShips, and computerSunkShips,
 *  initializing them as empty arrays. These variables are 
 * likely used elsewhere in the code to track the hits and sunk ships for the player and computer. */

/**the startGame function checks if the game hasn't started yet. If the player has not placed all
 *  their pieces, it displays a message to prompt them to do so. Otherwise, it sets up the game state 
 * by adding event listeners to the enemy grid cells, updating display elements, and initializing variables for hit tracking. */

function handleClick(e) { /**This function is called when the player clicks on a cell in the enemy grid.
*/
  if (!gameOver) { /**This condition checks if the game is not over. If the game is over, the function doesn't perform any actions. */
    if (e.target.classList.contains('taken')) { 
      e.target.classList.add('boom');
      infoDisplay.textContent = "You hit the computer's ship, bitch!!";
      const shipClasses = Array.from(e.target.classList).filter(className => className !== 'taken' && className !== 'boom');
      playerHits.push(...shipClasses);
      checkScore('player', playerHits, playerSunkShips)
    } else {
      e.target.classList.add('empty');
      infoDisplay.textContent = 'Nothing was hit this time.';
    } /**this block of code handles the case when the player clicks on a cell that contains a ship (taken class). 
    It adds the boom class to the clicked cell, indicating a hit. It updates the infoDisplay with a message 
    indicating a successful hit. It extracts the ship classes from the clicked cell's class list, excluding the 
    taken and boom classes, and pushes them into the playerHits array to track the hits. Finally, it calls the checkScore 
    function to evaluate the game score for the player.If the clicked cell does not contain a ship, the else block is executed. 
    It adds the empty class to the clicked cell, indicating a miss, and updates the infoDisplay with a message indicating no hit. */
    
    playerTurn = false; /**this line sets the playerTurn variable to false, indicating that it's now the computer's turn. */
    
    const allBoardBlocks = document.querySelectorAll('#enemy-grid div'); /**These lines select all the cells in 
    the enemy grid and replace them with cloned versions. This is likely done to reset the appearance of the grid after the player's turn. */
    allBoardBlocks.forEach(cell => cell.replaceWith(cell.cloneNode(true))); /**for each cell in the allboardblocks array, it creates a clone using the cell
    .cloneNode(true), replaces the orig cell with the cloned version, using replaceWith...*/
    
    setTimeout(computerGo, 3000); /**This line introduces a delay of 3000 milliseconds (3 seconds) 
    before the computerGo function is called. This delay gives the impression of the computer thinking before taking its turn. */
  }
}
//define the computer go
function computerGo(){
  if (!gameOver){ //This function executes the computer's turn only if the game is not over.
    turnDisplay.textContent = "Computers Go!!"
    infoDisplay.textContent = 'the computer is thinking...' /**update the turn display
     to indicate that it's the computer's turn and provide information to the player that the computer is thinking. */

    setTimeout(() => { 
      let randomGo = Math.floor(Math.random()* width* width)
      const allBoardBlocks = document.querySelectorAll('#my-grid div') /**introduces a delay of 3000 milliseconds (3 seconds) before
       the computer's move is executed. It selects a random cell on the player's grid by generating a random index based on the grid's dimensions. */

      if ( 
        allBoardBlocks[randomGo].classList.contains('taken') &&
        allBoardBlocks[randomGo].classList.contains('boom')
      ) {
        computerGo();
        return;
      } /**This condition checks if the randomly chosen cell has already been hit by the computer. If so,
       it repeatedly calls computerGo() to choose another random cell. This prevents the computer from selecting the same cell multiple times. */
      else if (
        allBoardBlocks[randomGo]. classList.contains('taken') &&
        !allBoardBlocks[randomGo]. classList.contains('boom')
      ) {
        allBoardBlocks[randomGo].classList.add('boom')
        infoDisplay.textContent = 'The computer hit your ship!'
        const shipClasses = Array.from(allBoardBlocks[randomGo]).filter(className => className !== 'taken' && className !== 'boom');
        computerHits.push(...shipClasses);
        checkScore('computer', computerHits, computerSunkShips) /**If the randomly chosen cell contains a ship that has not been hit before,
         it adds the boom class to the cell to indicate a successful hit by the computer. It updates the infoDisplay with a corresponding message. 
         It extracts the ship classes from the cell's class list, excluding the taken and boom classes, and adds them to the computerHits array to
          track the hits. Finally, it calls the checkScore function to evaluate the game score for the computer */
      } else {
        infoDisplay.textContent = 'Nothing hit this time.'
        allBoardBlocks[randomGo].classList.add('empty')
      } /**If the randomly chosen cell is empty (does not contain a ship),
       it adds the empty class to the cell to indicate a miss by the computer. 
       It updates the infoDisplay with a corresponding message. */
    }, 3000) /**This is the end of the timeout function, and the delay of 3000 milliseconds (3 seconds) ends here. */

    setTimeout(() => {
       playerTurn = true
       turnDisplay.textContent = 'Your Go!'
       infoDisplay.textContent = 'please take your go.'
       const allBoardBlocks = document.querySelectorAll('#enemy-grid div')
       allBoardBlocks.forEach(cell => cell.addEventListener('click', handleClick))
    }, 6000) /**After a delay of 6000 milliseconds (6 seconds), this timeout function is executed.
     It updates the turn to the player's turn, updates the display with the corresponding message,
      and adds event listeners to all cells on the enemy grid to handle the player's clicks. 
      he computerGo function simulates the computer's turn in the game. It selects a random cell on
       the player's grid, checks if it contains a ship or not, updates the display and score accordingly, 
       and introduces delays to provide a realistic game flow.*/

  }
}

function checkScore(user, userHits, userSunkShips){ /** This function takes three parameters: user (indicating the player or the computer), 
userHits (an array of ship classes that the user has hit), and userSunkShips (an array to store the names of the user's sunk ships)*/

  function checkShips(shipName, shipLength) { /**This nested function checkShips is used to check if a specific ship has been sunk.
   It compares the length of the filtered userHits array, which contains only hits related to the shipName, with the shipLength. 
   If they are equal, it means the ship has been sunk. */
    if(
      userHits.filter(storedShipName => storedShipName === shipName).length === shipLength
    ) {
      if (user === 'player') {
        playerHits = userHits.filter(storedShipName => storedShipName !== shipName)
        infoDisplay.textContent = `you sunk the computer's ${shipName}`

      }
      if (user === 'computer') {
        infoDisplay.textContent = `the computer sunk your${shipName}`
        computerHits = userHits.filter(storedShipName => storedShipName !== shipName)
      }
      userSunkShips.push(shipName) /**If the ship has been sunk, it checks the value of
       user to determine if it's the player or the computer. If it's the player, it updates 
       the playerHits array to exclude the sunk ship. It also updates the infoDisplay with a 
       message indicating the sunk ship. If it's the computer, it updates the infoDisplay with 
       a message indicating the sunk ship. The userSunkShips array is updated with the name of the sunk ship. */
    }
  }

  checkShips('destroyer', 2)
  checkShips('submarine', 3)
  checkShips('cruiser', 3)
  checkShips('battleship', 4)
  checkShips('carrier', 5) /**These lines call the checkShips function for each ship type, passing the ship name and length
   as arguments. It checks if each ship has been sunk based on the hits stored in userHits.*/

  console.log('playerHits', playerHits) 
  console.log('playerSunkShips', playerSunkShips) /**These lines log the playerHits and playerSunkShips arrays to the console 
  for debugging purposes. */
  
  if(playerSunkShips.length === 5){
    infoDisplay.textContent = 'you sunk all the computers ships. YOU WON BITCH!!'
    gameOver = true
  }
  if(computerSunkShips.length === 5){
    infoDisplay.textContent = 'Wow the computer sunk alll your ships. YOU ARE A LOSER'
    gameOver = true
  } /**These conditional statements check if either the player or the computer has sunk all five ships. If so, it updates the infoDisplay with 
  a victory or defeat message, respectively. It also sets the gameOver flag to true, indicating that the game has ended. */
}
/**the checkScore function evaluates the hits made by the player or the computer and determines if any ships have been sunk. 
 * It updates the display with appropriate messages and manages the game state by setting the gameOver flag when necessary. */



  




