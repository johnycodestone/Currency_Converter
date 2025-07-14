const BASE_URL = 'https://latest.currency-api.pages.dev/v1/currencies/eur.json';

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msgPara = document.querySelector(".msg-p");
const btn = document.querySelector("form button");

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    let response = await fetch(BASE_URL);
    let data = await response.json();
    console.log("Data: \n");
    console.log(data);
    let fromRate = data.eur[`${fromCurr.value.toLowerCase()}`];
    console.log("From: \n");
    console.log(fromRate);
    let toRate = data.eur[`${toCurr.value.toLowerCase()}`];
    console.log("To: \n");
    console.log(toRate);

    let finalAmount = (toRate/fromRate) * amtVal;
    msgPara.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault(); // To avoid default behaviour of reloading of page
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
})
