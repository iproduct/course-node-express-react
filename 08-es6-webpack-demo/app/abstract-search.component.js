import $ from 'jquery';

export class AbstractSearchComponent {
    constructor(namePrefix, jqElementSelector, service, maxItems, resultsHtmlTag) {
        this._selector = jqElementSelector;
        this._service = service;
        this._maxItems = maxItems;
        this._tagsId = namePrefix + "-search-tags";
        this._resultsId = namePrefix + "-search-results";

        resultsHtmlTag = resultsHtmlTag || "div";

        let self = this;
        let formElem = $(jqElementSelector).append("<form class='form-inline' role='form'>");
        let inputElem = $("<input id='" + this._tagsId + "' type='text' class='search-tags' placeholder='search tags'>")
            .bind('keypress', (event) => {
                if (event.keyCode == 13) {
                    self.search($("#" + this._tagsId).val());
                }
            });
        let buttonElem = $("<button>Search</buttton>")
            .click(() => self.search($("#" + this._tagsId).val()));
        formElem.append(inputElem);
        formElem.append(buttonElem);
        $(jqElementSelector)
            .append("<" + resultsHtmlTag + " id='" + this._resultsId + "' class='search-results'>");

    }

    get maxItems() {
        return this._maxItems;
    }

    search(tags) {
        $("#" + this._tagsId).val(tags);
        let resultsSelector = "#" + this._resultsId;
        this._service.search(tags)
            .then((data) => {
                $(resultsSelector).empty();
                $.each(this.getCollection(data), this._addItemOrFinish.bind(this));
            });
    }

    getCollection(data) { // to be overriden by children
        return data.items;
    }

    addItem(i, item) { // abstract method returning jqElement to be added to resultss
    }

    _addItemOrFinish(i, item) {
        this.addItem(i, item).appendTo("#" + this._resultsId); // call abstract method
        if (i >= this.maxItems - 1) return false; // return false to stop addind items
    }

}