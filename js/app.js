/*
 * Create a list that holds all of your cards
 */
// Variables
let stars = document.querySelectorAll('.fa-star');
let moves = 0;
let matchCount = 0;
let allcards = document.querySelectorAll('.card i'); //grab card icons to generate card HTML
let deck = document.querySelector('.deck')
let cards = [];

// variables for modal:
let modal = document.querySelector('.modal');
let modalMsg = document.querySelector('.modal-msg');
let quitModal = document.getElementById('close-modal')

//function to open/display modal upon winning the game:
function openModal(moves, modalMsg){
  let rating = starRating(moves);
  modalMsg.innerText = `You won with ${moves} moves and ${rating} stars!`;
  modal.style.display = 'block';
}

//event listener to close modal by clicking on the 'x':
quitModal.addEventListener('click', closeModal);
//closeModal function:
function closeModal(){
  modal.style.display = 'none';
}

//Page loads with default deck, which is then shuffled
allcards.forEach(function(card){
    cards.push(card.className); /*grab all the classnames of the card elements*/
});

let cardHTML = [];

function generateHTML(cards){
  cards.forEach(function(cardName){
    cardHTML.push(`<li class="card">
        <i class="${cardName}"></i>
    </li>`) //push card HTML into actual array object to be used with shuffle function
  })
}

generateHTML(cards); //call generateHTML to create array of cardHTML

shuffle(cardHTML); //shuffle cardHTML array

deck.innerHTML = cardHTML.join(''); //replace current deck with shuffled deck

//start game with shuffled deck
let cardArray = document.querySelectorAll('.card'); // Array of HTML Card Elements
let openCards = [];

function removeOpenShow(element){
  element.parentElement.classList.remove('open', 'show');
}

function cardsMatch(openCards){
  var match = openCards[0].className === openCards[1].className;
  if (match) {
    for (i in openCards){
      removeOpenShow(openCards[i]);
      openCards[i].parentElement.classList.add('match')
    }
    return true;
  }
}

function noMatch(openCards){
  var different = openCards[0].className !== openCards[1].className;
  if (different){
    setTimeout(function(){
      for (i in openCards){
        removeOpenShow(openCards[i]);
      }
    }, 500);
  }
}

function starRating(moves){
  let rating = 3;
  if (moves > 15 && moves < 21){
    stars[0].remove();
    rating = 2;
  }
  if (moves > 20){
    stars[1].remove();
    rating = 1;
  }
  return rating;
}

// TIMER:
let gameOver = 0;
let timeElement = document.getElementById('time');
let gameTime = document.querySelector('.gameTime');

function startTimer() {
  let currentTimer = 0;
  let interval = 0;
  let lastUpdateTime = new Date().getTime();

    function update () {
        var now = new Date().getTime(),
            dt = now - lastUpdateTime;

        currentTimer += dt;

        var time = new Date(currentTimer);

        mins = time.getMinutes();
        secs = time.getSeconds();
        cents = Math.floor(time.getMilliseconds() / 10);
        timeElement.innerText = mins+' : '+secs+' : '+cents;
        lastUpdateTime = now;

        if (gameOver === 1){
          stop();
          gameTime.innerText = 'Your time was '+mins+' : '+secs+' : '+cents+'.';
        }
    }

    function start() {
        if (!interval) {
            lastUpdateTime = new Date().getTime();
            interval = setInterval(update, 1);
        }
    }

    function stop() {
        clearInterval(interval);
        interval = 0;
    }

    start();

  }

// **** Game Logic ****
let isTImerStarted = false;
 for(let i=0; i<cardArray.length; i++){
      cardArray[i].addEventListener('click',function(){
        // Start Timer after first card is clicked
        if(isTImerStarted === false) {
          startTimer();
          isTImerStarted = true;
        }

        if ((!cardArray[i].classList.contains('open'))&&(!cardArray[i].classList.contains('match'))){
          if (openCards.length < 2){
            element = cardArray[i].firstElementChild
            openCards.push(element)
            cardArray[i].classList.add('open','show');
          }
          if (openCards.length == 2){
            moves += 1;
            starRating(moves);
            if (cardsMatch(openCards)){
              openCards = [];
              matchCount += 1;
              if (matchCount === 8){
                // Stop Timer
                gameOver = 1;
                //display modal
                openModal(moves, modalMsg);
              }
            } else {
              noMatch(openCards)
              openCards = [];
            }
            document.querySelector('.count').innerText = moves;
          }
        }
      })/* End of EventListener block */
  }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call
        from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another
        function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this
        functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function
        that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another
        function that you call from this one)
 */
