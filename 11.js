// Init View ------------------------------

const cont = document.getElementById("cont");

let numBtns = [];
for (let i = 1; i <= 9; i++) {
    const btn = document.createElement("button");
    btn.innerText = String(i);
    numBtns[i] = btn;
    cont.append(btn);
}

const minusBtn = document.createElement("button");
minusBtn.innerText = "-";
cont.append(minusBtn);

const zeroBtn = document.createElement("button");
zeroBtn.innerText = "0";
cont.append(zeroBtn);
numBtns[0] = zeroBtn;

const plusBtn = document.createElement("button");
plusBtn.innerText = "+";
cont.append(plusBtn);

const divideBtn = document.createElement("button");
divideBtn.innerText = "÷";
cont.append(divideBtn);

const clearBtn = document.createElement("button");
clearBtn.innerText = "CE";
clearBtn.id = "clear-btn";
cont.append(clearBtn);

const multiplicationBtn = document.createElement("button");
multiplicationBtn.innerText = "×";
cont.append(multiplicationBtn);