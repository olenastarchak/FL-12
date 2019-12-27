const choice = confirm('Do you want to play a game?');
if (choice) {
  const num2 = 2, num3 = 3, num4 = 4, num9 = 9, num25 = 25, num50 = 50, num100 = 100;
  let range = num9, attempt = num3, prizefirst = num100, prizesecond = num50, prizethird = num25, totalprize = 0;
  let game = true;
  while (game) {
    let number = Math.floor(Math.random() * range);
    let prize = [prizethird, prizesecond, prizefirst];
    while (attempt > 0) {
      let guess = parseInt(prompt(`Choose a roulette pocket number from 0 to ${range-1} 
Attempts left: ${attempt} \nTotal prize: ${totalprize}$ 
Possible prize on current attempt: ${prize[attempt-1]}$`));
      if (number === guess) {
        let cont = confirm(`Congratulation, you won! Your prize is: ${prize[attempt-1]}$. Do you want to continue?`);
        totalprize += prize[attempt-1];
        if (cont) {
          prizethird *= num2;
          prizesecond *= num2;
          prizefirst *= num2;
          attempt = num3;
          range += num4;
        } else {  
          game = false;
        }
        break;
      } else if (attempt === 1) {
        game = false;
      } attempt--;
    } 
    if (game === false) {
      alert(`Thank you for your participation. Your prize is: ${totalprize}$`);
      if (confirm('Do you want to play again?')) {
        game = true; 
        prizefirst = num100;
        prizesecond = num50;
        prizethird = num25;
        range = num9;
        attempt = num3;
        totalprize = 0;
      } else {
        alert('You did not become a billionaire, but can.'); 
      }
    }
  }
} else {
    alert('You did not become a billionaire, but can.');
}