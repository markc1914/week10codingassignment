/**
 * Week 10 Assignment Javascript file
 * Written by Mark Cornelius
 */
const btnAddName = 'add';
const datePlayed = 'date-played';
const mapName = 'map-name';
const gameModeName = 'game-mode';
const numKillsName = 'num-kills'
const numDeathsName = 'num-deaths';
const tableName = 'list';
const globalKD = 'globalKD';
const green = '#07541d';
const red = '#820505';

let allgamesPlayed = [];
class GamePlayed {

  /**
   *  creates a new instance of game played for our table
   * @param {date} datePlayed - date and time of the game
   * @param {String} map - the map name
   * @param {String} mode - the game mode played
   * @param {BigInt} kills - number of enemy players killed
   * @param {BigInt} deaths - number of times killed by enemy player
   */
  constructor(datePlayed, map, mode, kills, deaths) {
    this.datePlayed = datePlayed;
    this.map = map;
    this.mode = mode;
    this.kills = kills;
    this.deaths = deaths;
    this.calculateKillDeathRatio();
  }

  /**
   * properly calculate the KD ratio - we can't divide by 0
   */
  calculateKillDeathRatio(){
    this.killDeathRatio = 0;
    if (this.deaths > 0) {
      this.killDeathRatio = parseFloat(this.kills / this.deaths).toFixed(2);
    } else {
      this.killDeathRatio = this.kills;
    }
  }

}

let rowId = 0; //track the rows we add using this

/**
 *
 * @param {Date} gamePlayedDate
 * @param {String} gameMap
 * @param {String} gameMode
 * @returns true if no errors, false if errors exist
 */
function validateForm(gamePlayedDate, gameMap, gameMode) {
  if (gamePlayedDate == '') {
    alert("Date must be filled out");
    return false;
  }
  //don't allow future games either
  let gamePlayedDateAsDate = new Date(gamePlayedDate);
  if (gamePlayedDateAsDate > new Date()) {
    alert("Date must not be in the future");
    return false;
  }

  if (gameMap == '') {
    alert("Map must be chosen");
    return false;
  }
  if (gameMode == '') {
    alert("Mode must be selected");
    return false;
  }
  return true;
}


//add event listener to our button so it adds to the row
let addbutton = document.getElementById(btnAddName);
if (addbutton != null) {
  document.getElementById(btnAddName).addEventListener('click', () => {
    let gamePlayedDate = document.getElementById(datePlayed).value;
    let gameMap = document.getElementById(mapName).value;
    let gameMode = document.getElementById(gameModeName).value;
    if (validateForm(gamePlayedDate, gameMap, gameMode)) {
      let numKills = document.getElementById(numKillsName).value;
      let numDeaths = document.getElementById(numDeathsName).value;
      let gamePlayed = new GamePlayed(gamePlayedDate, gameMap, gameMode, numKills, numDeaths);
      allgamesPlayed.push(gamePlayed);
      let table = document.getElementById(tableName);
      let row = table.insertRow(rowId + 1);
      row.setAttribute('id', `game-${rowId}`);
      row.insertCell(0).innerHTML = gamePlayed.datePlayed;
      row.insertCell(1).innerHTML = gamePlayed.map;
      row.insertCell(2).innerHTML = gamePlayed.mode;
      row.insertCell(3).innerHTML = gamePlayed.kills;
      row.insertCell(4).innerHTML = gamePlayed.deaths;
      let kdCell = row.insertCell(5);
      kdCell.innerHTML = gamePlayed.killDeathRatio;
      if (parseFloat(gamePlayed.killDeathRatio) >= 1) {
        kdCell.style.color = green; //Green
      } else {
        kdCell.style.color = red; //Red
      }
      let actions = row.insertCell(6);
      actions.appendChild(createDeleteButton(rowId++));
      document.getElementById(datePlayed).value = '';
      document.getElementById(mapName).value = '';
      document.getElementById(gameModeName).value = '';
      document.getElementById(numKillsName).value = 0;
      document.getElementById(numDeathsName).value = 0;
      recalculateGlobalKDRatio(allgamesPlayed);
    }
  });
}


const newLocal = 'button';
/**
 * creates delete button for a row in a table based on that id
 * @param {BigInt} currentRow - which row needs a button
 * @returns the delete button for that row
 */
function createDeleteButton(currentRow) {
  if (currentRow != null && currentRow != 'undefined' && currentRow >= 0) {
    let button = document.createElement(newLocal);
    button.className = 'btn btn-primary'; //add styling
    button.id = currentRow;
    button.innerHTML = 'Delete';
    button.onclick = () => {
      let rowToDelete = document.getElementById(`game-${currentRow}`);
      rowToDelete.parentNode.removeChild(rowToDelete);
      allgamesPlayed.splice(currentRow, 1);
      recalculateGlobalKDRatio(allgamesPlayed);
      rowId--;
    };
    return button;
  }
  return null;
}
/**
 * Calculates the global K/D Ratio
 * @param {[GamePlayed]} allgamesPlayed
 */
function recalculateGlobalKDRatio(gamesPlayed) {
  let kdElement = document.getElementById(globalKD);
  if (gamesPlayed != null && gamesPlayed.length > 0) {
    let totalKills = 0;
    let totalDeaths = 0;
    for (const gamePlayed of gamesPlayed) {
      totalKills += parseInt(gamePlayed.kills);
      totalDeaths += parseInt(gamePlayed.deaths);
    }
    let averageKD = totalKills/totalDeaths;
    document.getElementById(globalKD).value = parseFloat(averageKD).toFixed(2);
  } else {
    document.getElementById(globalKD).value = 0;
  }
  //add styling to the average K/D ratio
  if (parseFloat(kdElement.value) >= 1) {
    kdElement.style.color = green;
  } else {
    kdElement.style.color = red;
  }
}

module.exports = {
  GamePlayed: GamePlayed,
  recalculateGlobalKDRatio: recalculateGlobalKDRatio,
  validateForm: validateForm,
  createDeleteButton: createDeleteButton
}
