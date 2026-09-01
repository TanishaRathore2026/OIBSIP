const display = document.getElementById("display");
const expression = document.getElementById("expression");

const buttons = document.querySelectorAll(".key");

const historyContainer = document.getElementById("history");
const clearHistoryButton = document.getElementById("clearHistory");

const themeToggle = document.getElementById("themeToggle");

let currentInput = "";
let previousInput = "";
let operator = "";

let history = [];


/* =========================
   DISPLAY
========================= */

function updateDisplay(value) {

    display.value = value || "0";
}


/* =========================
   NUMBER INPUT
========================= */

function handleNumber(value) {

    if (currentInput === "Error") {
        currentInput = "";
    }

    if (value === "." && currentInput.includes(".")) {
        return;
    }

    if (currentInput === "" && value === ".") {
        currentInput = "0.";
    } else {
        currentInput += value;
    }

    updateDisplay(currentInput);
}


/* =========================
   OPERATORS
========================= */

function handleOperator(selectedOperator) {

    if (currentInput === "" && previousInput === "") {
        return;
    }

    if (currentInput !== "" && previousInput !== "") {

        calculate();

    }

    previousInput = currentInput || previousInput;

    currentInput = "";

    operator = selectedOperator;

    expression.textContent =
        `${previousInput} ${displayOperator(operator)}`;
}


/* =========================
   OPERATOR SYMBOL
========================= */

function displayOperator(op) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };

    return symbols[op] || op;
}


/* =========================
   CALCULATION
========================= */

function calculate() {

    if (previousInput === "" || currentInput === "" || operator === "") {
        return;
    }

    const firstNumber = parseFloat(previousInput);
    const secondNumber = parseFloat(currentInput);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                showError("Cannot divide by zero");
                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    result = Number(result.toFixed(10));

    const calculationExpression =
        `${previousInput} ${displayOperator(operator)} ${currentInput}`;

    addToHistory(calculationExpression, result);

    expression.textContent = calculationExpression;

    currentInput = String(result);

    previousInput = "";

    operator = "";

    updateDisplay(currentInput);
}


/* =========================
   CLEAR
========================= */

function clearCalculator() {

    currentInput = "";
    previousInput = "";
    operator = "";

    expression.textContent = "";

    display.classList.remove("error");

    updateDisplay("0");
}


/* =========================
   DELETE
========================= */

function deleteLastCharacter() {

    if (currentInput === "Error") {

        clearCalculator();

        return;
    }

    currentInput = currentInput.slice(0, -1);

    updateDisplay(currentInput);
}


/* =========================
   ERROR
========================= */

function showError(message) {

    currentInput = "Error";

    display.value = message;

    display.classList.add("error");

    previousInput = "";
    operator = "";

    setTimeout(() => {

        display.classList.remove("error");

        clearCalculator();

    }, 1600);
}


/* =========================
   HISTORY
========================= */

function addToHistory(calculation, result) {

    history.unshift({
        calculation,
        result
    });

    if (history.length > 8) {
        history.pop();
    }

    renderHistory();
}


function renderHistory() {

    historyContainer.innerHTML = "";

    if (history.length === 0) {

        historyContainer.innerHTML =
            `<p class="empty-history">No calculations yet</p>`;

        return;
    }

    history.forEach(item => {

        const historyItem = document.createElement("div");

        historyItem.className = "history-item";

        historyItem.innerHTML = `
            <span class="history-expression">
                ${item.calculation}
            </span>

            <span class="history-result">
                ${item.result}
            </span>
        `;

        historyContainer.appendChild(historyItem);

    });
}


clearHistoryButton.addEventListener("click", () => {

    history = [];

    renderHistory();

});


/* =========================
   BUTTON EVENTS
========================= */

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        const action = button.dataset.action;


        if (value !== undefined) {

            if (
                ["+", "-", "*", "/", "%"].includes(value)
            ) {

                handleOperator(value);

            } else {

                handleNumber(value);

            }

            return;
        }


        if (action === "clear") {

            clearCalculator();

        }

        else if (action === "delete") {

            deleteLastCharacter();

        }

        else if (action === "calculate") {

            calculate();

        }

    });

});


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {

    const key = event.key;


    if (
        !isNaN(key) ||
        key === "."
    ) {

        handleNumber(key);

    }

    else if (
        ["+", "-", "*", "/", "%"].includes(key)
    ) {

        handleOperator(key);

    }

    else if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        deleteLastCharacter();

    }

    else if (key === "Escape") {

        clearCalculator();

    }

});


/* =========================
   THEME TOGGLE
========================= */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    themeToggle.textContent =
        document.body.classList.contains("light")
            ? "☾"
            : "☀";

});