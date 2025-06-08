// Navigation Script
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Hamburger menu toggle functionality
hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// Function to show/hide app sections
function showApp(appName) {
    // Hide all app sections
    const allSections = document.querySelectorAll('.app-section');
    allSections.forEach(section => section.classList.remove('active'));
    
    // Show selected app
    document.getElementById(appName + '-app').classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Project 1: Temperature Converter Functions
function convertTemperature() {
    const inputTemp = parseFloat(document.getElementById('inputTemp').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultElement = document.getElementById('conversionResult');
    
    if (isNaN(inputTemp)) {
        resultElement.textContent = "Please enter a valid number";
        return;
    }

    let result;
    let formula = "";
    
    // Conversion formulas
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        result = (inputTemp * 9/5) + 32;
        formula = `(${inputTemp} × 9/5) + 32`;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        result = (inputTemp - 32) * 5/9;
        formula = `(${inputTemp} - 32) × 5/9`;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        result = inputTemp + 273.15;
        formula = `${inputTemp} + 273.15`;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        result = inputTemp - 273.15;
        formula = `${inputTemp} - 273.15`;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        result = (inputTemp - 32) * 5/9 + 273.15;
        formula = `(${inputTemp} - 32) × 5/9 + 273.15`;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        result = (inputTemp - 273.15) * 9/5 + 32;
        formula = `(${inputTemp} - 273.15) × 9/5 + 32`;
    } else {
        result = inputTemp; // Same unit conversion
    }

    resultElement.innerHTML = `${inputTemp}° ${fromUnit.charAt(0).toUpperCase()} = ${result.toFixed(2)}° ${toUnit.charAt(0).toUpperCase()}<br><small>Formula: ${formula || 'No conversion needed'}</small>`;
}

function clearTemperature() {
    document.getElementById('inputTemp').value = '';
    document.getElementById('conversionResult').textContent = '';
}

// Project 2: Expense Tracker Functions
let expenses = [];
let totalExpense = 0;

function addExpense() {
    const description = document.getElementById('expenseDescription').value.trim();
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('expenseDate').value || new Date().toISOString().split('T')[0];
    
    if (!description || isNaN(amount)) {
        alert('Please enter valid description and amount');
        return;
    }

    const expense = {
        id: Date.now(),
        description,
        amount,
        category,
        date
    };

    expenses.push(expense);
    totalExpense += amount;
    updateExpenseList();
    updateSummary();
    clearExpenseForm();
}

function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td><button onclick="deleteExpense(${expense.id})" class="delete-button">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });
}

function deleteExpense(id) {
    const expenseIndex = expenses.findIndex(exp => exp.id === id);
    if (expenseIndex > -1) {
        totalExpense -= expenses[expenseIndex].amount;
        expenses.splice(expenseIndex, 1);
        updateExpenseList();
        updateSummary();
    }
}

function updateSummary() {
    document.getElementById('totalExpenses').textContent = totalExpense.toFixed(2);
    document.getElementById('expenseCount').textContent = expenses.length;
}

function clearExpenseForm() {
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = 'food';
    document.getElementById('expenseDate').value = '';
}

function filterExpenses() {
    const categoryFilter = document.getElementById('filterCategory').value;
    const filtered = categoryFilter === 'all' 
        ? expenses 
        : expenses.filter(exp => exp.category === categoryFilter);
    
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    
    filtered.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.description}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td><button onclick="deleteExpense(${expense.id})" class="delete-button">Delete</button></td>
        `;
        expenseList.appendChild(row);
    });
}

// Project 3: Scientific Calculator Functions - Part 1
let memory = 0;
let currentInput = "0";
let lastOperation = "";

const display = document.getElementById('display');
const history = document.getElementById('history');

function appendToDisplay(value) {
    if (currentInput === "0" && value !== ".") {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = "0";
    display.value = currentInput;
    history.textContent = "";
}

function clearAll() {
    clearDisplay();
    memory = 0;
}

function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    display.value = currentInput;
}

function calculate() {
    try {
        const result = eval(currentInput);
        history.textContent = currentInput;
        display.value = result;
        currentInput = result.toString();
        lastOperation = "";
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}
function calculateSquareRoot() {
    try {
        const result = Math.sqrt(eval(currentInput));
        history.textContent = `√(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculatePower() {
    try {
        history.textContent = `pow(${currentInput},`;
        lastOperation = "pow";
        currentInput = "0";
        display.value = currentInput;
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateSin() {
    try {
        const result = Math.sin(eval(currentInput));
        history.textContent = `sin(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateCos() {
    try {
        const result = Math.cos(eval(currentInput));
        history.textContent = `cos(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateTan() {
    try {
        const result = Math.tan(eval(currentInput));
        history.textContent = `tan(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateLog() {
    try {
        const result = Math.log10(eval(currentInput));
        history.textContent = `log(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateLn() {
    try {
        const result = Math.log(eval(currentInput));
        history.textContent = `ln(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateAbsolute() {
    try {
        const result = Math.abs(eval(currentInput));
        history.textContent = `abs(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateRound() {
    try {
        const result = Math.round(eval(currentInput));
        history.textContent = `round(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateFloor() {
    try {
        const result = Math.floor(eval(currentInput));
        history.textContent = `floor(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateCeil() {
    try {
        const result = Math.ceil(eval(currentInput));
        history.textContent = `ceil(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function addToMemory() {
    memory += parseFloat(display.value);
}

function subtractFromMemory() {
    memory -= parseFloat(display.value);
}

function recallMemory() {
    display.value = memory;
    currentInput = memory.toString();
}

function clearMemory() {
    memory = 0;
}

function insertPi() {
    if (currentInput === "0") {
        currentInput = Math.PI.toString();
    } else {
        currentInput += Math.PI.toString();
    }
    display.value = currentInput;
}

function insertE() {
    if (currentInput === "0") {
        currentInput = Math.E.toString();
    } else {
        currentInput += Math.E.toString();
    }
    display.value = currentInput;
}

function calculateFactorial() {
    try {
        let num = parseInt(eval(currentInput));
        if (num < 0) {
            display.value = "Error";
            currentInput = "0";
            return;
        }
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        history.textContent = `${num}!`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculatePercentage() {
    try {
        const result = eval(currentInput) / 100;
        history.textContent = `${currentInput}%`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

function calculateReciprocal() {
    try {
        const result = 1 / eval(currentInput);
        history.textContent = `1/(${currentInput})`;
        display.value = result;
        currentInput = result.toString();
    } catch (e) {
        display.value = "Error";
        currentInput = "0";
    }
}

// Initialize apps
window.addEventListener('load', function() {
    display.value = "0";
    updateSummary();
    
    // Set default date to today in expense tracker
    document.getElementById('expenseDate').value = new Date().toISOString().split('T')[0];
    
    // Initialize temperature converter display
    document.getElementById('conversionResult').textContent = '';
});
