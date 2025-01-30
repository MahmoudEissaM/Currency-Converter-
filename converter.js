let dollar = document.getElementById("dollar");
let pound = document.getElementById("pound");

let exchangeRate = 50.86;

const API_URL = "https://v6.exchangerate-api.com/v6/9918867e0b9130a0f9ce5d90/latest/USD";

fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        if (data?.conversion_rates?.EGP) {
            exchangeRate = data.conversion_rates.EGP;
            console.log("Live Exchange Rate:", exchangeRate);
        } else {
            console.error("Error fetching exchange rate:", data);
        }
    })
    .catch((err) => console.error("Failed to fetch exchange rate:", err));

function convertDollarToPound() {
    let usd = parseFloat(dollar.value);
    if (!isNaN(usd) && usd >= 0) {
        pound.value = (usd * exchangeRate).toFixed(2);
    } else {
        pound.value = "";
    }
}

function convertPoundToDollar() {
    let egp = parseFloat(pound.value);
    if (!isNaN(egp) && egp >= 0) {
        dollar.value = (egp / exchangeRate).toFixed(2);
    } else {
        dollar.value = "";
    }
}

dollar.addEventListener("input", convertDollarToPound);
pound.addEventListener("input", convertPoundToDollar);

[dollar, pound].forEach((input) => {
    input.addEventListener("focus", () => (input.style.border = "6px solid #000"));
    input.addEventListener("blur", () => (input.style.border = "none"));
});
