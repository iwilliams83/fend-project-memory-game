/*
 * Create a list that holds all of your cards
 */
// **** Variables definitions ****
let stars = document.querySelectorAll('.fa-star');
let moves = 0;
let matchCount = 0;
let allcards = document.querySelectorAll('.card i'); /*grab all the card elements*/
let deck = document.querySelector('.deck')
let cards = [];

let startTime, endTime;

//modal
let modal = document.querySelector('.modal');
let modalMsg = document.querySelector('.modal-msg');

function openModal(moves, modalMsg){
  let rating = starRating(moves);
  modalMsg.innerText = `You won with ${moves} moves and ${rating} stars!`;
  modal.style.display = 'block';
}

// **** Function definitions ****

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

//start game
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

function startTimer(){
  startTime = new Date().getTime();
  console.log('Starting the Timer!');
}

function getTotalTime(){
  let totalTime = startTime - new Date().getTime();
  console.log(`The total time is .... ${totalTime}...CONVERT MEEEEEE!!!!!`);
  return totalTime;
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
                let totalTime = getTotalTime();
                console.log(`The total time BEFORE THE MODAL .... ${totalTime}...CONVERT MEEEEEE!!!!!`);
                openModal(moves, modalMsg);
              }
            } else {
              noMatch(openCards)
              openCards = [];
            }
            document.querySelector('.moves').innerText = moves;
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
