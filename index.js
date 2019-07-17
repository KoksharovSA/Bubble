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
                    //Отрисовка склонированного массива в canvas
                    if (mass[y][x]) {
                        view.renderBlock(((view.width - (this.count * 45)) / 2) + x * 45, 45, color, mass[y][x]);
                    }
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

    //Метод меняющий элементы массива местами шаг 1, принимает контекст, индекс элемента который необходимо поменять и цвет блока для отрисовки
    reversCountStep1(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp1 = mass[1][reversElement];
        mass[0][reversElement] = temp1;
        mass[1][reversElement] = 0;
        let temp2 = mass[1][reversElement + 1];
        mass[2][reversElement + 1] = temp2;
        mass[1][reversElement + 1] = 0;
        view.clearCanv();
        //Отрисовка 1 шага изменения в canvas
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < this.count; x++) {
                if (ob.notSortWorkMass[y][x]) {
                    view.renderBlock(((view.width - (this.count * 45)) / 2) + x * 45, y * 45, color, ob.notSortWorkMass[y][x]);
                }
            }
        }
        ob.notSortWorkMass = mass;
    }

    //Метод меняющий элементы массива местами шаг 2, принимает контекст, индекс элемента который необходимо поменять и цвет блока для отрисовки
    reversCountStep2(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp = mass[0][reversElement];
        mass[0][reversElement + 1] = temp;
        mass[0][reversElement] = 0;
        temp = mass[2][reversElement + 1];
        mass[2][reversElement] = temp;
        mass[2][reversElement + 1] = 0;
        //Отрисовка 2 шага изменения в canvas
        view.clearCanv();       
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < this.count; x++) {
                if (ob.notSortWorkMass[y][x]) {
                    view.renderBlock(((view.width - (this.count * 45)) / 2) + x * 45, y * 45, color, ob.notSortWorkMass[y][x]);
                }
            }
        }
        ob.notSortWorkMass = mass;
    }

    //Метод меняющий элементы массива местами шаг 3, принимает контекст, индекс элемента который необходимо поменять и цвет блока для отрисовки
    reversCountStep3(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp = mass[0][reversElement + 1];
        mass[1][reversElement + 1] = temp;
        mass[0][reversElement + 1] = 0;
        temp = mass[2][reversElement];
        mass[1][reversElement] = temp;
        mass[2][reversElement] = 0;
        //Отрисовка 2 шага изменения в canvas
        view.clearCanv();
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < this.count; x++) {
                if (ob.notSortWorkMass[y][x]) {
                    view.renderBlock(((view.width - (this.count * 45)) / 2) + x * 45, y * 45, color, ob.notSortWorkMass[y][x]);
                }
            }
        }
        ob.notSortWorkMass = mass;
    } 
}

//Класс отвечающий за отображение блоков в canvas
class View {
    constructor(element, width, height, blockWidth, blockHeight) {
        this.element = element; //Элемент DOM в который добавляем canvas
        this.width = width; //Длина для canvas
        this.height = height; //Высота для canvas
        this.canvas = document.createElement('canvas'); //Создаём элемент canvas
        this.canvas.width = this.width; //Задаём длину canvas 
        this.canvas.height = this.height; //Задаём высоту canvas
        this.context = this.canvas.getContext('2d'); //задаём canvas параметр 2d

        this.blockWidth = blockWidth; //Длина для блоков
        this.blockHeight = blockHeight; //Ширина для блоков

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
        this.context.font = '18px serif';
        this.context.strokeText(count, x + 10, y + 25);
    }

    //Метод отчищающий поле canvas
    clearCanv() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

const sortBubble = new SortBubble(); //Создаём экземпляр класса сортировки массивов
const root = document.querySelector('#root'); //Добовляем переменную и передаём ей сущность необходимого нам элемента DOM
const view = new View(root, 600, 150, 40, 40); //Создаём экземпляр класса отображения блоков

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
interval; //Добовляем переменную для setinterval

//Метод изменяющий скорость
function resizeSpeed() {
    speedSort = 9 - document.getElementById('speed').value;
    clearInterval(interval);
    start();
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
                    sortBubble.reversCountStep1(sortBubble, mas[this.count], View.colors[this.colorRect]);
                }, this.speedSort * 50);
                resolve();
            }).then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        sortBubble.reversCountStep2(sortBubble, mas[this.count], View.colors[this.colorRect]);
                    }, this.speedSort * 100);
                    resolve();
                });
            }).then(() => {
                setTimeout(() => {
                    sortBubble.reversCountStep3(sortBubble, mas[this.count], View.colors[this.colorRect]);
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
