const charctar = document.getElementById("charctar");
const form = document.getElementById("form");
const randomCharctarNumber = Math.floor(Math.random() * 82) + 1;
const modal = document.getElementById("modal");
const msg = document.getElementById("msg");

let charctarName;
let charctarFilms;
const url = "https://swapi.dev/api/people/" + randomCharctarNumber + "/";
fetch(url)
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(res.status);
    }
  })
  .then((resObj) => {
    charctarName = resObj.name;
    charctarFilms = resObj.films;
    charctarFilms = setCharctarFilms();
    console.log(charctarFilms);
    charctar.innerHTML = charctarName;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (isRightAnswar()) {
        msg.innerHTML = "The answer is correct";
      } else {
        msg.innerHTML = "The answer is incorrect";
        modal.classList.add("red");
      }
      modal.classList.remove("none");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const setCharctarFilms = () => {
  let result = [];
  for (let i = 0; i < charctarFilms.length; i++) {
    result[i] = charctarFilms[i][charctarFilms[i].length - 2] * 1;
  }
  return result;
};

const isRightAnswar = () => {
  for (let i = 2; i <= 12; i += 2) {
    if (!(form.children[i].checked === charctarFilms.includes(i / 2))) {
      return false;
    }
  }
  return true;
};
