const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: 0
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>", "<link>"],
    answer: 0
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "bgcolor", "background-color", "background"],
    answer: 2
  },
  {
    question: "Which JavaScript method is used to write into the browser console?",
    options: ["console.log()", "document.write()", "alert()", "log.console()"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<hyper>"],
    answer: 1
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["var myVar", "v myVar", "variable myVar", "declare myVar"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: 0
  },
  {
    question: "Which CSS property is used to make text bold?",
    options: ["font-weight", "bold", "text-style", "font-style"],
    answer: 0
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: 0
  },
  {
    question: "Which tag is used to create a table in HTML?",
    options: ["<table>", "<tab>", "<tr>", "<td>"],
    answer: 0
  },
  {
    question: "Which CSS property is used to center text?",
    options: ["text-align", "align-text", "center", "font-align"],
    answer: 0
  },
  {
    question: "How do you call a function in JavaScript?",
    options: ["call functionName()", "functionName()", "run functionName()", "start functionName()"],
    answer: 1
  },
  {
    question: "Which tag is used to define a list item in HTML?",
    options: ["<li>", "<ul>", "<ol>", "<list>"],
    answer: 0
  },
  {
    question: "Which CSS property sets the space between lines?",
    options: ["line-height", "spacing", "text-spacing", "margin"],
    answer: 0
  },
  {
    question: "Which keyword is used to define a constant in JavaScript?",
    options: ["let", "var", "const", "define"],
    answer: 2
  },
  {
    question: "Which tag is used to define a paragraph in HTML?",
    options: ["<p>", "<para>", "<text>", "<paragraph>"],
    answer: 0
  },
  {
    question: "Which CSS property is used to set the margin?",
    options: ["margin", "padding", "space", "border"],
    answer: 0
  },
  {
    question: "Which method is used to select an element by ID in JavaScript?",
    options: ["getElementById()", "querySelector()", "getId()", "selectId()"],
    answer: 0
  },
  {
    question: "Which tag is used to define a heading in HTML?",
    options: ["<h1>", "<head>", "<heading>", "<title>"],
    answer: 0
  }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const questionNumberEl = document.getElementById("question-number");
const questionsLeftEl = document.getElementById("questions-left");
const progressBar = document.getElementById("progress-bar");
const endScreen = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const timesupSound = document.getElementById("timesup-sound");
const tickSound = document.getElementById("tick-sound");

function startTimer() {
  timeLeft = 15;
  updateTimerUI();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    // ticking sound
    tickSound.currentTime = 0;
    tickSound.play();

    if (timeLeft === 0) {
      clearInterval(timer);
      feedbackEl.textContent = "⏰ Time's up!";
      timesupSound.play();
      disableChoices();
      highlightCorrect();
      nextBtn.disabled = false;
    }
  }, 1000);
}

function updateTimerUI() {
  timeEl.textContent = timeLeft;

  timeEl.classList.remove("low", "critical");
  if (timeLeft <= 5) {
    timeEl.classList.add("critical");
  } else if (timeLeft <= 10) {
    timeEl.classList.add("low");
  }
}

function loadQuestion() {
  clearInterval(timer);
  startTimer();

  const q = questions[currentIndex];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => selectAnswer(i);
    choicesEl.appendChild(li);
  });

  questionNumberEl.textContent = `Question ${currentIndex + 1}`;
  questionsLeftEl.textContent = `Questions left: ${questions.length - currentIndex - 1}`;
  nextBtn.disabled = true;

  // progress bar
  const progressPercent = (currentIndex / questions.length) * 100;
  progressBar.style.width = progressPercent + "%";
}

function selectAnswer(i) {
  clearInterval(timer);
  const correctIndex = questions[currentIndex].answer;
  const choices = document.querySelectorAll("#choices li");

  choices.forEach((li, idx) => {
    li.onclick = null;
    if (idx === correctIndex) {
      li.classList.add("correct");
    } else if (idx === i) {
      li.classList.add("wrong");
    }
  });

  if (i === correctIndex) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
    scoreEl.textContent = `Score: ${score}`;
    correctSound.play();
  } else {
    feedbackEl.textContent = "❌ Wrong!";
    wrongSound.play();
  }

  nextBtn.disabled = false;
}

function disableChoices() {
  document.querySelectorAll("#choices li").forEach(li => li.onclick = null);
}

function highlightCorrect() {
  const correctIndex = questions[currentIndex].answer;
  const choices = document.querySelectorAll("#choices li");
  choices.forEach((li, i) => {
    if (i === correctIndex) {
      li.classList.add("correct");
    }
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  clearInterval(timer);
  questionEl.style.display = "none";
  choicesEl.style.display = "none";
  feedbackEl.style.display = "none";
  nextBtn.style.display = "none";
  timeEl.style.display = "none";
  questionNumberEl.style.display = "none";
  questionsLeftEl.style.display = "none";
  progressBar.style.width = "100%";

  endScreen.style.display = "block";
  finalScoreEl.textContent = `Your final score is ${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";

  questionEl.style.display = "block";
  choicesEl.style.display = "block";
  feedbackEl.style.display = "block";
  nextBtn.style.display = "block";
  timeEl.style.display = "block";
  questionNumberEl.style.display = "block";
  questionsLeftEl.style.display = "block";

  endScreen.style.display = "none";

  loadQuestion();
});

loadQuestion();
