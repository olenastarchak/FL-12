const a = parseFloat(prompt('Enter a'));
const b = parseFloat(prompt('Enter b'));
const c = parseFloat(prompt('Enter c'));
if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
    alert('Invalid input data');
} else {
    let x1, x2, text, y1=2, y2=4;
    let d = b*b - y2*a*c;
    if (d > 0) {
        x1 = Math.round((-b+Math.sqrt(d))/(y1*a));
        x2 = Math.round((-b-Math.sqrt(d))/(y1*a));
        text = `x1 = ${x1} and x2 = ${x2}`;
    } else if (d === 0) {
        x1 = Math.round(-b/(y1*a));
        text = `x = ${x1}`;
    } else {
        text = 'No solution';
    }
    console.log(text)
}