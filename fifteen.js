var length = 4;
var tileIndex = [];
var pos = 15;
window.onload = function(){
  initialize();
  var change = $("shufflebutton");
  change.onclick = shuffle;

};

function initialize(){
  var puzzlearea = $("puzzlearea");
  var tiles = puzzlearea.getElementsByTagName("div");
  var i=0;
  while(i < tiles.length){
     tiles[i].className = "puzzlepiece";
     setLocation(tiles[i],i);   
     setBackground(tiles[i],i);
     setId(tiles[i],i);
     tileIndex[i] = i;
     tiles[i].addEventListener('click',Move);
     tiles[i].onmouseover = MouseOver;
     tiles[i].onmouseout = MouseOut;
     i ++;
  }
  tileIndex[tiles.length] = 15;
}
function setId(elem,indx){
  elem.id = indx;
}

function Move(){
  var tempindex = tileIndex[getId(this)];
  var next = movable(tempindex);
  if (next != -1){
      pos = tempindex;
      tileIndex[getId(this)] = next;
      setLocation(this,next);
  }
}
function MouseOver(){
   var tempindex = tileIndex[getId(this)];
   if (movable(tempindex) != -1){
      this.addClassName("movablepiece");  
   }
}

function MouseOut(){
    this.removeClassName("movablepiece");
}
function setLocation(elem,indx){
  var i = Math.floor(indx / length), j = indx % length;
  var x = i * (400 / length), y = j * (400 / length);
  elem.style.top = x + "px";
  elem.style.left = y + "px";
}
function setBackground(elem,indx){
  var i = Math.floor(indx / length), j = indx % length;
  var x = -i * (400 / length) + "px";
  var y = -j * (400 / length) + "px";
  elem.style.backgroundPosition = y + " " + x;

}

function getId(elem){
  return parseInt(elem.id);
}
function movable(indx){
  var variable = [];
  var count = 0;
  var dis = [1,-1,4,-4];
  var i = 0;
  while (i < 4){
    var temp = indx + dis[i];
    if (temp >= 0 && temp <= 15 && temp == pos){
       return temp;
    }
    i ++;
  }
  return -1;
}
var loca = [];
var arrayLength = 0;
function check(temp){
    for (var i = 0;i < arrayLength;i ++){
        if (loca[i] == temp)
          return false;
    }
    return true;
}

function shuffle(){
  var time = 100;
  for (var i = 1;i <= time;i ++){
    var tile = $$(".puzzlepiece");  
    var j=0;
    while (j < tile.length){
      var tempindex = tileIndex[getId(tile[j])];
      var temp = movable(tempindex);
      if (temp != -1){
        setLocation(tile[j],temp);
        pos = tileIndex[getId(tile[j]) ];
        tileIndex[getId(tile[j])] = temp;
      }
      j ++;
    }
  }

}