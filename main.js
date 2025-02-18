let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceCount = document.getElementById("chance-count");
let answerDisplay = document.getElementById("correct-answer");
let chances = 3;
let gameOver = false;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
});

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    answerDisplay.textContent = "❓"; // 정답 숨김
    console.log("정답: ", computerNum);
}

function play() {
    let userValue = Number(userInput.value);

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "⚠️ 1~100 사이 숫자를 입력하세요!";
        return;
    }
    if (history.includes(userValue)) {
        resultArea.textContent = "🚫 이미 입력한 숫자입니다!";
        return;
    }

    chances--;
    chanceCount.textContent = chances;

    if (userValue < computerNum) {
        resultArea.textContent = "🔼 UP! 조금 더 높은 숫자를 입력해보세요!";
    } else if (userValue > computerNum) {
        resultArea.textContent = "🔽 DOWN! 조금 더 낮은 숫자를 입력하세요!";
    } else {
        resultArea.innerHTML = "🎉 정답입니다! 축하해요! 🎊";
        answerDisplay.textContent = `🎯 ${computerNum}`;
        gameOver = true;
    }

    history.push(userValue);

    if (chances < 1) {
        gameOver = true;
        resultArea.textContent = `💥 게임 오버! 정답: ${computerNum}`;
        answerDisplay.textContent = `🎯 ${computerNum}`;
    }

    if (gameOver) {
        playButton.disabled = true;
    }
}

function reset() {
    userInput.value = "";
    chances = 3;
    gameOver = false;
    history = [];
    playButton.disabled = false;
    chanceCount.textContent = chances;
    resultArea.textContent = "게임을 다시 시작했습니다!";
    pickRandomNum();
}

pickRandomNum();