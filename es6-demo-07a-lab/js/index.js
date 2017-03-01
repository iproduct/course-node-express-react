// ES6 Clock class
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

const row1 = document.createElement('h1');
row1.innerText = 'ES6 Clock Demo';
row1.className = 'row jumbotron';
container.appendChild(row1);

const row2 = document.createElement('div');
row2.className = 'row well';
container.appendChild(row2);

const clock = new Clock(row2);

//ES6 Button Demo
let row3 = document.createElement('div');
row3.className = 'row btn-toolbar';
container.appendChild(row3);

let startButton, stopButton;
startButton = new Button('Start Clock', () => {
    clock.start();
    startButton.disable();
    stopButton.enable();
});
row3.appendChild(startButton.getElement());

stopButton = new Button('Stop Clock', () => {
    startButton.enable();
    stopButton.disable();
    clock.stop();
});
row3.appendChild(stopButton.getElement());

startButton.disable();
stopButton.enable();

console.log('ES6 Demo 01 loaded successfully.');

