// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen")
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text")
const guessContainer = document.getElementById("guess-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const progressBar = document.getElementById("progress");
const finalScoreSpan = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const maxScoreSpan = document.getElementById("max-score");
const restartButton = document.getElementById("restart-btn");
const guessInput = document.getElementById("guess-input");
const submitGuessButton = document.getElementById("submit-guess");
const resultParagraph = document.querySelector("#result-screen p");

// Game Data (Questions / Players)

const players = [
	{ 
		answer: "Luka Doncic",
		hints: [
			"I have 5 first team ALL-NBA selections.",
			"I'm the only player in NBA history with over 20 triple-doubles at age 21 or younger.",
			"My career avergaes are 28.9, 8.6, and 8.2.",
			"I was traded on draft night.",
			"I am the system."
		]
	},
	{
		answer: "Ben Wallace",
		hints: [
			"I went undrafted in 1996.",
			"I played for 5 different NBA teams during my career.",
			"I have won the DPOY award 4 times.",
			"My career averages are 5.7 points, 9.6 rebounds, and 1.3 assists.",
			"I have one ring."
		]
	},
	{
		answer: "Dirk Nowitzki",
		hints: [
			"At the time of my retirment, I was the only player in NBA history with 30,000 points and 1,900 made threes.",
			"My career free throw percentage is 87.9%.",
			"I have one career triple-double.",
			"During my championship run, I averaged 27.7 points on 61% true shooting.",
			"Some say my ring weighs the most."
		]
	},
	{
		answer: "Brandon Ingram",
		hints: [
			"Most Improved Player in 2020.",
			"I was a part of the 2016 NBA draft.",
			"I have played on a total of 3 teams.",
			"My career averages are 19.7 points, 5.2 rebounds, and 4.3 assists.",
			"I am a two time all-star."
		]
	},
	{
		answer: "Ja Morant",
		hints: [
			"I became the fifth-youngest player in NBA history to lead a playoff team in both points per game and assists per game during the regular season.",
			"My recruitment to college was accidental.",
			"I am sponsored by Nike.",
			"My team is in rebuild mode.",
			"It's a parade inside my city."
		]
	},
	{
		answer: "Jayson Tatum",
		hints: [
			"I am the youngest player to ever score at least 20 points in four consecutive playoff games.",
			"I idolize Kobe.",
			"My career averages are 23.6 points, 7.3 rebounds, and 3.8 assists.",
			"My team is always contending.",
			"We did it... WE DID IT!!"
		]
	},
	{
		answer: "Nikola Jokic",
		hints: [
			"I am on pace to lead the league in two major stat categories this season, first in NBA history.",
			"Winning Gold in the Olympics would mean a lot.",
			"The All-Star game is when I see my friends.",
			"I hold the record for fastest triple double (14mins).",
			"I like horse racing."
		]
	},
	{
		answer: "Kyrie Irving",
		hints: [
			"I am a 9 time all-star.",
			"I am the greatest at a certain skill in basketball.",
			"My stylish finishes are underrated.",
			"I have and exceeded at being a veteran leader for my team.",
			"I am arguably one of the best 4th quarter players of all time."
		]
	},
	{
		answer: "Lou Williams",
		hints: [
			"Drake has used my name in a song before... Quite catchy.",
			"I scored 40 points in back to back G-leagues and never returned.",
			"I was the 45th overall pick.",
			"I am an undersized tough shot-maker.",
			"I am one of, if not, the best 6th man of all time."
		]
	}
];

// Game State Variables
let currentPlayerIndex;
let currentHintIndex;
let score;
let playerOrder = [];
let playerOrderIndex = 0;

function initPlayerOrder() {
	playerOrder = players.map((_, i) => i);
	// Fisher-Yates shuffle
	for (let i = playerOrder.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[playerOrder[i], playerOrder[j]] = [playerOrder[j], playerOrder[i]];
	}
	playerOrderIndex = 0;
}

// Functions
function startQuiz() {
	resetGameState()
	// hide start screen
    startScreen.classList.remove("active");
	resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

	scoreSpan.textContent = score;
	resultMessage.textContent = "Good job!";

	guessInput.value = "";
	guessInput.focus();
	showHint();
}

function showHint() {
	const currentPlayer = players[currentPlayerIndex]

	questionText.textContent = currentPlayer.hints[currentHintIndex];
	currentQuestionSpan.textContent = currentHintIndex + 1;
	totalQuestionsSpan.textContent = currentPlayer.hints.length;
}

startButton.addEventListener("click", startQuiz);
submitGuessButton.addEventListener("click", checkInput);

function checkInput() {
	const guess = guessInput.value.trim().toLowerCase();
	const correctAnswer = players[currentPlayerIndex].answer.toLowerCase();

	if (guess === correctAnswer) {
		score++
		scoreSpan.textContent = score;

		endQuiz();
	} else {

		currentHintIndex++;
		if (currentHintIndex < players[currentPlayerIndex].hints.length) {
			showHint();
		} else {
			failQuiz();
		}
	}

	guessInput.value = "";
}

function failQuiz() {
	quizScreen.classList.remove("active");
	resultScreen.classList.add("active");

	resultParagraph.textContent = "Too many hints, the player was: " + players[currentPlayerIndex].answer;

	resultMessage.textContent = "You didn't guess the player!";
	finalScoreSpan.textContent = score;
	maxScoreSpan.textContent = players[currentPlayerIndex].hints.length;
}

function endQuiz() {
	quizScreen.classList.remove("active");
	resultScreen.classList.add("active");
	finalScoreSpan.textContent = score;
	resultParagraph.textContent = "You guessed the player: " + players[currentPlayerIndex].answer;
	resultMessage.textContent = "Nice! You guessed correctly!";
	maxScoreSpan.textContent = players[currentPlayerIndex].hints.length;
}

function resetGameState() {
    score = 0;
    currentHintIndex = 0;
	if (playerOrder.length === 0) initPlayerOrder();
	currentPlayerIndex = playerOrder[playerOrderIndex];
	playerOrderIndex++;
	if (playerOrderIndex >= playerOrder.length) initPlayerOrder();
}

restartButton.addEventListener("click", startQuiz)
