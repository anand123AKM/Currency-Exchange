const URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ZHGIODyJUZwVaEfAW9QHlx7DhiWgyPABuLnbC9MD";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurrency = document.querySelector(".from select");
const tocurrency = document.querySelector(".to select");

for (let select of dropdown) {
  for (let currcode in countryList) {
    let option = document.createElement("option");
    option.innerText = currcode;
    option.text = currcode;
    if (select.name === "from" && currcode === "USD") {
      option.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      option.selected = "selected";
    }
    select.appendChild(option);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (eleement) => {
  let currcode = eleement.value;
  let countrycode = countryList[currcode];
  document.getElementsByClassName("toimg");
  document.getElementsByClassName("fromimg");
  let newSrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
  let newSrc2 = `https://flagsapi.com/${countrycode}/shiny/64.png`;
  if (eleement.name === "from") {
    document.querySelector(".fromimg").src = newSrc;
  } else {
    document.querySelector(".toimg").src = newSrc2;
  }
};

const convertCurrency = async () => {
  const FC = fromcurrency.value;
  const TC = tocurrency.value;
  let amount = document.querySelector(".amount input");
  let codeinp = document.getElementsByClassName("codeinp")[0];
  codeinp.value = FC;
  let amtval = amount.value;
  if (amtval === "" || amtval < 0) {
    amount.value = "1";
  }

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.data[TC] / data.data[FC];
  let result = rate * amtval;
  let val = document.querySelector(".msg input");
  val.value = ` ${result} ${TC}`;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  convertCurrency();
});

window.addEventListener("load", async () => {
  convertCurrency();
});
