/*
 * Create a list that holds all of your cards
 */
 /* dynamically generate cards */
let win = [];
var allcards = document.querySelectorAll('.card i'); /*grab all the card elements*/
var deck = document.querySelector('.deck')
var cards = [];
allcards.forEach(function(card){
    cards.push(card.className); /*grab all the classnames of the card elements*/
});
cardHTML = [];
function generateHTML(cards){
  cards.forEach(function(cardName){
    cardHTML.push(`<li class="card">
        <i class="${cardName}"></i>
    </li>`)
  })
}

generateHTML(cards);

shuffle(cardHTML);

deck.innerHTML = cardHTML.join('');


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


 for(let i=0; i<cardArray.length; i++){
      cardArray[i].addEventListener('click',function(){
        if (!cardArray[i].classList.contains('open')){
          if (openCards.length < 2){
          element = cardArray[i].firstElementChild
          openCards.push(element)
          cardArray[i].classList.add('open','show');
          }
          if (openCards.length == 2){
            if (cardsMatch(openCards)){
              openCards = [];
              win.push('match');
              if (win.length === 8){
                console.log("YOU WON!!!")
              }
            } else {
              noMatch(openCards)
              openCards = [];
            }
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

 // Side note: openCards[0].parentElement will give you: <li class=​"card open show">​…​</li>​

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 /* Kirby's comments:
 -EventListener: on 'click' change class to 'card open show'
 -Match: when two 'i' (icons) match, change class to 'card match'

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
