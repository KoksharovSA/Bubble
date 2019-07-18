//Класс отвечающий за сортировку массивов
class SortBubble {
    count = document.getElementById('counts').value; //Кол-во элементов массивов    
    workMass = []; //Рабочий массив
    notSortWorkMass = []; //Неотсортированный массив
    massCount = []; //Массив индексов элементов которые необходимо поменять при сортировке

    //Метод для создания рабочего массива с рандомными числами
    createWorkMass() {
        const workMass = this.workMass;
        for (let y = 0; y < 3; y++) {
            workMass[y] = [];
            for (let x = 0; x < this.count; x++) {
                if (y === 1) {
                    workMass[y][x] = Math.floor((Math.random() + 0.1) * 20);
                } else {
                    workMass[y][x] = 0;
                }
            }
        }
    }

    //Метод клонирующий массив 
    clonemass(mass, color) {
        let clon = [];
        for (let y = 0; y < 3; y++) {
            clon[y] = [];
            for (let x = 0; x < this.count; x++) {
                if (y === 1) {
                    clon[y][x] = mass[y][x];                   
                } else {
                    clon[y][x] = 0;
                }
            }
        }
        return clon;
    }

    //Метод сортирующий рабочий массив
    sortMass(mass) {
        let temp = mass;
        let hasSort = false;
        while (!hasSort) {
            hasSort = true;
            for (let y = 0; y < mass.length; y++) {
                for (let x = 0; x < mass[y].length; x++) {
                    if (y === 1 && x < mass[y].length - 1 && mass[y][x] > mass[y][x + 1]) {
                        let a = mass[y][x];
                        mass[y][x] = mass[y][x + 1]
                        mass[y][x + 1] = a;
                        hasSort = false;
                        this.massCount.push(x);
                    }
                }
            }
        }
        console.log(this.massCount);
    }

    //Метод меняющий элементы массива местами шаг 1
    reversCountStepOne(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp1 = mass[1][reversElement];
        mass[0][reversElement] = temp1;
        mass[1][reversElement] = 0;
        let temp2 = mass[1][reversElement + 1];
        mass[2][reversElement + 1] = temp2;
        mass[1][reversElement + 1] = 0;
        view.clearCanv();
        ob.notSortWorkMass = mass;
    }

    //Метод меняющий элементы массива местами шаг 2
    reversCountStepTwo(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp = mass[0][reversElement];
        mass[0][reversElement + 1] = temp;
        mass[0][reversElement] = 0;
        temp = mass[2][reversElement + 1];
        mass[2][reversElement] = temp;
        mass[2][reversElement + 1] = 0;
        ob.notSortWorkMass = mass;
    }

    //Метод меняющий элементы массива местами шаг 3
    reversCountStepThree(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp = mass[0][reversElement + 1];
        mass[1][reversElement + 1] = temp;
        mass[0][reversElement + 1] = 0;
        temp = mass[2][reversElement];
        mass[1][reversElement] = temp;
        mass[2][reversElement] = 0;        
        ob.notSortWorkMass = mass;
    }
}

//Класс отвечающий за отображение блоков в canvas
class View {
    constructor(element, elementWidth, elementHeight) {
        this.element = element; //Элемент DOM в который добавляем canvas
        this.scaleX = elementWidth / 600; //Масштаб canvas
        this.scaleY = elementHeight / 150; //Масштаб canvas
        console.log(this.scaleX);
        this.width = 600 * this.scaleX; //Длина для canvas
        this.height = 150 * this.scaleY; //Высота для canvas
        console.log(this.width, this.height);
        this.canvas = document.createElement('canvas'); //Создаём элемент canvas
        this.canvas.width = this.width; //Задаём длину canvas 
        this.canvas.height = this.height; //Задаём высоту canvas
        this.context = this.canvas.getContext('2d'); //задаём canvas параметр 2d

        this.blockWidth = 40 * this.scaleX; //Длина для блоков
        this.blockHeight = 40 * this.scaleY; //Ширина для блоков
        this.canvas.id = 'canvas';

        this.element.appendChild(this.canvas); //Добавляем canvas в элемент DOM
    }

    //Цвета блоков
    static colors = {
        's1': 'cyan',
        's2': 'blue',
        's3': 'orange',
        's4': 'yellow',
        's5': 'green',
        's6': 'purple',
        's7': 'red'
    }

    //Метод отвечающий за отрисовку блока, принимает координаты x и y положения в canvas, цвет и число отображаемое в блоке
    renderBlock(x, y, color, count) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillRect(x, y, this.blockWidth, this.blockHeight);
        this.context.strokeRect(x, y, this.blockWidth, this.blockHeight);
        this.context.font = 18 * this.scaleX + 'px serif';
        this.context.strokeText(count, x + (10 * this.scaleX), y + (25 * this.scaleY));
    }

    //Метод отвечающий за отрисовку массива, принимает контекст и цвет
    renderMass(ob, color) {
        this.clearCanv();
        var mass = ob.notSortWorkMass;
        for (let y = 0; y < mass.length; y++) {
            for (let x = 0; x < mass[y].length; x++) {
                if (mass[y][x]) {
                    this.renderBlock(((this.width - (mass[y].length * (45 * this.scaleX))) / 2) + (x * (45 * this.scaleX)), ((this.height - (mass.length * (45 * this.scaleY))) / 2) + (y * (45 * this.scaleY)), View.colors[color], mass[y][x]);
                }
            }
        }
    }

    //Метод отчищающий поле canvas
    clearCanv() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

const sortBubble = new SortBubble(); //Создаём экземпляр класса сортировки массивов
const root = document.querySelector('#root'); //Добовляем переменную и передаём ей сущность необходимого нам элемента DOM
view = new View(root, root.clientWidth, root.clientHeight); //Создаём экземпляр класса отображения блоков

speedSort = 9 - document.getElementById('speed').value; //Задаём еременную скорости сортировки
colorRect = document.getElementById('select').value; //Задаём еременную цвета блоков

button1 = document.getElementById('bt1'); //Добовляем переменную и передаём ей сущность кнопки "Начать сортировку"
labelState = document.getElementById('state'); //Добовляем переменную и передаём ей сущность метки для отображения текста состояния сортировки
select = document.getElementById('select'); //Добовляем переменную и передаём ей сущность селектора выбора цвета блоков
counts = document.getElementById('counts'); //Добовляем переменную и передаём ей сущность селектора выбора количества блоков

sortBubble.createWorkMass(); //Создаём рабочий массив
sortBubble.notSortWorkMass = sortBubble.clonemass(sortBubble.workMass, View.colors[this.colorRect]); //Копируем неотсортированный массив
sortBubble.sortMass(sortBubble.workMass); //Сортируе рабочий массив

mas = sortBubble.massCount; //Добовляем переменную и передаём ей массив индексов элементов которые необходимо поменять при сортировке
count = 0; //Добовляем переменную количества замен элементов произведённых при сортировке
interval = setInterval(() => { }, 0); //Добовляем переменную для setinterval
view.renderMass(sortBubble, this.colorRect); //Отрисовываем массив

//Действия при изменении размера окна браузера
window.onresize = () => {
    root.removeChild(document.getElementById('canvas'));
    view = new View(root, root.clientWidth, root.clientHeight);
    console.log(sortBubble.notSortWorkMass, this.colorRect);
    view.renderMass(sortBubble, this.colorRect);
};

//Метод изменяющий скорость
function resizeSpeed() {
    speedSort = 9 - document.getElementById('speed').value;
    if (this.count !== 0) {
        clearInterval(interval);
        start();
    }
};

//Метод изменяющий цвет и количество блоков, перерисовывает из на поле
function changed() {
    view.clearCanv(); //Отчищаем поле
    sortBubble.count = document.getElementById('counts').value; //Принимаем необходимое кол-во блоков
    colorRect = document.getElementById('select').value //Принимаем необходимый цвет блоков    
    this.labelState.textContent = "Нажмите начать сортировку";
    this.count = 0; //Обнуляем количества замен элементов произведённых при сортировке
    sortBubble.massCount = []; //Обнуляем массив индексов элементов которые необходимо поменять при сортировке
    sortBubble.createWorkMass(); //Создаём новый рабочий массив
    sortBubble.notSortWorkMass = sortBubble.clonemass(sortBubble.workMass, View.colors[this.colorRect]); //Клонируем в неотсортированный рабочий массив
    view.renderMass(sortBubble, this.colorRect); //Отрисовываем массив
    sortBubble.sortMass(sortBubble.workMass); //Сортируем рабочий массив
    this.mas = sortBubble.massCount; //Принимаем новый массив индексов элементов которые необходимо поменять при сортировке
}

//Метод начинающий сортировку
function start() {

    this.labelState.textContent = "Идёт сортировка...";
    //Деактивируем кнопку старт, селектора выбора цвета и кол-ва блоков
    button1.disabled = 1;
    select.disabled = 1;
    counts.disabled = 1;

    //Запускаем setInterval пока не закончатся элементы для замены
    this.interval = setInterval(() => {
        if (this.count <= mas.length) {
            //Выполняем визуализирование сортировки за 3 шага 
            const p1 = new Promise((resolve) => {
                setTimeout(() => {
                    sortBubble.reversCountStepOne(sortBubble, mas[this.count], View.colors[this.colorRect]);
                    view.renderMass(sortBubble, this.colorRect);
                }, this.speedSort * 50);
                resolve();
            }).then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        sortBubble.reversCountStepTwo(sortBubble, mas[this.count], View.colors[this.colorRect]);
                        view.renderMass(sortBubble, this.colorRect);
                    }, this.speedSort * 100);
                    resolve();
                });
            }).then(() => {
                setTimeout(() => {
                    sortBubble.reversCountStepThree(sortBubble, mas[this.count], View.colors[this.colorRect]);
                    view.renderMass(sortBubble, this.colorRect);
                    this.count += 1;
                }, this.speedSort * 150);
                console.log(this.count);
            });
        } else {
            //Останавливаем setInterval
            this.clearInterval(interval);
            var i = () => {
                switch (this.count.toString().slice(-1)) {
                    case '1':
                        { return " итерацию."; }
                    case '2':
                        { return " итерации."; }
                    case '3':
                        { return " итерации."; }
                    case '4':
                        { return " итерации."; }
                    default:
                        { return " итераций."; }
                }
            };
            //Отображаем текст состояния окончания сортировки
            this.labelState.textContent = "Сортировка окончена. Сортировка произведена за " + this.count + " " + i();
            //Активируем кнопку старт, селектора выбора цвета и кол-ва блоков
            button1.disabled = 0;
            select.disabled = 0;
            counts.disabled = 0;
        }
    }, this.speedSort * 300);
}
