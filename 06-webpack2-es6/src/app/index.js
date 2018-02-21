'use strict';
import './assets/css/main.css';
import { FlickrComponent } from './flickr.component';
import { WikiComponent } from './wiki.component';

// ES6 Clock Demo
let container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

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