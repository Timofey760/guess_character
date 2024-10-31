let score = 0;
let currentCharacter;

const characters = [
    { name: 'Бран Старк', image: '1.webp' },
    { name: 'Лианна Старк', image: '2.webp' },
    { name: 'Серсея Ланнистер', image: '3.webp' },
    { name: 'Санса Старк', image: '4.webp' },
    { name: 'Эйрис II Таргариен', image: '5.webp' },
    { name: 'Дейнерис Таргариен', image: '6.webp' },
    { name: 'Джон Сноу', image: '7.webp' },
    { name: 'Рейгар Таргариен', image: '8.webp' }
];

function getRandomCharacter() {
    return characters[Math.floor(Math.random() * characters.length)];
}

function getRandomOptions(excludedCharacter) {
    const options = [...characters].filter(character => character.name !== excludedCharacter.name);
    const randomOptions = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        randomOptions.push(options[randomIndex]);
        options.splice(randomIndex, 1);
    }
    randomOptions.push(excludedCharacter);
    for (let i = randomOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomOptions[i], randomOptions[j]] = [randomOptions[j], randomOptions[i]];
    }
    return randomOptions;
}

function loadQuestion() {
    currentCharacter = getRandomCharacter();
    const options = getRandomOptions(currentCharacter);

    document.getElementById('characterImage').src = currentCharacter.image;
    document.getElementById('questionText').innerText = 'Who is this character?';

    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach((button, index) => {
        button.innerText = options[index].name;
        button.setAttribute('data-answer', options[index].name);
    });
}

function checkAnswer(button) {
    const selectedAnswer = button.getAttribute('data-answer');
    if (selectedAnswer === currentCharacter.name) {
        score += 2;
    } else {
        score -= 1;
    }
    document.getElementById('score').innerText = score;
    Swal.fire({
        title: 'Result',
        text: `Your answer: ${selectedAnswer}\nCorrect answer: ${currentCharacter.name}\nCurrent score: ${score}`,
        icon: selectedAnswer === currentCharacter.name ? 'success' : 'error',
        confirmButtonText: 'OK'
    });
}

function nextQuestion() {
    loadQuestion();
}

// Load the first question when the page loads
window.onload = loadQuestion;
