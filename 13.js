const walletEl = document.getElementById("wallet");

const BANK_NOTES = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];

const payedNumbersOfBanknotes = [];
for (let i = 0; i < BANK_NOTES.length; i++) {
    let bankNote = BANK_NOTES[i];

    const imgElement = document.createElement("img");
    imgElement.src = `13/${bankNote}.png`;
    walletEl.append(imgElement);

    imgElement.onclick = () => {
        payedNumbersOfBanknotes[i]++;
        updateView();
    }

    payedNumbersOfBanknotes.push(0);
}

const sumTableEl = document.getElementById("sum-table");
const sumEl = document.getElementById("sum-money");
const payEl = document.getElementById("pay");
const resetBtn = document.getElementById("reset");


let moneyToPay = 50000 + (Math.round(Math.random() * 10000) * 5)

function updateView() {
    // generate table
    let content = "";

    content += "<tr>";
    for (let i = 0; i < BANK_NOTES.length; i++) {
        content += `<th>${BANK_NOTES[i]} Ft-os</th>`;
    }
    content += "</tr>";

    content += "<tr>";
    for (let i = 0; i < BANK_NOTES.length; i++) {
        content += `<td>${payedNumbersOfBanknotes[i]} db</td>`;
    }
    content += "</tr>";

    sumTableEl.innerHTML = content;

    let sum = 0;
    for (let i = 0; i < BANK_NOTES.length; i++) {
        sum += BANK_NOTES[i] * payedNumbersOfBanknotes[i];
    }
    sumEl.innerText = sum;

    if (sum > moneyToPay) {
        alert("Túl sokat adtál!");
    } else if (sum === moneyToPay) {
        alert("Sikeres fizetés! Köszönjük vásárlását!");
    }
    payEl.innerText = moneyToPay;

}

updateView();

resetBtn.onclick = () => {
    for (let i = 0; i < payedNumbersOfBanknotes.length; i++) {
        payedNumbersOfBanknotes[i] = 0;
    }
    updateView();
}