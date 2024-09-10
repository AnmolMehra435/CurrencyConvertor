const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select");
const comment = document.querySelector(".comment");
const result = document.querySelector(".result")

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (e) =>{
       updateFlag(e.target)
    });
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newFlag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newFlag;
}

btn.addEventListener("click", (e)=>{
  e.preventDefault();
  let ammount = input.value;
  if(ammount === "" || ammount < 1){
    ammount = 1;
    input.value = "1";
  }
  console.log(fromCurr.value, toCurr.value);
  getRate();
})


const URL = "https://api.exchangerate-api.com/v4/latest/USD"

async function getRate() {
    let response = await fetch(URL);
    let data = await response.json();
    let firstRate = data.rates[fromCurr.value];
    let secondRate = data.rates[toCurr.value];
    let ammount = input.value;
    let firstExchange = ammount / firstRate;
    let secondExchange = firstExchange * secondRate;
    console.log(secondExchange);
    result.innerText = `${ammount} ${fromCurr.value} = ${secondExchange} ${toCurr.value}`

    // new function

    let value = secondRate / firstRate;
    let statement = `1 ${fromCurr.value} = ${value} ${toCurr.value}`;
    comment.innerText = statement; 
}

window.addEventListener("load", () =>{
   comment.innerText = "1 USD = 83.98 INR"
});