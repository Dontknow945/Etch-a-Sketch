/* initialize */
const pad = 720;
let size = 16;
let color = 'black';
const body = document.querySelector('body');
const normal = document.querySelector('.normal');
const rainbow = document.querySelector('.rainbow');
const shadow = document.querySelector('.shadow');
const erase = document.querySelector('.erase');
const clrbtn = document.querySelector('.clear');
const choose = document.querySelector('#choose');
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
            pixels[i*size+j].classList.add('squares');
            pixels[i*size+j].id = i*size+j;
            container.appendChild(pixels[i*size+j]);
            pixels[i*size+j].addEventListener('mouseover', changeColor);
            pixels[i*size+j].divColor = 'transparent';
        }
    }
}

function changeColor(e) {
    e.stopPropagation();
    this.style.backgroundColor = switchColor(this);
}

function switchColor(square) {
    switch (color) {
        case 'rainbow':
            square.divColor = getRandomColor();
            return square.divColor;
        case 'black':
            square.divColor = 'rgb(0, 0, 0)';
            return 'black';
        case 'shadow':
            return getDarkerColor(square);
        case 'erase':
            square.divColor = 'transparent';
            return 'transparent';
        case 'choose':
            square.divColor = hexTOrgb(choose.value);
            return square.divColor;
        default:
            return 'black';
    }
}

function hexTOrgb(hex) {
    hex = String(hex).replace(/[^0-9a-f]/, '');
    let r = parseInt((hex[0] + hex[1]), 16);
    let g = parseInt((hex[2] + hex[3]), 16);
    let b = parseInt((hex[4] + hex[5]), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomColor() {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return `rgb(${r}, ${g}, ${b})`;
}

function getDarkerColor(square) {
    let originColor = square.divColor;
    let bgColor = square.style.backgroundColor;
    let re = /^rgb/;
    if (!re.test(bgColor)) {
        return bgColor;
    } else {
        let colorString = String(bgColor);
        let bgrgb = colorString.substring(colorString.indexOf('(')+1, colorString.indexOf(')'));
        let [bgr, bgg, bgb] = bgrgb.split(', ');
        let orirgb = originColor.substring(originColor.indexOf('(')+1, originColor.indexOf(')'));
        let [orir, orig, orib] = orirgb.split(', ');
        let r = parseInt(parseInt(bgr) - parseInt(orir) * 0.1);
        let g = parseInt(parseInt(bgg) - parseInt(orig) * 0.1);
        let b = parseInt(parseInt(bgb) - parseInt(orib) * 0.1);
        r = (r>0)?r:0;
        g = (g>0)?g:0;
        b = (b>0)?b:0;
        bgColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        return bgColor;
    }
}

function clearColor() {
    pixels.forEach(element => {
        element.style.backgroundColor = 'transparent';
        element.divColor = 'transparent';
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


createDivs();
body.appendChild(container);

normal.addEventListener('click', () => {color = 'normal'});
rainbow.addEventListener('click', () => {color = 'rainbow'});
shadow.addEventListener('click', () => {color = 'shadow'});
erase.addEventListener('click', () => {color = 'erase'});
clrbtn.addEventListener('click', clearColor);
choose.addEventListener('input', () => {color = 'choose'});
size_range.addEventListener('change', changeSize);