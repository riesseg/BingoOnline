import { setGrid} from "./function.js";
var grille = new Array();
var grille2 = new Array();
const fichierLoaded = 0;

export function hello() {
    console.log('hello!');
};

 $( document ).ready(function() {
    setGrid("../grilles/secret_histoire.txt");
    
});

$('#newGrid').on('click',function (e) {
    //e.preventDefault(); //optional
    //some code
    setGrid("../grilles/secret_histoire.txt");
});
  