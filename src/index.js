import "./style.scss";
import { data } from "../json/data";

const secret = {};

const cards = createCards(data);
cards.forEach((card) => card.addEventListener("click", flipCard));

let hasFlippedCard = false;
let lockBoard = false;

function createCard(item, color, number, id) {
  const fragment = document.createDocumentFragment();

  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("id", id);

  secret[id] = number;

  const front = document.createElement("div");
  const back = document.createElement("div");

  front.setAttribute("class", "front");
  back.setAttribute("class", "back");

  back.setAttribute("style", "background-color: white");

  front.setAttribute("style", "background-color: " + color);

  card.appendChild(front);
  card.appendChild(back);
  fragment.appendChild(card);

  return card;
}
function createCards(data) {
  console.log(data);
  const tempCards = [];

  data.forEach((item) => {
    const color = item.color;
    const number = Math.floor(Math.random() * item.id * 100000);

    const first = createCard(item, color, number, item.id * 2 - 1);
    const second = createCard(item, color, number, item.id * 2);

    document.getElementById("container").appendChild(first);
    document.getElementById("container").appendChild(second);
    tempCards.push(first);
    tempCards.push(second);
  });
  return tempCards;
}

let first, second;

function flipCard() {
  if (lockBoard) return;
  if (this && first);

  this.classList.add("flip");

  if (!hasFlippedCard) {
    [hasFlippedCard, first] = [true, this];
    return;
  }

  second = this;
  checkForMatch();
}

function checkForMatch() {
  const firstCheck = secret[first.id];
  const secondCheck = secret[second.id];
  console.table(firstCheck, secondCheck);
  const isMatch = firstCheck === secondCheck;

  if (first.id === second.id) {
    console.log("same one");
    unflipCards();
    return;
  }
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  console.log("matched");
  first.removeEventListener("click", flipCard);
  second.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    first.classList.remove("flip");
    second.classList.remove("flip");

    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [first, second] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
