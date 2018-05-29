/*
 * Create a list that holds all of your cards
 */
 /* first commit: add open, show to card's class list on 'click' event */
 let cardArray = document.getElementsByClassName('card');
 let openCards = [];
 /* Side note: openCards[0].parentElement will give you: <li class=​"card open show">​…​</li>​ */

function matchingCards(openCards){
  console.log("I'm a matching card function!");
  var match = openCards[0].className === openCards[1].className;
  if (match) {
    console.log('these cards match');
     /*for each element in OpenCards array, change the parent element's classList to 'card match'*/
    for (i in openCards){
      openCards[i].parentElement.classList.remove('open', 'show')
      openCards[i].parentElement.classList.add('match')
    }
    while (openCards.length) { openCards.pop(); }
 }
}

function noMatch(openCards){
  var match = openCards[0].className === openCards[1].className;
  if (match === false){
    console.log("I'm here in case the cards don't match");
  }
}



 for(let i=0; i<cardArray.length; i++){
      cardArray[i].addEventListener('click',function(){
          if (openCards.length < 2){
          cardArray[i].classList.add('open','show');
          element = cardArray[i].firstElementChild
          openCards.push(element)
          }
          if (openCards.length == 2){
            noMatch(openCards);
            matchingCards(openCards);

            }
      })/* End of EventListener block */
  }
  console.log(openCards);

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
