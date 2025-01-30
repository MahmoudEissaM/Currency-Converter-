const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const swapButton = document.getElementById('swapCurrencies');
const API_URL = 'https://v6.exchangerate-api.com/v6/9918867e0b9130a0f9ce5d90/latest/USD';
let exchangeRates = {};

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        if (data.conversion_rates) {
            exchangeRates = data.conversion_rates;
            populateCurrencyOptions(Object.keys(exchangeRates));
        }
    })
    .catch(err => console.error("Failed to fetch exchange rates:", err));

function populateCurrencyOptions(currencies) {
    currencies.forEach(currency => {
        let option1 = new Option(currency, currency);
        let option2 = new Option(currency, currency);
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });
    fromCurrency.value = "USD";
    toCurrency.value = "EGP";
}

function convertCurrency() {
    let from = fromCurrency.value;
    let to = toCurrency.value;
    let amountValue = parseFloat(amount.value);
    if (isNaN(amountValue) || amountValue <= 0) {
        result.innerText = "Please enter a valid amount";
        return;
    }
    let rate = exchangeRates[to] / exchangeRates[from];
    let convertedAmount = (amountValue * rate).toFixed(2);
    result.innerText = `${amountValue} ${from} = ${convertedAmount} ${to}`;
}

function swapCurrencies() {
    let temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
}

amount.addEventListener('input', convertCurrency);
fromCurrency.addEventListener('change', convertCurrency);
toCurrency.addEventListener('change', convertCurrency);
swapButton.addEventListener('click', swapCurrencies);

$(document).ready(function () {
    $('.select2').select2({
        width: '100%',
        placeholder: "Select a currency",
        allowClear: true
    });
});