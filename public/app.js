var pokers = ["1", "1", "1", "1", "2", "2", "2", "2", "3", "3", "3", "3", "4", "4", "4", "4", "5", "5", "5", "5", "6", "6", "6", "6", "7", "7", "7", "7", "8", "8", "8", "8", "9", "9", "9", "9", "10", "10", "10", "10", "11", "11", "11", "11", "12", "12", "12", "12", "13", "13", "13", "13"];
var shapes = ["clubs", "spades", "hearts", "diamonds"];
var computer = [];
var player = [];
var computerPoints = 0;
var playerPoints = 0;
var basicPoints = 1;
if(localStorage.getItem("score")){
  var score = parseInt(localStorage.getItem("score"));
  $("#totalscore").html(" " + score);
}
else{
  var score = 0;
}


$("#start").on("click", function () {
  $("#begaining").css("display", "none");
  $("#deal").css("display", "");
});

$("#dealBtn").on("click", function () {
  makeCard("computerdiv");
  var newImgae1 = $("<img>");
  newImgae1.attr("src", "assets/images/pokercardback.png");
  newImgae1.attr("id", "backcard");
  newImgae1.css("height", "22vh");
  $("#computerdiv").append(newImgae1);
  makeCard("playerdiv");
  makeCard("playerdiv");
  $("#deal").css("display", "none");
  $("#anothercard").css("display", "");
  $("#endgame").css("display", "");
  $("#double").css("display", "");
  basicPoints = 1;
});

$("#double").on("click", function(){
  basicPoints = 2;
  $("#double").css("display", "none");
});

$("#anothercard").on("click", function () {
  makeCard("playerdiv");
  scores();
  if (playerPoints > 21) {
    $("#anothercard").css("display", "none");
    $("#endgame").css("display", "none");
    $("#lose").css("display", "");
    $("#double").css("display", "none");
    score -= basicPoints;
  }
});

$("#endgame").on("click", function () {
  $("#backcard").css("display", "none");
  makeCard("computerdiv");
  scores();
  checkComputerScore();
});

$(".restartgame").on("click", function () {
  restart();
  $("#totalscore").html(" " + score);
  localStorage.setItem("score", score);
});



function makeCard(whoscard) {
  var whichCard = Math.floor(Math.random() * 52);
  if (whoscard === "playerdiv") {
    player.push(pokers[whichCard]);
  } else {
    computer.push(pokers[whichCard]);
  }
  var number = whichCard / 4;
  var decimalNum = number.toString().split(".");
  var whichShape = shapeToUse(decimalNum[1]);
  var newImgae = $("<img>");
  newImgae.attr("src", "assets/images/pokercards/" + pokers[whichCard] + "_of_" + shapes[whichShape] + ".png");
  newImgae.css("height", "20vh");
  $("#" + whoscard + "").append(newImgae);
}

function shapeToUse(number) {
  if (number === "25") {
    return 0;
  } else if (number === "5") {
    return 1;
  } else if (number === "75") {
    return 2;
  } else {
    return 3;
  }
}

function scores() {
  playerPoints = 0;
  var Ace = false;
  for (i = 0; i < player.length; i++) {
    var cardNum = parseInt(player[i]);
    if (cardNum > 1 && cardNum < 11) {
      playerPoints += cardNum;
    } else if (cardNum > 10) {
      playerPoints += 10;
    } else if (cardNum === 1) {
      playerPoints += 1;
      Ace = true;
    }
  }
  if (Ace) {
    if (playerPoints < 12) {
      playerPoints += 10;
    }
  }

}

function restart() {
  computer = [];
  player = [];
  $("#computerdiv").html("");
  $("#playerdiv").html("");
  $("#deal").css("display", "");
  $("#lose").css("display", "none");
  $("#win").css("display", "none");
  $("#draw").css("display", "none");
}

function checkComputerScore() {
  computerPoints = 0;
  var Ace = false;
  for (i = 0; i < computer.length; i++) {
    var cardNum = parseInt(computer[i]);
    if (cardNum > 1 && cardNum < 11) {
      computerPoints += cardNum;
    } else if (cardNum > 10) {
      computerPoints += 10;
    } else if (cardNum === 1) {
      computerPoints += 1;
      Ace = true;
    }
  }
  if (Ace) {
    if (computerPoints < 12) {
      computerPoints += 10;
    }
  }
  whoWins();
}

function whoWins() {
  if (computerPoints < 17) {
    makeCard("computerdiv");
    checkComputerScore();
  } else if (computerPoints > 21 || computerPoints < playerPoints) {
    $("#win").css("display", "");
    $("#anothercard").css("display", "none");
    $("#endgame").css("display", "none");
    $("#double").css("display", "none");
    score += basicPoints;
  } else if (computerPoints === playerPoints) {
    $("#draw").css("display", "");
    $("#anothercard").css("display", "none");
    $("#endgame").css("display", "none");
    $("#double").css("display", "none");
  } else if (computerPoints > playerPoints) {
    $("#lose").css("display", "");
    $("#anothercard").css("display", "none");
    $("#endgame").css("display", "none");
    $("#double").css("display", "none");
    score -= basicPoints;
  }
}