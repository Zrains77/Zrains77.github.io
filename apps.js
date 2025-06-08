/* 
=====================================================================
CS 111 LAB 9: MULTI-APP JAVASCRIPT PORTFOLIO
=====================================================================
*/

// ==================== NAVIGATION SYSTEM ====================
/*
Teacher's Note: 
The navigation system uses querySelectorAll to select multiple elements
and classList methods to dynamically show/hide content. Key concepts:
- querySelectorAll returns a NodeList (similar to an array)
- classList.add/remove/toggle manipulate CSS classes
- The hamburger menu uses event listeners for mobile responsiveness
*/

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Hamburger menu toggle functionality
hamburger.addEventListener('click', () => {
    // Toggle mobile menu visibility
    navMenu.classList.toggle('active');
    // Animate hamburger icon
    hamburger.classList.toggle('active');
});

/**
 * Shows the selected application and hides others
 * @param {string} appName - The ID prefix of the app to show
 * 
 * Teacher's Note:
 * This function demonstrates three key concepts:
 * 1. Using querySelectorAll to get all app sections
 * 2. Using forEach to iterate through a NodeList
 * 3. String concatenation to build dynamic IDs (appName + '-app')
 */
function showApp(appName) {
    // Step 1: Hide all app sections
    document.querySelectorAll('.app-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Step 2: Show the selected app
    const activeApp = document.getElementById(`${appName}-app`);
    if (activeApp) {
        activeApp.classList.add('active');
    }
    
    // Step 3: Close mobile menu if open
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    // Initialize app-specific functionality if needed
    if (appName === 'contacts') initContacts();
    if (appName === 'calculator') initCalculator();
}

// ==================== TEMPERATURE CONVERTER ====================
/*
Teacher's Note:
This app demonstrates:
- Form input handling
- Mathematical calculations
- DOM manipulation based on user input
*/

function convertTemperature() {
    // Get user inputs
    const tempValue = parseFloat(document.getElementById('tempValue').value);
    const fromScale = document.getElementById('fromScale').value;
    const toScale = document.getElementById('toScale').value;
    const resultElement = document.getElementById('tempResult');

    // Validate input
    if (isNaN(tempValue)) {
        resultElement.textContent = "Please enter a valid number";
        return;
    }

    // Convert to Celsius first (intermediate step)
    let tempInCelsius;
    switch(fromScale) {
        case 'celsius': tempInCelsius = tempValue; break;
        case 'fahrenheit': tempInCelsius = (tempValue - 32) * 5/9; break;
        case 'kelvin': tempInCelsius = tempValue - 273.15; break;
    }

    // Convert from Celsius to target scale
    let result;
    switch(toScale) {
        case 'celsius': result = tempInCelsius; break;
        case 'fahrenheit': result = (tempInCelsius * 9/5) + 32; break;
        case 'kelvin': result = tempInCelsius + 273.15; break;
    }

    // Display result with proper symbols
    const symbols = { celsius: '°C', fahrenheit: '°F', kelvin: 'K' };
    resultElement.textContent = `${tempValue.toFixed(2)}${symbols[fromScale]} = ${result.toFixed(2)}${symbols[toScale]}`;
}

function resetTemperature() {
    // Reset form and result display
    document.getElementById('tempValue').value = '';
    document.getElementById('fromScale').value = 'celsius';
    document.getElementById('toScale').value = 'fahrenheit';
    document.getElementById('tempResult').textContent = '';
}

// ==================== MAGIC 8 BALL ====================
/*
Teacher's Note:
This app demonstrates:
- Array manipulation
- Random selection
- CSS class toggling for animations
- History tracking
*/

const answers = [
    "It is certain", "It is decidedly so", "Without a doubt", "Yes definitely",
    "You may rely on it", "As I see it, yes", "Most likely", "Outlook good",
    "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later",
    "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
    "Don't count on it", "My reply is no", "My sources say no",
    "Outlook not so good", "Very doubtful"
];

let questionHistory = [];

function shakeBall() {
    const questionInput = document.getElementById('8ball-question');
    const answerDisplay = document.getElementById('8ball-answer');
    const ball = document.getElementById('8ball');
    
    // Validate input
    if (!questionInput.value.trim()) {
        alert("Please ask a question first!");
        return;
    }

    // Add to history and update display
    questionHistory.unshift(questionInput.value);
    updateQuestionHistory();

    // Animate ball and show answer after delay
    ball.classList.add('shake');
    setTimeout(() => {
        ball.classList.remove('shake');
        const randomIndex = Math.floor(Math.random() * answers.length);
        answerDisplay.textContent = answers[randomIndex];
        document.getElementById('answer-window').style.display = 'block';
    }, 1000);
}

function updateQuestionHistory() {
    const historyList = document.getElementById('question-history');
    historyList.innerHTML = '';
    // Show last 5 questions
    questionHistory.slice(0, 5).forEach(question => {
        const li = document.createElement('li');
        li.textContent = question;
        li.className = 'history-item';
        historyList.appendChild(li);
    });
}

// ==================== WELLNESS TRACKER ====================
/*
Teacher's Note:
This app demonstrates:
- Object creation and array manipulation
- Form validation
- Dynamic DOM element creation
- Local data management (no persistence)
*/

let wellnessActivities = [];

function addWellnessActivity() {
    const activityInput = document.getElementById('activity-input');
    const durationInput = document.getElementById('duration-input');
    const typeSelect = document.getElementById('activity-type');
    
    // Validate inputs
    if (!activityInput.value.trim() || !durationInput.value) {
        alert("Please fill in all fields");
        return;
    }

    // Create new activity object
    const newActivity = {
        id: Date.now(), // Unique identifier
        name: activityInput.value.trim(),
        duration: parseInt(durationInput.value),
        type: typeSelect.value,
        date: new Date().toLocaleDateString()
    };

    // Add to array and update display
    wellnessActivities.push(newActivity);
    renderWellnessActivities();
    
    // Clear form
    activityInput.value = '';
    durationInput.value = '';
    typeSelect.value = 'exercise';
}

function renderWellnessActivities() {
    const activitiesList = document.getElementById('activities-list');
    
    // Display message if no activities, otherwise render list
    activitiesList.innerHTML = wellnessActivities.length === 0 ? 
        '<p>No activities logged yet</p>' :
        wellnessActivities.map(activity => `
            <div class="activity-item">
                <h3>${activity.name}</h3>
                <p>Duration: ${activity.duration} minutes</p>
                <p>Type: ${activity.type}</p>
                <p>Date: ${activity.date}</p>
                <button onclick="deleteWellnessActivity(${activity.id})">Delete</button>
            </div>
        `).join('');
}

function deleteWellnessActivity(id) {
    // Filter out the activity to delete
    wellnessActivities = wellnessActivities.filter(activity => activity.id !== id);
    renderWellnessActivities();
}

// ==================== TIMER ====================
/*
Teacher's Note:
This app demonstrates:
- setInterval for timing functionality
- Time calculations and formatting
- Audio API for sound effects
*/

let timerInterval;
let timerSeconds = 0;
let isTimerRunning = false;

function startCountdown() {
    // Get user inputs
    const hours = parseInt(document.getElementById('timer-hours').value) || 0;
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    
    // Calculate total seconds
    timerSeconds = hours * 3600 + minutes * 60 + seconds;
    
    // Validate input
    if (timerSeconds <= 0) {
        alert("Please enter a valid time");
        return;
    }

    // Clear existing timer if running
    if (isTimerRunning) clearInterval(timerInterval);

    isTimerRunning = true;
    updateTimerDisplay();
    
    // Start countdown
    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();
        
        // Handle timer completion
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            document.getElementById('timer-sound').play();
            document.getElementById('timer-motivation').textContent = "Time's up! Great job!";
        }
    }, 1000);
}

function updateTimerDisplay() {
    // Convert seconds to HH:MM:SS format
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    
    // Update display with leading zeros
    document.getElementById('timer-display').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    // Clear timer and reset display
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerSeconds = 0;
    document.getElementById('timer-display').textContent = "00:00:00";
    document.getElementById('timer-hours').value = '';
    document.getElementById('timer-minutes').value = '';
    document.getElementById('timer-seconds').value = '';
    document.getElementById('timer-motivation').textContent = '';
}

function pauseTimer() {
    // Pause timer if running
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}
// ==================== NATO CONVERTER ====================
/*
Teacher's Note:
This app demonstrates:
- Object lookup tables
- String manipulation
- Character-by-character processing
*/

const natoAlphabet = {
    'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
    'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
    'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
    'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
    'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
    'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
    '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight',
    '9': 'Nine', ' ': '(Space)'
};

function verbalize() {
    const inputText = document.getElementById('nato-input').value.toUpperCase();
    let output = '';
    
    // Process each character
    for (let char of inputText) {
        if (natoAlphabet[char]) {
            output += natoAlphabet[char] + ' ';
        } else if (char === ' ') {
            output += '(Space) ';
        } else {
            output += `[${char}] `; // Handle unsupported characters
        }
    }
    
    // Display result
    document.getElementById('nato-output').textContent = output.trim();
}

// ==================== SCIENTIFIC CALCULATOR ====================
/*
Teacher's Note:
This app demonstrates:
- Object-oriented approach
- Complex mathematical operations
- Event delegation pattern
- Memory functions
*/

let calculator = {
    currentInput: '0',
    previousInput: null,
    operation: null,
    memory: 0,
    
    reset: function() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        updateCalculatorDisplay();
    },
    
    calculate: function() {
        let result;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '×': result = prev * current; break;
            case '÷': result = prev / current; break;
            case 'x^y': result = Math.pow(prev, current); break;
            default: return;
        }
        
        this.currentInput = result.toString();
        this.operation = null;
        this.previousInput = null;
        updateCalculatorDisplay();
    }
};

// Initialize calculator event listeners
function initCalculator() {
    updateCalculatorDisplay();
    
    // Number buttons (0-9)
    for (let i = 0; i <= 9; i++) {
        document.getElementById(`btn-${i}`).addEventListener('click', () => {
            appendNumber(i);
        });
    }
    
    // Operation buttons
    document.getElementById('btn-add').addEventListener('click', () => setOperation('+'));
    document.getElementById('btn-subtract').addEventListener('click', () => setOperation('-'));
    document.getElementById('btn-multiply').addEventListener('click', () => setOperation('×'));
    document.getElementById('btn-divide').addEventListener('click', () => setOperation('÷'));
    document.getElementById('btn-equals').addEventListener('click', () => calculator.calculate());
    document.getElementById('btn-clear').addEventListener('click', () => calculator.reset());
    document.getElementById('btn-decimal').addEventListener('click', () => appendDecimal());
    document.getElementById('btn-plusminus').addEventListener('click', () => toggleSign());
    document.getElementById('btn-percent').addEventListener('click', () => applyPercentage());
    document.getElementById('btn-sqrt').addEventListener('click', () => squareRoot());
    document.getElementById('btn-pow').addEventListener('click', () => setOperation('x^y'));
    document.getElementById('btn-fact').addEventListener('click', () => factorial());
    document.getElementById('btn-sin').addEventListener('click', () => trigonometricFunction('sin'));
    document.getElementById('btn-cos').addEventListener('click', () => trigonometricFunction('cos'));
    document.getElementById('btn-tan').addEventListener('click', () => trigonometricFunction('tan'));
    document.getElementById('btn-ln').addEventListener('click', () => naturalLog());
    document.getElementById('btn-log').addEventListener('click', () => log10());
    document.getElementById('btn-pi').addEventListener('click', () => appendPi());
    document.getElementById('btn-e').addEventListener('click', () => appendE());
    document.getElementById('btn-reciprocal').addEventListener('click', () => reciprocal());
    
    // Memory functions
    document.getElementById('btn-mc').addEventListener('click', () => memoryClear());
    document.getElementById('btn-mr').addEventListener('click', () => memoryRecall());
    document.getElementById('btn-ms').addEventListener('click', () => memoryStore());
    document.getElementById('btn-m-plus').addEventListener('click', () => memoryAdd());
    document.getElementById('btn-m-minus').addEventListener('click', () => memorySubtract());
}

// Helper functions for calculator
function updateCalculatorDisplay() {
    document.getElementById('calc-display').value = calculator.currentInput;
    document.getElementById('calc-history').textContent = 
        calculator.previousInput ? `${calculator.previousInput} ${calculator.operation || ''}` : '';
}

function appendNumber(number) {
    if (calculator.currentInput === '0') {
        calculator.currentInput = number.toString();
    } else {
        calculator.currentInput += number.toString();
    }
    updateCalculatorDisplay();
}

function appendDecimal() {
    if (!calculator.currentInput.includes('.')) {
        calculator.currentInput += '.';
        updateCalculatorDisplay();
    }
}

function setOperation(op) {
    if (calculator.currentInput === '0') return;
    
    if (calculator.operation !== null) {
        calculator.calculate();
    }
    
    calculator.previousInput = calculator.currentInput;
    calculator.operation = op;
    calculator.currentInput = '0';
    updateCalculatorDisplay();
}

// Additional calculator functions would go here (toggleSign, applyPercentage, etc.)

// ==================== CONTACTS MANAGER ====================
/*
Teacher's Note:
This app demonstrates:
- Tabbed interface
- Form handling
- Basic CRUD operations
- Data validation
*/

let contacts = [];

function initContacts() {
    // Load sample contacts if empty
    if (contacts.length === 0) {
        contacts = [
            { id: 1, name: "John Doe", email: "john@example.com", phone: "555-1234", type: "work" },
            { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "555-5678", type: "personal" }
        ];
    }
    
    // Set up event listeners
    document.getElementById('contact-form').addEventListener('submit', saveContact);
    document.getElementById('search-input').addEventListener('input', searchContacts);
    
    // Initial render
    renderContacts();
}

function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Activate selected tab
    document.getElementById(`${tabId}-contacts`).classList.add('active');
    document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`).classList.add('active');
}

function saveContact(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const type = document.getElementById('contact-type').value;
    
    // Validate required fields
    if (!name || !email) {
        alert("Name and email are required");
        return;
    }
    
    // Create or update contact
    const contactId = document.getElementById('contact-id')?.value;
    if (contactId) {
        // Update existing contact
        const index = contacts.findIndex(c => c.id == contactId);
        if (index !== -1) {
            contacts[index] = { id: contactId, name, email, phone, type };
        }
    } else {
        // Add new contact
        const newContact = {
            id: Date.now(),
            name,
            email,
            phone,
            type
        };
        contacts.push(newContact);
    }
    
    // Reset form and update display
    e.target.reset();
    renderContacts();
    switchTab('view');
}

function renderContacts() {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<p>No contacts found</p>';
        return;
    }
    
    contacts.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            ${contact.phone ? `<p>Phone: ${contact.phone}</p>` : ''}
            <p>Type: ${contact.type}</p>
            <div class="button-group">
                <button onclick="editContact(${contact.id})">Edit</button>
                <button onclick="deleteContact(${contact.id})" class="delete-button">Delete</button>
            </div>
        `;
        contactsList.appendChild(contactCard);
    });
}

function searchContacts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filtered = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm) || 
        contact.email.toLowerCase().includes(searchTerm) ||
        (contact.phone && contact.phone.includes(searchTerm))
    );
    
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    
    filtered.forEach(contact => {
        const contactCard = document.createElement('div');
        contactCard.className = 'contact-card';
        contactCard.innerHTML = `
            <h3>${contact.name}</h3>
            <p>Email: ${contact.email}</p>
            ${contact.phone ? `<p>Phone: ${contact.phone}</p>` : ''}
            <p>Type: ${contact.type}</p>
        `;
        contactsList.appendChild(contactCard);
    });
}

function editContact(id) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;
    
    // Fill form with contact data
    document.getElementById('contact-name').value = contact.name;
    document.getElementById('contact-email').value = contact.email;
    document.getElementById('contact-phone').value = contact.phone || '';
    document.getElementById('contact-type').value = contact.type;
    
    // Add hidden ID field if not exists
    if (!document.getElementById('contact-id')) {
        const idInput = document.createElement('input');
        idInput.type = 'hidden';
        idInput.id = 'contact-id';
        idInput.value = id;
        document.getElementById('contact-form').appendChild(idInput);
    } else {
        document.getElementById('contact-id').value = id;
    }
    
    switchTab('add');
}

function deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact?")) {
        contacts = contacts.filter(contact => contact.id !== id);
        renderContacts();
    }
}

// Initialize the first app when page loads
document.addEventListener('DOMContentLoaded', () => {
    showApp('temperature');
});
