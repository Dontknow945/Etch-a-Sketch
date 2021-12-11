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
const size_range = document.querySelector('#size-range');
const srlabel = document.querySelector('#srlabel');
const container = document.createElement('div');
let pixels = [];
let colors = [];


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
            colors[i*size+j] = 'transparent';
        }
    }
}

function switchColor(square) {
    switch (color) {
        case 'rainbow':
            colors[square.id] = getRandomColor();
            return colors[square.id];
        case 'black':
            colors[square.id] = 'rgb(0, 0, 0)';
            return 'black';
        case 'shadow':
            return getDarkerColor(square);
        case 'erase':
            colors[square.id] = 'transparent';
            return 'transparent';
        default:
            return 'black';
    }
}

function changeColor(e) {
    e.stopPropagation();
    this.style.backgroundColor = switchColor(this);
}

function getRandomColor() {
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    let result = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return result;
}

function getDarkerColor(square) {
    originColor = colors[square.id];
    bgColor = square.style.backgroundColor;
    let re = /^rgb/;
    if (!re.test(bgColor)) {
        return bgColor;
    } else {
        colorString = String(bgColor);
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
    });
    colors.forEach(element => {
        element = 'transparent';
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
size_range.addEventListener('change', changeSize);