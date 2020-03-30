export const cells = document.querySelectorAll('.cell');

const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function checkWin(currentClass) {
  return combinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass)
    })
  })
}

export function markWin(currentClass) {
  for (let combination of combinations) {
    if (combination.every(i=>cells[i].classList.contains(currentClass))) {
      combination.forEach(i => cells[i].classList.add('win'))
    }
  }
}