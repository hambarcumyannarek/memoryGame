
class DrowCardsObj {
    constructor(name, src) {
        this.name = name;
        this.img = src;
    }
}

let arr = [
    new DrowCardsObj('google', 'images/google.png'),
    new DrowCardsObj('js', 'images/js.png'),
    new DrowCardsObj('node', 'images/node.png'),
    new DrowCardsObj('c++', 'images/c++.png'),
    new DrowCardsObj('java', 'images/java.png'),
    new DrowCardsObj('react', 'images/react.png'),
    new DrowCardsObj('python', 'images/python.png')
];

const container = document.querySelector('.cards');


// drow is call startGame Function
function drow(cardCount) {
    for(let i = 0; i < cardCount; i++) {
        container.innerHTML += `
        <div class="card">
            <div class="front"><img src="images/head.png"></div>
            <div class="back"><img id="backImg" src="" alt="..."></div>
        </div>
        `
    }
}


let cards;
let img;
function randomInclude() {
    let imgArr = [];
    img.forEach(img => imgArr.push(img));
     for(let i = 0; i < cards.length/2; i++) {
        let randomObj = Math.floor(Math.random() * arr.length);
        for(let k = 0; k < 2; k++) {
            function imgDownload() {
                let randomCard = Math.floor(Math.random() * cards.length);
                if(img[randomCard].getAttribute('src') === '') {
                    img[randomCard].src = arr[randomObj].img;
                    img[randomCard].setAttribute('name', arr[randomObj].name)
                } else {
                    if(imgArr.some(img => img.getAttribute('src') === '')) {
                        imgDownload();
                    }
                }
            }

            imgDownload();
        }
    }
}


function activeCards() {
    let firstChild;
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('active');
            function asinc() {
                return new Promise((resolve, reverse) => {
                    id = setTimeout(() => {
                        resolve()
                    }, 500);
                })
            }

            asinc().then(() => {
                if(card.querySelector('.back img').getAttribute('name') === (firstChild === undefined ? false : firstChild.querySelector('.back img').getAttribute('name'))) {
                    card.classList.remove('active');
                    firstChild.classList.remove('active');
                    card.classList.add('himnActive');
                    firstChild.classList.add('himnActive');
                    firstChild = undefined;
                } else if(card.querySelector('.back img').getAttribute('name') !== (firstChild !== undefined ? firstChild.querySelector('.back img').getAttribute('src') : card.querySelector('.back img').getAttribute('name'))) {
                    card.classList.remove('active');
                    firstChild.classList.remove('active');
                    firstChild = undefined;
                }
                firstChild = card.getAttribute('class').indexOf('himnActive') !== -1 ? undefined : card.getAttribute('class').indexOf('active') !== -1 ? card : undefined;
                wining();
            })
        })
    })
}

const changeTitle = document.querySelector('.changeTitle');

let countInput;
function seconds(sec) {
    let span = document.querySelector('.second');
    function clear() {
        if(arrCards.length !== 0 && arrCards.every(card => card.getAttribute('class').search('himnActive') !== -1)) {
            clearInterval(id);
        } else if(sec < 2) {
            clearInterval(id);
            document.querySelector('.game_container').classList.add('active');
            changeTitle.innerText = 'You Lost';
        }
    }
    
    let id = setInterval(() => {
            clear();
            sec -= 1;
            span.textContent = sec;
    }, 1000);
}

let arrCards = [];
function wining() {
    cards.forEach(card => arrCards.push(card));
    if(arrCards.every(card => card.getAttribute('class').search('himnActive') !== -1)) {
        document.querySelector('.game_container').classList.add('active');
        changeTitle.innerText = 'You Win Bravoooo!';
    }
}

const playAgain = document.querySelector('.playAgainBtn');

playAgain.addEventListener('click', function() {
    img.forEach(img => img.src = '');
    cards.forEach(card => {
        card.classList.remove('himnActive');
        card.classList.remove('active');
    });
    document.querySelector('.game_container').classList.remove('active');
    randomInclude();
    seconds(countInput * 14);
})


let startGame = document.querySelector('.play');
const startContainer = document.querySelector('.countContainer');

startGame.addEventListener('click', function() {
    startContainer.classList.add('active');
    
    if(document.querySelector('.countInput').value > 0 && document.querySelector('.countInput').value <= 10) {
        countInput = document.querySelector('.countInput').value;
        drow(countInput * 6);
        cards = document.querySelectorAll('.cards .card');
        img = document.querySelectorAll('#backImg');
        randomInclude();
        activeCards();
        seconds(countInput * 14);
    }
})

console.log('1row 13sec, Built Narek 11.04.2023');