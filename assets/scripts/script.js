const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const FLIP = 'flip'
const ICON = 'icon'
const GAMEOVER = document.getElementById('gameOver')
const PLAYS = document.getElementById('plays')
let plays = 0
startGame()

function startGame() {
    initializeCards(game.createCardsFromTechs())
}

function initializeCards() {
    let gameBoard = document.getElementById('gameBoard')
    gameBoard.innerHTML = ''
    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon
        createCardContent(card, cardElement)
        cardElement.classList.add('flip')
        setTimeout(() => {
            cardElement.classList.remove('flip')
        }, 2000)
        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, cardElement) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if(face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = `./assets/images/${card.icon}.png`
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt/&gt"
    }
    cardElement.appendChild(cardElementFace)
} 

function flipCard() {
    if(game.setCard(this.id)) {
        this.classList.add(FLIP)
        if(game.secondCard){
            if(game.checkMatch() ) {
                game.clearCards()
                countPlay()
                if (game.checkGameOver())
                GAMEOVER.style.display = 'flex' 
            } else {
                setTimeout(() => {
                    let firsCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)
                    
                    firsCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                    countPlay()
                }, 500)
            }
        }
    }
}
function countPlay() {
    plays++
    PLAYS.children[0].innerHTML = plays.toString()
}
function restart() {
    plays = 0
    PLAYS.children[0].innerHTML = plays.toString()
    game.clearCards()
    startGame()
    GAMEOVER.style.display = 'none'
}