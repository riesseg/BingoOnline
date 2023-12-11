import { rainFolder, rainMp3Folder, rainImgFolder, configRainFile } from "./path.js";
import { readFileAndReturnArray} from "./function.js";

var audio = document.getElementById("mp3Player"); 
var audioMp3 = $("#mp3Song"); 

var interval;
export var hasAnimationBeenTriggered;

export async function initRain()
{
  var listRain = [];
  var gridsConfig = await readFileAndReturnArray(rainFolder+configRainFile);
  $.each(gridsConfig, function (index, value) {
    if (value.startsWith("rain-"))
    {
        listRain.push(value.substring(5, value.length));
    }
  });
  return listRain;
}

async function initImgBingo()
{
  var listImgBingo = [];
  var imgBingo = await readFileAndReturnArray(rainFolder+configRainFile);
  $.each(imgBingo, function (index, value) {
    if (value.startsWith("img-"))
    {
        let tmpImg = value.split(';')
        listImgBingo.push([tmpImg[0].substring(4, tmpImg[0].length),tmpImg[1]]);
    }
  });
  return listImgBingo;
  ;
}

async function initMp3()
{
  var listMp3 = [];
  var gridsConfig = await readFileAndReturnArray(rainFolder+configRainFile);
  $.each(gridsConfig, function (index, value) {
    if (value.startsWith("mp3-"))
    {
        listMp3.push(value.substring(4, value.length));
    }
  });
  return listMp3;
}

export async function GetRandomImgBingo()
{
    var listImgBingo = await initImgBingo();
    let rngArray = Math.floor((Math.random() * listImgBingo.length));
    return listImgBingo[rngArray];
}

export async function randomMp3()
{
    var listMp3 = await initMp3();
    let rngArray = Math.floor((Math.random() * listMp3.length));
    return listMp3[rngArray];
}

export async function itsBingo(feverTrigger) {
  console.log("fever : "+feverTrigger)
  if(!hasAnimationBeenTriggered) 
  {
    hasAnimationBeenTriggered = true;

    $("#bingo").toggleClass("hidden");
    var songMp3 = await randomMp3();
    audioMp3.attr("src", rainMp3Folder+songMp3);
    audio.load();
    audio.play();
    makeItRain();
    setTimeout(function(){
      clearInterval(interval);
    }, 20000);
  }
  else
  {
    if(feverTrigger)
    {
      var songMp3 = await randomMp3();
      audioMp3.attr("src", rainMp3Folder+songMp3);
      audio.load();
      audio.play();
      makeItRain();
      setTimeout(function(){
        clearInterval(interval);
      }, 15000);
    }
  }
  
}

async function makeItRain() {
    var listRain = await initRain();
    interval = self.setInterval(function(){addRandomImage(listRain)},50);
}

function addRandomImage(listRain) {
    let rngImg = Math.floor((Math.random() * listRain.length));
    let rngX = Math.floor((Math.random() * ($(window).width() - 91)));
    let rngY = Math.floor((Math.random() * ($(window).height() - 91)));
    $( "#rain" ).append(`<img src="${rainImgFolder}${listRain[rngImg]}" style="top: ${rngY}px;left: ${rngX}px;" class="floating pop">`);
}

export function continueBingo() {
    clearInterval(interval);
    $("#bingo").toggleClass("hidden");
    audio.pause();
}

export function resetBingoAnim() {
    hasAnimationBeenTriggered = false;
}

export function isRotate(img){
  if (img == 'rotate')
    {
        $(".imgBingo").addClass("rotating");
    }
    else
    {
        $(".imgBingo").removeClass("rotating");
    }
}