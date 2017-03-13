'use strict';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Clock} from './clock';
import {Button} from './button';

var container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

var title = document.createElement('h1');
title.innerText = 'ES6 Clock Demo - WebPack 2';
title.className = 'row jumbotron';
container.appendChild(title);

var demo = document.createElement('div');
demo.className = 'row well';
container.appendChild(demo);

// ES6 Clock Demo
var clock = new Clock(demo, false);

// ES6 Button Demo
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
