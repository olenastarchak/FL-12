function isLeapYear(year) {
  year = new Date(year).getFullYear();
  if (isNaN(year)) {
    return 'Invalid Date';
  } else if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
    return `${year} is a leap year`;
  } else {
    return `${year} is not a leap year`;
  }
}
console.log(isLeapYear('2020-01-01 00:00:00')); // =>  ‘2020 is a leap year’
console.log(isLeapYear('2020-01-01 00:00:00777')); // =>  ‘Invalid Date’
console.log(isLeapYear('2021-01-15 13:00:00')); // =>  ‘2021 is not a leap year’
console.log(isLeapYear('2200-01-15 13:00:00')); // =>  ‘2200 is not a leap year’
console.log(isLeapYear(1213131313135465656654564646542132132131)); // =>  ‘Invalid Date’
console.log(isLeapYear(1213131313)); // => ‘1970 is not a leap year’