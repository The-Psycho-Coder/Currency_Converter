const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const bttn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const mssg = document.querySelector(".mssg");

for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.updateFlag);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

bttn.addEventListener("click", async (event) => {

    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if(amountVal === "" || amountVal < 1) 
    {
          amountVal = 1;
          amount.value = "1";
    }

    let FROM = fromCurr.value.toLowerCase();
    let TO = toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${FROM}/${TO}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[TO];

    let finalAmount = amountVal * rate;
    mssg.innerText = `${amountVal} ${FROM} = ${finalAmount} ${TO}`;

});