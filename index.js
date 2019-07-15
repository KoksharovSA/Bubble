class SortBubble {
    count = document.getElementById('counts').value;
    massCount = [];
    notSortWorkMass = [];
    workMass = [];
    createMass() {
        const mass = [];
        for (let x = 0; x <= this.count; x++) {
            mass[x] = Math.floor((Math.random() + 0.1) * 20);
        }
        return mass;
    }
    createWorkMass(mass) {
        const workMass = this.workMass;
        for (let y = 0; y < 3; y++) {
            workMass[y] = [];
            for (let x = 0; x < this.count; x++) {
                if (y === 1) {
                    workMass[y][x] = mass[x];
                } else {
                    workMass[y][x] = 0;
                }
            }
        }
        return workMass;
    }

    reversCountStep1(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp1 = mass[1][reversElement];
        mass[0][reversElement] = temp1;
        mass[1][reversElement] = 0;
        let temp2 = mass[1][reversElement + 1];
        mass[2][reversElement + 1] = temp2;
        mass[1][reversElement + 1] = 0;
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
    reversCountStep2(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp = mass[0][reversElement];
        mass[0][reversElement + 1] = temp;
        mass[0][reversElement] = 0;
        temp = mass[2][reversElement + 1];
        mass[2][reversElement] = temp;
        mass[2][reversElement + 1] = 0;
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
    reversCountStep3(ob, reversElement, color) {
        const mass = ob.notSortWorkMass;
        let temp = mass[0][reversElement + 1];
        mass[1][reversElement + 1] = temp;
        mass[0][reversElement + 1] = 0;
        temp = mass[2][reversElement];
        mass[1][reversElement] = temp;
        mass[2][reversElement] = 0;
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
    clonemass(mass, color) {
        let clonemass = [];
        for (let y = 0; y < 3; y++) {
            clonemass[y] = [];
            for (let x = 0; x < this.count; x++) {
                if (y === 1) {
                    clonemass[y][x] = mass[y][x];
                    if (mass[y][x]) {
                        view.renderBlock(((view.width - (this.count * 45)) / 2) + x * 45, 45, color, mass[y][x]);
                    }
                } else {
                    clonemass[y][x] = 0;
                }
            }
        }
        return clonemass;
    }
}

class View {
    static colors = {
        's1': 'cyan',
        's2': 'blue',
        's3': 'orange',
        's4': 'yellow',
        's5': 'green',
        's6': 'purple',
        's7': 'red'
    }
    constructor(element, width, height, blockWidth, blockHeight) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.blockWidth = blockWidth;
        this.blockHeight = blockHeight;

        this.element.appendChild(this.canvas);
    }
    renderBlock(x, y, color, count) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;
        this.context.fillRect(x, y, this.blockWidth, this.blockHeight);
        this.context.strokeRect(x, y, this.blockWidth, this.blockHeight);
        this.context.font = '18px serif';
        this.context.strokeText(count, x + 10, y + 25);
    }
    clearCanv() {
        this.context.clearRect(0, 0, this.width, this.height);
    }
}

const sortBubble = new SortBubble();
const root = document.querySelector('#root');
const view = new View(root, 600, 150, 40, 40);

var speedSort = 3;
var colorRect = document.getElementById('select').value;
var button1 = document.getElementById('bt1');
var labelState = document.getElementById('state');
var select = document.getElementById('select');
var counts = document.getElementById('counts');

sortBubble.createWorkMass(sortBubble.createMass());
sortBubble.notSortWorkMass = sortBubble.clonemass(sortBubble.workMass, View.colors[this.colorRect]);
sortBubble.sortMass(sortBubble.workMass);

var mas = sortBubble.massCount;
var count = 0;
var interval;

function resizeSpeed() {
    speedSort = 9 - document.getElementById('speed').value;
    clearInterval(interval);
    start();
};

function changed() {
    view.clearCanv();
    this.labelState.textContent = "Нажмите начать сортировку";
    sortBubble.count = document.getElementById('counts').value;
    colorRect = document.getElementById('select').value
    this.count = 0;
    sortBubble.massCount = [];
    this.mas = [];
    sortBubble.createWorkMass(sortBubble.createMass());
    sortBubble.notSortWorkMass = sortBubble.clonemass(sortBubble.workMass, View.colors[this.colorRect]);
    sortBubble.sortMass(sortBubble.workMass);
    this.mas = sortBubble.massCount;
}

function start() {
    this.labelState.textContent = "Идёт сортировка...";
    button1.disabled = 1;
    select.disabled = 1;
    counts.disabled = 1;

    this.interval = setInterval(() => {
        if (this.count <= mas.length) {

            const p1 = new Promise((resolve, reject) => {
                setTimeout(function () {
                    sortBubble.reversCountStep1(sortBubble, mas[this.count], View.colors[this.colorRect]);
                }, this.speedSort * 50);
                resolve();
            }).then(() => {
                const p2 = new Promise((resolve, reject) => {
                    setTimeout(function () {
                        sortBubble.reversCountStep2(sortBubble, mas[this.count], View.colors[this.colorRect]);
                    }, this.speedSort * 100);
                    resolve();
                });
            }).then(() => {
                setTimeout(function () {
                    sortBubble.reversCountStep3(sortBubble, mas[this.count], View.colors[this.colorRect]);
                    this.count += 1;
                }, this.speedSort * 150);
                console.log(this.count);
            });
        } else {
            this.clearInterval(interval);
            var i = function () {
                let it = this.count.toString()
                switch (it.slice(-1)) {
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
            this.labelState.textContent = "Сортировка окончена. Сортировка произведена за " + this.count + " " + i();
            button1.disabled = 0;
            select.disabled = 0;
            counts.disabled = 0;
            console.log('clearInterval');
        }
    }, this.speedSort * 300);



    //interval = setInterval(() => {
    //    if (this.count <= mas.length) {
    //        setTimeout(function() {
    //            sortBubble.reversCountStep1(sortBubble, mas[this.count], View.colors[this.colorRect]);
    //        }, 100);
    //        setTimeout(function() {
    //            sortBubble.reversCountStep2(sortBubble, mas[this.count], View.colors[this.colorRect]);
    //        }, 200);
    //        setTimeout(function() {
    //            sortBubble.reversCountStep3(sortBubble, mas[this.count], View.colors[this.colorRect]);
    //            this.count += 1;
    //        }, 400);
    //        console.log(this.count);
    //    } else {
    //        this.clearInterval(interval);
    //        var i = function() {
    //            let it = this.count.toString()
    //            switch (it.slice(-1)) {
    //                case '1':
    //                    { return " итерацию."; }
    //                case '2':
    //                    { return " итерации."; }
    //                case '3':
    //                    { return " итерации."; }
    //                case '4':
    //                    { return " итерации."; }
    //                default:
    //                    { return " итераций."; }
    //            }
    //        };
    //        this.labelState.textContent = "Сортировка окончена. Сортировка произведена за " + this.count + " " + i();
    //        button1.disabled = 0;
    //        select.disabled = 0;
    //        counts.disabled = 0;
    //        console.log('clearInterval');
    //    }
    //}, 700);
}