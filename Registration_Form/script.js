const container = document.getElementById('container');
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');
const header = document.querySelector('#header');

const questions = [
    {question: 'Please enter your first name'},
    {question: 'Please enter your last name'},
    {question: 'Please enter your email', pattern: /\S+@\S+\.\S+/}, // matches anystring@anystring.anystring
    {question: 'Please create a password', type: 'password'}
];

// Transition times
const shakeTime = 100; // Shake transition time
const switchTime = 200; // Transition between questions

// Initialize position as first question
let position = 0;

// Events
document.addEventListener('DOMContentLoaded', getQuestion);

// Allow for clicking of the enter button to validate
inputField.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
        validate();
    };
});

// Get question from array
function getQuestion() {
    // Get current question
    inputLabel.innerHTML = questions[position].question;
    // Get current type
    inputField.type = questions[position].type || 'text';
    // Get current answer
    inputField.value = questions[position].answer || '';
    // Focus on element
    inputField.focus();
    // Set progress bar width - Variable to questions array length
    progress.style.width = (position * 100) / questions.length + ' %';
    // Add user icon or back arrow depending on question number
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
    showQuestion();
};

//Input question text styling
inputLabel.style.color = 'grey';
inputLabel.style.textShadow = '1px 1px black';

// Next Button Click
nextBtn.addEventListener('click', validate);

// Display question to user
function showQuestion() {
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
};

// Hide question from user
function hideQuestion() {
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
};

// Transform to create shake motion 
function transform(x, y) {
    formBox.style.transform = `translate(${x}px, ${y}px)`;
};

// Validation field. Match input pattern
function validate() {
    if (!inputField.value.match(questions[position].pattern || /.+/ )) {
        inputFail();
        inputLabel.innerHTML = 'Please enter a valid email address';
        inputLabel.style.color = 'red';
        inputLabel.style.fontSize = '105%';
    } else {
        inputLabel.style.color = 'grey';
        inputLabel.style.textShadow = '.5px .5px black';
        inputLabel.style.size = '100%';
        inputPass();
    }
};

// Input field failed
function inputFail() {
    formBox.className = 'error';
        for (let i = 0; i < 10; i++) {
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
        setTimeout(transform, shakeTime * 10, 0, 0);
        inputField.focus();    
    }; 
};

// Input field passed
function inputPass() {
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    // Store answers in array
    questions[position].answer = inputField.value;

    // Increment position to change the question
    position++

    // If new question hide current question and get new question
    if (questions[position]) {
        hideQuestion();
        getQuestion();
    } else { // Remove if no more questions
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';
        // Form is complete
        formComplete();
        setTimeout(() => {
            formBox.className = 'closed';
        }, 1000);
    };
};

// Display message
function formComplete() {
    
    const h1 = document.createElement('h1');
    h1.addClass = 'end';
    h1.appendChild(document.createTextNode(`Thanks for registering ${questions[0].answer}!`));
    h1.style.color = '#fff';
    h1.style.textShadow = '2px 2px black';

    setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    header.style.background = 'none';
    document.body.classList.add('finish');
    setTimeout(() => (h1.style.opacity = 1), 50);
  }, 1000);
};