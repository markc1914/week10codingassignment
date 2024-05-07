const btnAddName = 'add';
const datePlayed = 'date-played';
const mapName = 'map-name';
const gameModeName = 'game-mode';
const numKillsName = 'num-kills'
const numDeathsName = 'num-deaths';
const tableName = 'list';

class GamePlayed {

  /**
   *  creates a new instance of game played for our table
   * @param {date} datePlayed - date and time of the game
   * @param {string} map - the map name
   * @param {string} mode - the game mode played
   * @param {number} kills - number of enemy players killed
   * @param {number} deaths - number of times killed by enemy player
   */
  constructor(datePlayed,map,mode,kills,deaths){
    this.datePlayed = datePlayed;
    this.map = map;
    this.mode = mode;
    this.kills = kills;
    this.deaths = deaths;
    this.killDeathRatio = kills / deaths;
  }

}

let rowId = 0; //track the rows we add using this

//add event listener to our button so it adds to the row
document.getElementById(btnAddName).addEventListener('click',()=>{
  let gamePlayedDate = document.getElementById(datePlayed).value;
  let gameMap = document.getElementById(mapName).value;
  let gameMode = document.getElementById(gameModeName).value;
  let numKills = document.getElementById(numKillsName).value;
  let numDeaths = document.getElementById(numDeathsName).value;
  let gamePlayed = new GamePlayed(gamePlayedDate,gameMap,gameMode,numKills,numDeaths);
  let table = document.getElementById(tableName);
  let row = table.insertRow(rowId+1);
  row.setAttribute('id',`game-${rowId}`);
  row.insertCell(0).innerHTML = gamePlayed.datePlayed;
  row.insertCell(1).innerHTML = gamePlayed.map;
  row.insertCell(2).innerHTML = gamePlayed.mode;
  row.insertCell(3).innerHTML = gamePlayed.kills;
  row.insertCell(4).innerHTML = gamePlayed.deaths;
  row.insertCell(5).innerHTML = gamePlayed.killDeathRatio;
  let actions = row.insertCell(6);
  actions.appendChild(createDeleteButton(rowId++));
  document.getElementById(datePlayed).value = '';
  document.getElementById(gameMapName).value = '';
  gameMode = document.getElementById(gameModeName).value = '';
  document.getElementById(numKillsName).value = 0;
  document.getElementById(numDeathsName).value = 0;
});

/**
 * creates delete button for a row in a table based on that id
 * @param {number} rowId - which row needs a button
 * @returns the delete button for that row
 */
function createDeleteButton(rowId) {
  let button = document.createElement('button');
  button.className = 'btn btn-primary'; //add styling
  button.id = rowId;
  button.innerHTML = 'Delete';
  button.onclick = () => {
    let rowToDelete = document.getElementById(`game-${rowId}`);
    rowToDelete.parentNode.removeChild(rowToDelete);
  };
  return button;
}
