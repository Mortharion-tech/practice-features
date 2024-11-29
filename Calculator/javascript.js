const buttons = document.querySelectorAll('.btn');
const display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            operator = null;
            previousInput = '';
            display.value = '';
        } else if (value === '=') {
            if (operator && previousInput !== '') {
                currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
                display.value = currentInput;
                operator = null;
                previousInput = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput !== '') {
                operator = value;
                previousInput = currentInput;
                currentInput = '';
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});