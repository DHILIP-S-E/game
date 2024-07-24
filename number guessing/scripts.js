document.addEventListener('DOMContentLoaded', () => {
    const setRangeButton = document.getElementById('setRange');
    const guessSubmit = document.getElementById('guessSubmit');
    const lowerBoundField = document.getElementById('lowerBound');
    const upperBoundField = document.getElementById('upperBound');
    const guessField = document.getElementById('guessField');
    const gameSection = document.querySelector('.game-section');
    const guessesDisplay = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    
    let randomNumber;
    let maxGuesses;
    let guesses = 0;

    function startGame() {
        const lowerBound = parseInt(lowerBoundField.value, 10);
        const upperBound = parseInt(upperBoundField.value, 10);

        if (isNaN(lowerBound) || isNaN(upperBound) || lowerBound >= upperBound) {
            alert('Please enter valid bounds (lower bound must be less than upper bound).');
            return;
        }

        // Calculate maximum number of guesses allowed
        maxGuesses = Math.ceil(Math.log2(upperBound - lowerBound + 1));
        randomNumber = Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
        guesses = 0;

        gameSection.style.display = 'block';
        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.focus();

        // Attach the guessSubmit event listener once when the game starts
        guessSubmit.removeEventListener('click', handleGuess); // Remove any previous listener
        guessSubmit.addEventListener('click', handleGuess);
    }

    function handleGuess() {
        const userGuess = parseInt(guessField.value, 10);
        guesses++;
        guessesDisplay.textContent = `Guesses: ${guesses}/${maxGuesses}`;

        if (isNaN(userGuess)) {
            lastResult.textContent = 'Please enter a valid number.';
            lowOrHi.textContent = '';
            return;
        }

        if (userGuess === randomNumber) {
            lastResult.textContent = `Congratulations! You guessed it right in ${guesses} guesses!`;
            lowOrHi.textContent = '';
            endGame();
        } else if (guesses >= maxGuesses) {
            lastResult.textContent = '!!!GAME OVER!!!';
            lowOrHi.textContent = `The correct number was ${randomNumber}.`;
            endGame();
        } else if (userGuess < randomNumber) {
            lastResult.textContent = 'Wrong!';
            lowOrHi.textContent = 'Last guess was too low!';
        } else {
            lastResult.textContent = 'Wrong!';
            lowOrHi.textContent = 'Last guess was too high!';
        }
        guessField.value = '';
        guessField.focus();
    }

    function endGame() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        const resetButton = document.getElementById('resetButton');
        if (!resetButton) {
            createResetButton();
        }
    }

    function createResetButton() {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Start new game';
        resetButton.id = 'resetButton';
        document.body.appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        guesses = 0;
        lastResult.textContent = '';
        lowOrHi.textContent = '';
        guessesDisplay.textContent = 'Guesses: 0';
        gameSection.style.display = 'none';
        guessField.disabled = true;
        guessSubmit.disabled = true;
        lowerBoundField.value = '';
        upperBoundField.value = '';
        const resetButton = document.getElementById('resetButton');
        if (resetButton) {
            resetButton.remove();
        }
    }

    setRangeButton.addEventListener('click', startGame);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default form submission
            const activeElement = document.activeElement;
            if (activeElement.id === 'lowerBound') {
                document.getElementById('upperBound').focus();
            } else if (activeElement.id === 'upperBound') {
                setRangeButton.click();
                document.getElementById('guessField').focus();
            } else if (activeElement.id === 'guessField') {
                guessSubmit.click();
            }
        }
    });
});
