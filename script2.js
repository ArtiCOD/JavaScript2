let text = prompt('Введите ваш текст', ` bla bla 'aga' bla aren't bla 'popavsya'`);
console.log(text.replace(/'/g, "''")); // задание 1
console.log(text.replace(/\B'|'\B/g, "''")); // задание 2

