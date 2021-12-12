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


// Logic --------------------------------

// getting references to elements
const resultEl = document.getElementById("result");
const operationEl = document.getElementById("operator");
const firstNumEl = document.getElementById("first-number");
const secondNumEl = document.getElementById("second-num");

const operations = {
    addition: '+',
    subtraction: '-',
    division: '÷',
    multiplication: '×'
};

let firstNum = '';
let secondNum = null;
let operation = null;

function result() {
    if (secondNum === null || secondNum === '' || !operation) return firstNum || 0;
    switch (operation) {
        case operations.addition:
            return (+firstNum) + (+secondNum);
        case operations.subtraction:
            return (+firstNum) - (+secondNum);
        case operations.division:
            return (+firstNum) / (+secondNum);
        case operations.multiplication:
            return (+firstNum) * (+secondNum);
    }
}

function updateView() {
    resultEl.innerText = result();

    operationEl.innerText = operation || '';
    firstNumEl.innerText = firstNum || '';
    secondNumEl.innerText = secondNum === null ? '' : secondNum;
}

function onNumberClicked(number) {
    if (!operation) {
        //if (i === 0 && !firstNum) return;
        firstNum += number;
        if (firstNum.startsWith('0') && firstNum.length > 1) firstNum = firstNum.slice(1)

    } else {
        if(+number === 0 && operation === operations.division) return;
        secondNum += number;
        if (secondNum.startsWith('0') && secondNum.length > 1) secondNum = secondNum.slice(1)
    }

    updateView();
}

for (let i = 0; i <= 9; i++) {
    numBtns[i].onclick = () => onNumberClicked(i);
}

onkeydown = (e) => {
    if (e.key >= 0 && e.key <= 9) {
        onNumberClicked(+e.key);
    }
    switch (e.key) {
        case 'Backspace':
            if (operation) {
                if (secondNum.length) {
                    secondNum = secondNum.slice(0, secondNum.length - 1);
                    updateView();
                }
            } else {
                if (firstNum.length) {
                    firstNum = firstNum.slice(0, firstNum.length - 1);
                    updateView();
                }
            }
            break;
        case '+':
            onOperatorClicked(operations.addition)
            break;
        case '-':
            onOperatorClicked(operations.subtraction)
            break;
        case '/':
            onOperatorClicked(operations.division)
            break;
        case '*':
            onOperatorClicked(operations.multiplication)
            break;
    }

}

function onOperatorClicked(clickedOperation) {
    if (firstNum === '') return;

    if (secondNum === null) {
        secondNum = '';
    } else {
        firstNum = result();
        secondNum = '';
    }
    operation = clickedOperation;
    updateView();
}

plusBtn.onclick = () => onOperatorClicked(operations.addition);
minusBtn.onclick = () => onOperatorClicked(operations.subtraction)
divideBtn.onclick = () => onOperatorClicked(operations.division)
multiplicationBtn.onclick = () => onOperatorClicked(operations.multiplication)

clearBtn.onclick = () => {
    firstNum = '';
    secondNum = null;
    operation = null;
    updateView();
}


//updateView();

