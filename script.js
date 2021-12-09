function changeColor(e) {
    e.stopPropagation();
    this.style.backgroundColor = 'black';
}

const pad = 720;
let size = 16;

const body = document.querySelector('body');
const container = document.createElement('div');
let pixels = [];

container.classList.add('container');
container.style.width = container.style.height = `${pad}px`;
container.style.display = 'flex';
container.style.flexWrap = 'wrap';

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

body.appendChild(container);