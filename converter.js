let dollar = document.getElementById('dollar');
let pound = document.getElementById('pound');

let exchangeRate = 50.86;


const API_URL = ' https://v6.exchangerate-api.com/v6/9918867e0b9130a0f9ce5d90/latest/USD';

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        if (data && data.conversion_rates && data.conversion_rates.EGP) {
            exchangeRate = data.conversion_rates.EGP;
            console.log("Live Exchange Rate:", exchangeRate);
        } else {
            console.error("Error fetching exchange rate:", data);
        }
    })
    .catch(err => {
        console.error("Failed to fetch exchange rate:", err);
    });


dollar.onkeyup = () => {
    pound.value = (dollar.value * exchangeRate).toFixed(2);
};

dollar.onfocus = () => {
    dollar.style.border = '6px solid #000';
};

dollar.onblur = () => {
    dollar.style.border = 'none';
};

pound.onfocus = () => {
    pound.style.border = '6px solid #000';
};

pound.onblur = () => {
    pound.style.border = 'none';
};

pound.onkeyup = () => {
    dollar.value = (pound.value / exchangeRate).toFixed(2);
};
