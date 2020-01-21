const num2 = 2, num100 = 100, num101 = 101;
function Fighter(obj) {
  let wins = 0, losses = 0, currentHP = obj.hp;
  this.getName = () => obj.name;
  this.getDamage = () => obj.damage;
  this.getStrength = () => obj.strength;
  this.getAgility = () => obj.agility;
  this.getHealth = () => currentHP;
  this.attack = function(defender) {
    const hit = Math.floor(Math.random()*num101);
    const chance = num100-defender.getStrength()-defender.getAgility();
    if (hit <= chance) {
      console.log(`${obj.name} makes ${obj.damage} damage to ${defender.getName()}`);
      defender.dealDamage(obj.damage);
    } else {
      console.log(`${obj.name} attack missed`);
    }
  }
  this.logCombatHistory = function() {
    console.log(`Name: ${obj.name}, Wins: ${wins}, Losses: ${losses}`)
  }
  this.heal = function(plushp) {
    if ((currentHP += plushp) > obj.hp) {
      currentHP = obj.hp;
    }
  }
  this.dealDamage = function(val) {
    if ((currentHP -= val) < 0) {
      currentHP = 0;
    }
  }
  this.addWin = function() { 
    wins += 1;
  }
  this.addLoss = function() {
    losses += 1;
  }
}

function battle(fighter1, fighter2) {
  if (fighter1.getHealth() === 0) {
    console.log(`${fighter1.getName()} is dead and can't fight`);
  } else if (fighter2.getHealth() === 0) {
    console.log(`${fighter2.getName()} is dead and can't fight`);
  } else {
    let round = 1;
    while (fighter1.getHealth() && fighter2.getHealth() > 0) {
      round % num2 !== 0 ? fighter1.attack(fighter2) : fighter2.attack(fighter1);
      round++;
    }
    if (fighter1.getHealth() === 0) {
      console.log(`${fighter2.getName()} has won!`)
      fighter2.addWin();
      fighter1.addLoss();
    } else {
      console.log(`${fighter1.getName()} has won!`)
      fighter1.addWin();
      fighter2.addLoss();
    }
  }
}

const myFighter = new Fighter({name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25});
const myFighter2 = new Fighter({name: 'Commodus', damage: 20, hp: 100, strength: 10, agility: 15});