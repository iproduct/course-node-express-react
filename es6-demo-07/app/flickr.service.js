import $ from "jquery";
import { AbstractService } from "./abstract.service";

export class FlickrService extends AbstractService {

    constructor() {
        super("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?");
    }

    search(tags) {
        return super.search({
            tags: tags,
            tagmode: "any",
            format: "json"
        });
    }

}
