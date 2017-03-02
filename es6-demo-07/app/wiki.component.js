import $ from "jquery";
import _ from "lodash";
import {AbstractSearchComponent} from "./abstract-search.component";
import { WikiService } from "./wiki.service";

export class WikiComponent extends AbstractSearchComponent {
    constructor(jqElemSelector) {
        super("wiki", jqElemSelector, new WikiService(), 10, "ol");
        let iframeElem = $("<iframe id='wiki-content'>");
        $(jqElemSelector).append(iframeElem);
    }

    getCollection(data) { // overriden from super
        // console.log(_.zip(data[1], data[3]));
        return _.zip(data[1], data[2], data[3]);
    }

    addItem(i, item) {
        let spanElem = $("<span>").attr({
            // "href": "#",
            "title": item[2]
        })
            .click(this.showResource)
            .html(item[0] + ((item[1].length > 0) ? ": " + item[1] : ""));
        return $("<li>").append(spanElem);
    }

    showResource() {
        console.log($(this).attr("title"));
        $("#wiki-content").attr("src", $(this).attr("title"));
    }

}


