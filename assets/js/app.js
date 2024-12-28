const clickBtns = document.querySelectorAll(".box");
const resetBtn = document.querySelector('.reset');
const msg = document.querySelector('#msg');
const msgContainer = document.querySelector('.msg-container');

let turn0 = true;
let gameWon = false;  

const winCases = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

clickBtns.forEach((clickBtn) => {
    clickBtn.addEventListener("click", () => {
        if (clickBtn.innerHTML !== '' || gameWon) return;  

        if (turn0) {
            clickBtn.innerHTML = 'O';
            clickBtn.style.color = 'red';
            clickBtn.style.fontSize = '40px';
            turn0 = false;
        } else {
            clickBtn.innerHTML = 'X';
            clickBtn.style.color = 'blue';
            clickBtn.style.fontSize = '40px';
            turn0 = true;
        }

        checkWinner();
    });
});

const disableAllBoxes = () => {
    clickBtns.forEach((clickBtn) => {
        clickBtn.disabled = true;
    });
};

const showWinner = (winner) => {
    msg.innerHTML = `${winner} wins!`;
    msgContainer.style.display = 'block';
    msgContainer.classList.remove('hidden');
    gameWon = true;  
    disableAllBoxes();
};

const checkWinner = () => {
    for (let pattern of winCases) {
        let pos1Val = clickBtns[pattern[0]].innerHTML;
        let pos2Val = clickBtns[pattern[1]].innerHTML;
        let pos3Val = clickBtns[pattern[2]].innerHTML;

        if (pos1Val === '' || pos2Val === '' || pos3Val === '') {
            continue;
        }

        if (pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log(`${pos1Val} wins!`);
            showWinner(pos1Val);
            return;
        }
    }
};

resetBtn.addEventListener('click', () => {
    clickBtns.forEach((clickBtn) => {
        clickBtn.innerHTML = '';
        clickBtn.disabled = false;
    });
    msgContainer.style.display = 'none';
    turn0 = true;
    gameWon = false;  
    console.log("Boxes reset!");
});
