const currencyAPI = 'https://open.er-api.com/v6/latest';

const dropdowns = document.getElementsByClassName("dropdown");
const msg = document.querySelector("#exchange-rate");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const btn = document.querySelector(".convert-button");
const symbol = document.querySelector("#currency-symbol");
const finalAmount = document.querySelector("#final-amount");
const icon = document.querySelector("#icon");

for(let dropdown of dropdowns){
    for(let country in countrylist){
        let element = document.createElement("option");
        element.value = country;
        element.innerText = country;
        if(dropdown.name === "from" && country === "USD"){
            element.selected = "selected";
        }
        if(dropdown.name === "to" && country === "INR"){
            element.selected = "selected";
        }
        dropdown.append(element);
    }
    dropdown.addEventListener("change",(evt) => {
        if(dropdown.name === "from") updateSymbol(evt.target);
        updateFlag(evt.target);
    });
}

const currencyConvert = async () => {
    let amtElement = document.querySelector("input");
    let amount = amtElement.value;
    if(amount === "" || amount < 1){
        amount = 1;
    }
    let API = `${currencyAPI}/${fromCurr.value}`;
    let response = await fetch(API);
    let data = await response.json();;
    let rate = Math.round(data.rates[toCurr.value]*100)/100; // Bracket Notation
    
    let finalAmt = amount * rate;
    msg.innerText = `Rate of Exchange: 1 ${fromCurr.value} = ${rate} ${toCurr.value}`;

    finalAmount.innerText = `${amount} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

const updateSymbol = (element) => {
    symbol.innerText = element.value;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countrylist[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", () => {
    currencyConvert();
})

window.addEventListener("load",() => {
    currencyConvert();
})

icon.addEventListener("click", () => {
    let value = toCurr.value;
    toCurr.value = fromCurr.value;
    fromCurr.value = value;
    updateFlag(toCurr);
    updateFlag(fromCurr);
})