/* initialize */
const pad = 720;
let size = 16;
const body = document.querySelector('body');
const rainbow = document.querySelector('.rainbow');
const clrbtn = document.querySelector('.clear');
const size_range = document.querySelector('#size-range');
const srlabel = document.querySelector('#srlabel');
const container = document.createElement('div');
let pixels = [];


/* functions */
function createDivs() {
    for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            pixels[i*size+j] = document.createElement('div');
            pixels[i*size+j].style.width = pixels[i*size+j].style.height = `${pad/size}px`;
            pixels[i*size+j].style.display = 'inline-block';
            pixels[i*size+j].style.boxSizing = 'border-box';
            pixels[i*size+j].style.border = '1px black solid';
            container.appendChild(pixels[i*size+j]);
            pixels[i*size+j].addEventListener('mouseover', changeColor);
        }
    }
}

function switchColor(e) {
    switch (this.classList[0]) {
        case 'rainbow':
            pixels.forEach(element => {
                element.removeEventListener('mouseover', changeColor);
                element.addEventListener('mouseover', changeRainbowColor);
            });
            break;
        default:
            break;
    }
}

function changeColor(e) {
    e.stopPropagation();
    this.style.backgroundColor = 'black';
}

function changeRainbowColor(e) {
    e.stopPropagation();
    this.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clearColor() {
    pixels.forEach(element => {
        element.style.backgroundColor = 'transparent';
    });
}

function changeSize() {
    size = this.value;
    srlabel.textContent = `size: ${size}`;
    pixels.forEach(element => {
        container.removeChild(element);
    });
    pixels.length = 0;
    createDivs();
}


/* container settings */
container.classList.add('container');
container.style.width = container.style.height = `${pad}px`;
container.style.display = 'flex';
container.style.flexWrap = 'wrap';


createDivs();
body.appendChild(container);

rainbow.addEventListener('click', switchColor);
clrbtn.addEventListener('click', clearColor);
size_range.addEventListener('change', changeSize);