import { readFileAndReturnArray} from "./function.js";
import { gridsFolder } from "./path.js";

var bingoLines = [
  [0,1,2,3,4],
  [5,6,7,8,9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],

  [0,5,10,15,20],
  [1,6,11,16,21],
  [2,7,12,17,22],
  [3,8,13,18,23],
  [4,9,14,19,24],

  [0,6,12,18,24],
  [4,8,12,16,20]
];

//lit le fichier config_grids présent dans le dossier grids. 
//ignore les lignes qui commencent par #
//converti les lignes en tableau utilisé par la suite. 
async function initGrids()
{
  var listGrids = [];
  listGrids.push(["Standard", "standard.txt"]);
  var gridsConfig = await readFileAndReturnArray(gridsFolder+"config_grids.txt");
  $.each(gridsConfig, function (index, value) {
    if (value.startsWith("grid-"))
    {
      listGrids.push(value.substring(5, value.length).split(';'));
    }
  });
  return listGrids;
}
async function initJokers()
{
  var listJokers = [];
  var gridsConfig = await readFileAndReturnArray(gridsFolder+"config_grids.txt");
  $.each(gridsConfig, function (index, value) {
    if (value.startsWith("joker-"))
    {
      listJokers.push(value.substring(6, value.length));
    }
  });
  return listJokers;
}

export async function getRandomJoker(){
  var listJokers = await initJokers();
  if(listJokers.length == 0)
  {
    return null;
  }
  listJokers.sort(() => Math.random() - 0.5);
  return listJokers[0];
}
export async function setGrid(fileUrl) {
  var grille = await readFileAndReturnArray(fileUrl);
  grille = await getRandomSubset(grille);
  grille.forEach(setTuile);
}

function setTuile(item, index, arr) {
  $(".tuile-"+ index).text(item)
};

async function getRandomSubset(array) {
  var toShort = false;
  var resultArray = new Array();
  // S'assurer que le tableau d'origine a au moins 25 éléments
  if (array.length <= 25) {
    toShort = true;
  }

  if(toShort = false)
  {
      // Extraire les 25 premiers éléments du tableau mélangé
      resultArray = array.slice(0, 25);
  }
  else 
  {
    //si la liste est trop courte, alors on va compléter avec la grille standard.
    var standardGrid = await readFileAndReturnArray(gridsFolder+"standard.txt");
    resultArray = array.slice(0, array.length);
    standardGrid = standardGrid.slice().sort(() => Math.random() - 0.5);
    resultArray = resultArray.concat(standardGrid.slice(0, (25-array.length)));
  }
  // On mélange le tableau
  resultArray = resultArray.slice().sort(() => Math.random() - 0.5);

  // Garantir que l'élément à l'index 12 est "bonus"
  resultArray[12] = "Joker";

  return resultArray;
};

// Fonction pour charger les options dans le menu déroulant
export async function loadGridsChoice() {
  var listGrids = await initGrids();

  var selectState = $("#selectGrid");
  // Ajouter les options au menu déroulant
  $.each(listGrids, function (index, value) {
    selectState.append($("<option>", { value: value[1], text: value[0] }));
  });
}

export function isBingo() {
  var bool = false;
  $.each( bingoLines, function( key, line ) {
      if(line.every(isSelected)) {
        line.forEach((item, index, arr) => $("#c"+ item).addClass('bingo'));
        bool = true;
      }  
   });
   return bool;  
}; 
function isSelected(index) {
    return $("#c"+ index).hasClass("selected")
}
