const bill = document.querySelector("#bill-score");
const tips = document.querySelectorAll(".tip");
const numberPeople = document.querySelector("#number");

const tipAmount = document.querySelector(".summary-amount");
const total = document.querySelector(".summary-person");

const resetBtn = document.querySelector(".reset");

let actuallyTip = 0.05;

const checkValue = (value, min) => {
  const parent = value.parentElement;
  if (Number(value.value) <= min) {
    parent.previousElementSibling.textContent = `Can't be zero`;
    parent.previousElementSibling.style.visibility = "visible";
    parent.style.border = "1px solid red";
  } else {
    parent.previousElementSibling.textContent = ``;
    parent.previousElementSibling.style.visibility = "hidden";
    parent.style.border = "none";
  }
};

const calc = (bill, tip, number) => {
  const score = Number(bill) + Number(bill) * Number(tip);
  const scorePerPerson = score / Number(number);
  if (
    score > 0 &&
    score !== Infinity &&
    scorePerPerson > 0 &&
    scorePerPerson !== Infinity
  ) {
    total.textContent = "$" + score.toFixed(2);
    tipAmount.textContent = "$" + scorePerPerson.toFixed(2);
  } else {
    total.textContent = "$- --";
    tipAmount.textContent = "$- --";
  }
};

tips.forEach((tip) => {
  tip.addEventListener("click", (e) => {
    tips.forEach((tip) => {
      tip.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.classList.contains("tip--custom")) {
      tip.addEventListener("input", () => {
        actuallyTip = Number(e.target.value) / 100;
        calcAllTip();
      });
    } else {
      actuallyTip = Number(e.target.textContent.slice(0, -1)) / 100;
      calcAllTip();
    }
  });
});

const calcAllTip = () => {
  checkValue(bill, 0);
  checkValue(numberPeople, 0);
  calc(bill.value, actuallyTip, numberPeople.value);
};

const reset = () => {
  bill.value = "";
  numberPeople.value = "";
  tips.forEach((tip) => {
    tip.classList.remove("active");
  });
  actuallyTip = 0;
  total.textContent = `$- --`;
  tipAmount.textContent = `$- --`;
};

bill.addEventListener("input", () => {
  calcAllTip();
});

numberPeople.addEventListener("input", () => {
  calcAllTip();
});

resetBtn.addEventListener("click", reset);
