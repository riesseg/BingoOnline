import { resetGrid, setTransparencyMode, setVolume, changeAlign,convertBool, revertCheck } from "./function.js";
import { setGrid, loadGridsChoice, isBingo, getRandomJoker,bingoLines  } from "./grid.js";
import { itsBingo, continueBingo, resetBingoAnim, GetRandomImgBingo, isRotate} from "./rain.js";
import { gridsFolder, gridsImgJokerFolder, standardGridFile, bingoImgFolder } from "./path.js";

var selectedGrid = standardGridFile;
var transparencyTrigger = false;
var feverTrigger = false;
var selectedVolume = 80;
var selectedAlign = "center";
var obstacle = 0;
var thisBingoLine = bingoLines;

export function hello() {
    console.log('hello!');
};

$(document).ready(async function() {
    if ( Cookies.get('selectedGrid') != undefined) {selectedGrid = Cookies.get('selectedGrid');}
    if ( Cookies.get('selectAlign') != undefined) {selectedAlign = Cookies.get('selectAlign');}
    if ( Cookies.get('transparencyTrigger') != undefined) {transparencyTrigger = convertBool(Cookies.get('transparencyTrigger'));}
    if ( Cookies.get('inputSound') != undefined) {selectedVolume = Cookies.get('inputSound');}
    if ( Cookies.get('obstacle') != undefined) {obstacle = Cookies.get('obstacle');}
    if ( Cookies.get('feverTrigger') != undefined) {feverTrigger = convertBool(Cookies.get('feverTrigger'));}


    var imgJoker  = await  getRandomJoker();
    var imgBingo  = await  GetRandomImgBingo();

    setGrid(gridsFolder+selectedGrid, obstacle);

    $("#selectGrid").val(selectedGrid);
    $("#selectAlign").val(selectedAlign);
    $("#inputSound").val(selectedVolume);
    $('#switchTransparence').prop('checked', transparencyTrigger);
    $('#switchFever').prop('checked', feverTrigger);
    $("#setObstacle .text").text(obstacle);

    loadGridsChoice(selectedGrid);
    changeAlign(selectedAlign);
    setVolume(selectedVolume/100);
    setTransparencyMode(transparencyTrigger);

    $(".joker").css("background-image","url('"+gridsImgJokerFolder+imgJoker+"')");
    $(".imgBingo").attr("src", bingoImgFolder+imgBingo[0]);
    isRotate(imgBingo[1]);

});

$(".tuile").on('click', function(){
    if (! $(this).hasClass('obstacle') ) 
    {
        $(this).toggleClass('selected');
    }   
    let resultBingo = isBingo(thisBingoLine);
    thisBingoLine = resultBingo[1];
    if (resultBingo[0]){
        itsBingo(feverTrigger);
    }
});

$('#newGrid').on('click',function (e) {
    setGrid(gridsFolder+selectedGrid, obstacle);
    resetBingoAnim();
    resetGrid();
});

$('#continueBingo').on('click', function() {
    continueBingo();
});

$("#selectGrid").on('change', function () {
    selectedGrid = $(this).val();
    Cookies.set("selectedGrid",selectedGrid, { expires: 7, sameSite: 'strict'  });
});

$("#selectAlign").on('change', function () {
    changeAlign($(this).val());
    Cookies.set("selectAlign",$(this).val(), { expires: 7, sameSite: 'strict'  });
});

$('#inputSound').on('input', function () {
    setVolume($(this).val()/100);
    Cookies.set("inputSound",$(this).val(), { expires: 7, sameSite: 'strict'  });
});

$('#toggleTransparence .switch').on('click', function () {
    revertCheck("#switchTransparence");
    setTransparencyMode($("#switchTransparence").is(':checked'));
    Cookies.set("transparencyTrigger",$("#switchTransparence").is(':checked'), { expires: 7, sameSite: 'strict' });
});
$('#toggleFever .switch').on('click', function () {
    revertCheck("#switchFever");
    feverTrigger = $("#switchFever").is(':checked');
    Cookies.set("feverTrigger", feverTrigger, { expires: 7, sameSite: 'strict' });
});

$("#setObstacle .text").on('click', function () {
    obstacle++;
    if(obstacle>5) { obstacle = 0; }
    $("#setObstacle .text").text(obstacle);
    Cookies.set("obstacle",obstacle, { expires: 7, sameSite: 'strict'  });
});


  