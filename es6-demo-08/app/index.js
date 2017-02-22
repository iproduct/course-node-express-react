import React from 'react';

import { Button } from './button';
import { Clock } from './clock';
import { WikiService } from './wiki.service';
import { FlickrComponent } from './flickr.component';
import { WikiComponent } from './wiki.component';

// ES6 Clock Demo
let container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

let row1 = document.createElement('h1');
row1.innerText = 'ES6 Clock Demo';
row1.className = 'row jumbotron';
container.appendChild(row1);

let row2 = document.createElement('div');
row2.className = 'row';
container.appendChild(row2);

let clockElem = document.createElement('div');
clockElem.className = 'well well-lg col-sm-12 col-sm-10 col-md-8 col-lg-6';
row2.appendChild(clockElem);

let clock = new Clock(clockElem);
clock.start();

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


//Flickr Image Search Demo
let row4 = document.createElement('h1');
row4.innerText = 'Flickr Image Search Demo';
row4.className = 'row jumbotron';
container.appendChild(row4);

let row5 = document.createElement('div');
row5.id = 'flickr-search';
row5.className = 'row well well-lg';
container.appendChild(row5);

let flikrSearch = new FlickrComponent('#'+ row5.id);
flikrSearch.search('reactjs');

// let wikiService = new WikiService();
// wikiService.search("javascript")
//     .then( (data) => console.log(JSON.stringify(data)) );


//Wikipedia Search Demo
let row6 = document.createElement('h1');
row6.innerText = 'Wikipedia Search Demo';
row6.className = 'row jumbotron';
container.appendChild(row6);

let row7 = document.createElement('div');
row7.id = 'wiki-search';
row7.className = 'row well well-lg';
container.appendChild(row7);

let wikiSearch = new WikiComponent('#'+ row7.id);
wikiSearch.search('reactjs');


console.log('ES6 Demo 01 loaded successfully.');