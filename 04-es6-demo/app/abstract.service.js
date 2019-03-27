import $ from 'jquery';

export class AbstractService {
    constructor(serviceUrl){
        this._url = serviceUrl;
    }

    search(data) {
        return getJsonAsPromise(this._url, data);
    }
    
}

function getJsonAsPromise(url, data) {
  return new Promise(function (resolve, reject) {
    $.getJSON(url, data).done(resolve).fail(reject);
  });
}