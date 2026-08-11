"use strict";
//
// *** *** *** *** *** *** *** *** DOM Refs
//
const inputs = document.querySelectorAll("input");
const inputValues = {
    loanDisplay: document.getElementById("loan-display"),
    interestDisplay: document.getElementById("interest-display"),
    insuranceDisplay: document.getElementById("insurance-display"),
    durationDisplay: document.getElementById("duration-display"),
};
const customThumb = {
    loanThumb: document.querySelector(".loan-chevron"),
    interestThumb: document.querySelector(".interest-chevron"),
    insuranceThumb: document.querySelector(".insurance-chevron"),
    durationThumb: document.querySelector(".duration-chevron"),
};
const monthlyPaymentMain = document.getElementById("monthlyPayment--main");
const amountResult = document.getElementById("amount-result");
const monthlyPaymentSecondary = document.getElementById("monthlyPayment--secondary");
const monthlyInsurance = document.getElementById("monthlyInsurance");
const totalAmount = document.getElementById("totalAmount");
const totalInsurance = document.getElementById("totalInsurance");
// Valeurs par défaut
let results = {
    loan: 10000,
    interest: 3.14,
    insurance: 0.48,
    duration: 5,
};
//
// *** *** *** *** *** *** *** *** Inputs
//
inputs.forEach((input) => {
    // Affichage valeurs par défaut au lancement de l'app
    displayInputValue(`${input.id}Display`, Number(input.value));
    updateValues(input.id, Number(input.value));
    handleThumbPosition(`${input.id}Thumb`, Number(input.value), Number(input.min), Number(input.max));
    // Mise en place écouteurs d'évènement
    input.addEventListener("input", handleInput);
});
function handleInput(e) {
    const target = e.target;
    displayInputValue(`${target.id}Display`, Number(target.value));
    updateValues(target.id, Number(target.value));
    handleThumbPosition(`${target.id}Thumb`, Number(target.value), Number(target.min), Number(target.max));
    updateResults();
}
function displayInputValue(targetKey, targetValue) {
    inputValues[targetKey].textContent = new Intl.NumberFormat().format(targetValue);
}
function handleThumbPosition(thumbKey, targetValue, targetMin, targetMax) {
    const ratio = (targetValue - targetMin) / (targetMax - targetMin);
    customThumb[thumbKey].style.left = `${ratio * 100}%`;
}
//
// *** *** *** *** *** *** *** *** Results
//
function updateValues(targetKey, targetValue) {
    results[targetKey] = targetValue;
}
function updateResults() {
    monthlyPaymentMain.textContent = new Intl.NumberFormat().format(Math.round(getMensuality().result));
    amountResult.textContent = inputValues.loanDisplay.textContent;
    monthlyPaymentSecondary.textContent = monthlyPaymentMain.textContent;
    monthlyInsurance.textContent = getMensuality().insurance.toString();
    totalAmount.textContent = new Intl.NumberFormat().format(getTotal().result);
    totalInsurance.textContent = new Intl.NumberFormat().format(getTotal().insurance);
}
updateResults();
function getMensuality() {
    const capital = results.loan;
    const mensualities = results.duration * 12;
    const monthlyRate = results.interest / 100 / 12;
    const monthlyCostInsurance = (results.insurance * capital) / 100 / 12;
    let finalResult;
    monthlyRate === 0
        ? (finalResult = capital / mensualities + monthlyCostInsurance)
        : (finalResult = (capital * monthlyRate)
            / (1 - Math.pow(1 + monthlyRate, -mensualities))
            + monthlyCostInsurance);
    return {
        result: finalResult,
        insurance: Math.round((results.insurance * results.loan) / 100 / 12),
    };
}
function getTotal() {
    const totalCost = Math.round(getMensuality().result * (results.duration * 12));
    const annualCostInsurance = (results.insurance * results.loan) / 100;
    return {
        result: totalCost - results.loan,
        insurance: annualCostInsurance * results.duration,
    };
}
