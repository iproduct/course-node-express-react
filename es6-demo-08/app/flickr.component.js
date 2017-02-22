import $ from "jquery";
import {AbstractSearchComponent} from "./abstract-search.component";
import { FlickrService } from "./flickr.service";

export class FlickrComponent extends AbstractSearchComponent{
    constructor(jqElemSelector) {
        super("flkr", jqElemSelector, new FlickrService(), 4);
    }

    addItem(i, item) {
         return $("<img>").attr("src", item.media.m);
    }

}