document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');

    function handleClick(event) {
        const buttonValue = event.target.innerText;
        switch (buttonValue) {
            case 'C':
                clearDisplay();
                break;
            case 'DEL':
                deleteLastChar();
                break;
            case '=':
                calculate();
                break;
            default:
                appendToDisplay(buttonValue);
        }
    }

    function appendToDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function deleteLastChar() {
        if (display.value.length > 0) {
            display.value = display.value.slice(0, -1);
        }
    }

    function calculate() {
        try {
            // Reemplazar operadores no estándar con los estándares de JavaScript
            let sanitizedInput = display.value.replace(/÷/g, '/');
            sanitizedInput = sanitizedInput.replace(/×/g, '*'); // Si usas '×' para multiplicación
            sanitizedInput = sanitizedInput.replace(/–/g, '-'); // Si usas '–' para resta

            // Reemplazar el porcentaje con el divisor de 100
            sanitizedInput = sanitizedInput.replace(/(\d+)%/g, '($1 / 100)');

            // Reemplaza caracteres no válidos
            sanitizedInput = sanitizedInput.replace(/[^0-9+\-*/().]/g, '');

            // Evaluar la expresión
            const result = eval(sanitizedInput);
            display.value = isFinite(result) ? result : 'Error';
        } catch (error) {
            display.value = 'Error';
        }
    }

    // Establecer eventos de clic en los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
    });
});

