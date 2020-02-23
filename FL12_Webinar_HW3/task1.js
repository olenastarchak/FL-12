const _isFaceCard = Symbol('isFaceCard');
const _count = Symbol('count');
const _wins = Symbol('wins');

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this[_isFaceCard] = this.rank === 1 || this.rank > 10 ? true : false;
  }

  get isFaceCard() {
    return this[_isFaceCard];
  }

  toString() {
    let cardName = '';
    if (this.isFaceCard) {
      switch (this.rank) {
        case 1:
          cardName = 'Ace';
          break;
        case 11:
          cardName = 'Jack';
          break;
        case 12:
          cardName = 'Queen';
          break;
        case 13:
          cardName = 'King';
          break;
        default:
          throw new Error('Card name is undefined');
      }
    } else {
      cardName = this.rank;
    }
    return `${cardName} of ${this.suit}`;
  }

  static compare(cardOne, cardTwo) {
    return cardOne.rank > cardTwo.rank ? 1 : 
        cardTwo.rank > cardOne.rank ? 2 : 0;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    for (let i of suits) {
      for (let j = 1; j <= 13; j++) {
        this.cards.push(new Card(i, j));
      }
    }
    this[_count] = this.cards.length;
  }

  get count() {
    return this[_count];
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  draw(n) {
    return this.cards.splice(this[_count] -= n);
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this[_wins] = 0;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  get wins() {
    return this[_wins];
  }

  static play(playerOne, playerTwo) {
    while(playerOne.deck.count) {
      switch (Card.compare(playerOne.deck.draw(1)[0], 
          playerTwo.deck.draw(1)[0])) {
        case 0:
          break;
        case 1:
          playerOne[_wins]++;
          break;
        case 2:
          playerTwo[_wins]++;
          break;
        default:
          throw new Error('Something went wrong');
      }
    }
    if (playerOne.wins === playerTwo.wins) {
      console.log("It's a Draw!");
    } else {
      playerOne.wins > playerTwo.wins ? 
      console.log(`${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`) :
      console.log(`${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`)
    }
    playerOne.deck = new Deck();
    playerOne.deck.shuffle();
    playerTwo.deck = new Deck();
    playerTwo.deck.shuffle();
    playerOne[_wins] = 0;
    playerTwo[_wins] = 0;
  }
}

const A = new Player('Anton');
const O = new Player('Olena');
Player.play(A, O);