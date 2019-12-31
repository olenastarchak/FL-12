let addOne = x => x + 1;
function pipe(var1, ...callback) {
  for (let element of [...callback]) {
    var1 = element(var1);
  }
  return var1;
}
console.log(pipe(1, addOne)); //=> 2
console.log(pipe(1, addOne, addOne)); //=> 3