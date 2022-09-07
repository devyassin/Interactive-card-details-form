"use strict";

const confirmBtn = document.querySelector(".btn");
const nameCard = document.querySelector(".cardholder-name");
const numberCard = document.querySelector(".card-number");
const month = document.querySelector(".label-grid-input");
const year = document.querySelector(".label-grid-input--2");
const cvc = document.querySelector(".input-grid");
const codeNumbers = document.querySelectorAll(".numbers");
const infoName = document.querySelector(".name");
const infoDate = document.querySelector(".date");
const secondCardNum = document.querySelector(".second-card .num");
const formBox = document.querySelector(".form-container-box");
const thankBox = document.querySelector(".thank-container");
let count = 0;

const fillName = (nameCard) => {
  infoName.innerText = nameCard.toUpperCase();
  count++;
};

const fillNumbers = (Number) => {
  let joinedNumber = Number.split(" ").join("");
  let isnum = /^\d+$/.test(joinedNumber);
  if (!isnum) {
    let HTML = `<p class="card-number-inner">Wrong format, numbers only</p>`;
    numberCard.closest(".form-container").insertAdjacentHTML("beforeend", HTML);
  }
  codeNumbers.forEach((codeNumber, i) => {
    let trueNumber = joinedNumber.slice(4 * i, 4 * i + 4);
    codeNumber.innerText = trueNumber;
  });
  count++;
};

const fillDate = (month, year) => {
  infoDate.innerText = `${month}/${year}`;
  if (month) count++;
  if (year) count++;
};

const fillCvc = (cvc) => {
  secondCardNum.innerText = cvc;
  count++;
};

const clearAll = (Name, Number, Month, Year, Cvc) => {
  Name.value = Number.value = Month.value = Year.value = Cvc.value = "";
  console.log(count);
};

const cantBeBlacnk = (...outputs) => {
  outputs.forEach((output) => {
    if (!output.value) {
      let HTML = `<p class="card-number-inner">Can't be blank</p>`;
      let checker = output.parentElement.querySelector(".card-number-inner");

      if (output.parentElement.classList.contains("form-grid")) {
        output.parentElement.insertAdjacentHTML("beforeend", HTML);
      } else {
        checker
          ? ""
          : output.parentElement.insertAdjacentHTML("beforeend", HTML);
      }
      output.style = "border:1px solid hsl(0, 100%, 66%)";
    }
  });
};

const sendData = (count) => {
  if (count === 5) {
    formBox.classList.add("hidden");
    thankBox.classList.remove("hidden");
  }
};

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let Name = nameCard.value;
  let Number = numberCard.value;
  let Month = month.value;
  let Year = year.value;
  let Cvc = cvc.value;

  if (Name && Number && Month && Year && Cvc) {
    fillName(Name);
    fillNumbers(Number);
    fillDate(Month, Year);
    fillCvc(Cvc);
    clearAll(nameCard, numberCard, month, year, cvc);
    sendData(count);
  } else {
    cantBeBlacnk(nameCard, numberCard, month, year, cvc);
  }
});
