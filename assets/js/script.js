"use strict";

const _Components = ["LandLuchtMarineOR1.png", "Land", "Lucht", "Marine", "Medic", "SpecialeFuncties"];
const _NatoOTypes = ["OR", "OF"];
const _letters = ["a", "b"];

const _OR_RANKS = [
  "1e Soldaat", "Korporaal", "Korporaal-Chef", "1e Korporaal-Chef", "Sergeant",
  "1e Sergeant", "1e Sergeant-Chef", "1e Sergeant-Majoor", "Adjudant", "Adjudant-Chef", "Adjudant-Majoor"
];
const _OFFICER_RANKS = [
  "Onderluitenant", "Luitenant", "Kapitein", "Kapitein-Commandant", "Majoor", "Luitenant-Kolonel",
  "Kolonel", "Brigadegeneraal", "Generaal-Majoor", "Luitenant-Generaal", "Generaal"
];

const _OR_RANKS_MARINE = [
  "1e Matroos", "Kwartiermeester", "Kwartiermeester-Chef", "1e Kwartiermeester-Chef", "2e Meester", "Meester",
  "Meester-Chef", "1e Meester", "1e Meester-Chef", "Oppermeester", "Oppermeester-Chef"
];
const _OFFICER_RANKS_MARINE = [
  "Vaandrig-ter-zee 2e klasse", "Vaandrig-ter-zee", "Luitenant-ter-zee", "Luitenant-ter-zee 1e klasse",
  "Korvetkapitein", "Fregatkapitein", "Kapitein-ter-zee", "Flottieljeadmiraal", "Divisieadmiraal", "Viceadmiraal",
  "Admiraal"
];

let _answer = "";

document.addEventListener("DOMContentLoaded", init);

function init(){
  const $button = document.querySelector("button");

  displayImg()

  $button.addEventListener("click", checkInput);
}

function needLetter(oType, randomONumber) {
  if (oType === "OF" && (randomONumber === 1 || randomONumber === 3)) {
    return true;
  } else if (oType === "OR" && (randomONumber === 4 || randomONumber === 6 || randomONumber === 9)){
    return true;
  } else {
    return false;
  }
}

function generateRandomONumber(oType) {
  let randomONumber = Math.floor(Math.random() * 9 + 1);

  while (oType === "OR" && randomONumber === 1) {
    console.log("loop");
    randomONumber = Math.floor(Math.random() * 9 + 1);
  }
  return randomONumber;
}

function addLetter(oType, randomONumber) {
  let letter = "";

  if (needLetter(oType, randomONumber)) {
    letter = _letters[Math.floor(Math.random() * 2)];
  }
  return letter;
}

function colorInsignia(randomComponent, oType, randomONumber) {
  if (randomComponent === "Marine" && oType === "OF" && randomONumber > 5) {
    const colorOptions = ["", "Kleur"];
    return colorOptions[Math.floor(Math.random() * 2)];
  } else {
    return "";
  }
}

function generateImgLink() {
  const randomComponent = _Components[Math.floor(Math.random() * _Components.length)];
  if (randomComponent !== "LandLuchtMarineOR1.png" && randomComponent !== "SpecialeFuncties") {
    const oType = _NatoOTypes[Math.floor(Math.random() * 2)];
    const randomONumber = generateRandomONumber(oType);
    const letter = addLetter(oType, randomONumber);
    const color = colorInsignia(randomComponent, oType, randomONumber);
    answerSelection(randomComponent, oType, randomONumber, letter);

    return `images/${randomComponent}/${color}${randomComponent}${oType}${randomONumber}${letter}.png`;
  } else if (randomComponent === "SpecialeFuncties") {
    const specialRanks = ["CSM", "Defensieadjudant", "Korpskorporaal", "RSM"]
    const specialRank = specialRanks[Math.floor(Math.random() * 4)];
    _answer = specialRank;

    return `images/${randomComponent}/${specialRank}.png`;
  }else {
    _answer = "Soldaat";
    return `images/${randomComponent}`;
  }
}

function displayImg() {
  const link = generateImgLink();
  const $imgAdd = document.querySelector("#addImageDiv");
  $imgAdd.innerHTML = `<img src=${link} alt="rang">`;
  console.log(link);
}

function makeAnswerMarine(oType, random0Number, letter) {
  let extraIdx = 0;

  if (letter === "b") {
    extraIdx = 1;
  }

  if (oType === "OR") {
    random0Number--;
    if (random0Number < 4) {
      _answer = _OR_RANKS_MARINE[random0Number + extraIdx];
    } else if (random0Number < 6) {
      _answer = _OR_RANKS_MARINE[random0Number + 1 + extraIdx];
    } else {
      _answer = _OR_RANKS_MARINE[random0Number + 2 + extraIdx];
    }
  } else {
    if (random0Number < 1) {
      _answer = _OFFICER_RANKS_MARINE[random0Number + extraIdx];
    } else if (random0Number < 3) {
      _answer = _OFFICER_RANKS_MARINE[random0Number + 1 + extraIdx];
    } else {
      _answer = _OFFICER_RANKS_MARINE[random0Number + 2 + extraIdx];
    }
  }
}

function makeAnswerNormal(oType, random0Number, letter) {
  let extraIdx = 0;

  if (letter === "b") {
    extraIdx = 1;
  }

  if (oType === "OR") {
    random0Number--;
    if (random0Number < 4) {
      _answer = _OR_RANKS[random0Number + extraIdx];
    } else if (random0Number < 6) {
      _answer = _OR_RANKS[random0Number + 1 + extraIdx];
    } else {
      _answer = _OR_RANKS[random0Number + 2 + extraIdx];
    }
  } else {
    if (random0Number < 1) {
      _answer = _OFFICER_RANKS[random0Number + extraIdx];
    } else if (random0Number < 3) {
      _answer = _OFFICER_RANKS[random0Number + 1 + extraIdx];
    } else {
      _answer = _OFFICER_RANKS[random0Number + 2 + extraIdx];
    }
  }
}

function answerSelection(randomComponent, oType, randomONumber, letter) {
  if (randomComponent === "Marine") {
    return makeAnswerMarine(oType, randomONumber - 1, letter);
  } else {
    return makeAnswerNormal(oType, randomONumber - 1, letter);
  }
}

function checkAnswer() {
  const answerGiven = document.querySelector("input").value;
  const $answerP = document.querySelector("#answerFeedback")

  if (answerGiven.toLowerCase() === _answer.toLowerCase() || answerGiven.toLowerCase() === "Matroos".toLowerCase() && _answer.toLowerCase() === "Soldaat".toLowerCase()) {
    $answerP.innerHTML = `<strong>Correct!</strong>`;
  } else {
    $answerP.innerHTML = `<em>Fout! Het antwoord was ${_answer}.</em>`;
  }
}

function checkInput(e) {
  e.preventDefault();

  checkAnswer();
  document.querySelector("input").value = "";
  displayImg();
  console.log(_answer);
}
