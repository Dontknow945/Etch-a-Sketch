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
        pixels[i] = document.createElement('div');
        pixels[i].style.width = pixels[i].style.height = `${pad/size}px`;
        pixels[i].style.display = 'inline-block';
        pixels[i].style.boxSizing = 'border-box';
        pixels[i].style.border = '1px black solid';
        container.appendChild(pixels[i]);
    }
}

body.appendChild(container);