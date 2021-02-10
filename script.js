const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const filterMin = document.querySelector('.minweight__input'); // поле фильтрации
const filterMax = document.querySelector('.maxweight__input'); // поле фильтрации
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
//const colorInput = document.querySelector('colorSelect').value; // поле с названием цвета
const colorInput = document.getElementById('colorSelect');; // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
let priority = ['розово-красный', 'светло-коричневый', 'желтый', 'зеленый', 'фиолетовый'];


// ОТОБРАЖЕНИЕ
  function display(arrLi) {

    let frLength = arrLi.length;
    let parent = document.querySelector('.fruits__list');
    //const display = () => {
    for (let i = 0; i < frLength; i++) {
      let li = document.createElement('li'); //создали элемент li
      switch (arrLi[i].color) {
        case 'фиолетовый': li.className = 'fruit__item fruit_violet'; break;
        case 'зеленый': li.className = 'fruit__item fruit_green'; break;
        case 'розово-красный': li.className = 'fruit__item fruit_carmazin'; break;
        case 'желтый': li.className = 'fruit__item fruit_yellow'; break;
        case 'светло-коричневый': li.className = 'fruit__item fruit_lightbrown'; break;
      }
      parent.appendChild(li);
      //создание div
      let div = document.createElement('div');
      div.className = 'fruit__info';
      li.appendChild(div);

      let divColor = document.createElement('div');
      divColor.innerHTML = arrLi[i].color;
      div.appendChild(divColor);

      let divKind = document.createElement('div');
      divKind.innerHTML = arrLi[i].kind;
      div.appendChild(divKind);

      let liWeigt = document.createElement('div');
      liWeigt.innerHTML = arrLi[i].weight;
      div.appendChild(liWeigt);
      
    }
  };

// первая отрисовка
window.onload = function () { display(fruits) };


/*** ПЕРЕМЕШИВАНИЕ ***/
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleButton = document.querySelector('.shuffle__btn');
const shuffleFruits = () => {
  let result = [];
  let el = 0;

  while (fruits.length > 0) {
    iMinus = getRandomInt(0, fruits.length - 1);
    result[el] = fruits[iMinus];
    fruits.splice(iMinus, 1);
    el += 1;
  }
  fruits = result;
};

let oldResult = [];
shuffleButton.addEventListener('click', () => {
  document.getElementById('fruits__list').innerText = "";
  oldResult = fruits; 
  shuffleFruits(fruits);
  oldResult == fruits ? alert('Перемешивание не произошло') : display(fruits);
});


/*** ФИЛЬТРАЦИЯ ***/
function filterFruits(result) {
  fruits = result.filter(item => ((item.weight >= filterMin.value) && (item.weight <= filterMax.value)))
};

filterButton.addEventListener('click', () => {
  document.getElementById('fruits__list').innerText = "";
  filterFruits(fruits);
  display(fruits);
});


let sortKind = 'bubbleSort'; // состояния вида сортировки
let sortTime = '-'; // время сортировки

// функция сравнения двух элементов по цвету
const comparationColor = (a, b) => {
  return priority.indexOf(a.color) > priority.indexOf(b.color) ? true : false;
};

//Сортировка пузырьком
function bubbleSort() {
  const n = fruits.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (comparationColor(fruits[j], fruits[j + 1])) {
        let temp = fruits[j + 1];
        fruits[j + 1] = fruits[j];
        fruits[j] = temp;
      }
    }
  }
}

// алгоритм быстрой сортировки
function swap(firstIndex, secondIndex) {
  const temp = fruits[firstIndex];
  fruits[firstIndex] = fruits[secondIndex];
  fruits[secondIndex] = temp;
}

// функция разделитель
function part(left, right) {
  let pivot = fruits[Math.floor((right + left) / 2)],
    i1 = left,
    j1 = right;
  while (i1 <= j1) {
    while (comparationColor(pivot, fruits[i1])) {
      i1++;
    }
    while (comparationColor(fruits[j1], pivot)) {
      j1--;
    }
    if (i1 <= j1) {
      swap(i1, j1);
      i1++;
      j1--;
    }
  }
  return i1;
}

function quickSort(left, right) {
  let index;
  if (fruits.length > 1) {
    left = typeof left != "number" ? 0 : left;
    right = typeof right != "number" ? fruits.length - 1 : right;
    index = part(left, right);
    if (left < index - 1) {
      quickSort(left, (index - 1));
    }
    if (index < right) {
      quickSort(index, right);
    }
  }
  return fruits;
}

sortActionButton.addEventListener('click', () => {
  document.getElementById('fruits__list').innerText = "";
  const start = new Date().getTime();
  sortKindLabel.textContent == 'bubbleSort' ? bubbleSort(fruits) : quickSort();;
  const end = new Date().getTime();
  sortTimeLabel.textContent = `${end - start} ms`;
  display(fruits);
});

// инициализация полей
sortKind = 'bubbleSort';
sortKindLabel.textContent = sortKind;

// переключатель между bubbleSort и quickSort
sortChangeButton.addEventListener('click', () => {
sortKindLabel.textContent == 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

// sortActionButton.addEventListener('click', () => {
//   // TODO: вывести в sortTimeLabel значение 'sorting...'
//   const sort = sortAPI[sortKind];
//   sortAPI.startSort(sort, fruits, comparationColor);
//   display();
//   // TODO: вывести в sortTimeLabel значение sortTime
// // });


/*** ДОБАВИТЬ ФРУКТ ***/
addActionButton.addEventListener('click', () => {
  document.getElementById('fruits__list').innerText = "";
  if ((kindInput.value == '') || (weightInput.value == '')) {
    alert('Заполните все строки');
  } else {
    let newElement = { kind: kindInput.value, color: colorInput.value, weight: weightInput.value };
    fruits.push(newElement);
    display(fruits);
  }
});