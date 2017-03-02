import $ from 'jquery';
import { AbstractService } from './abstract.service';

export class WikiService extends AbstractService {

    constructor() {
        super("https://en.wikipedia.org/w/api.php?callback=?");
    }

    search(term) {
        return super.search({
            search: term, // the user's search value
            action: 'opensearch',
            format: "json"
        });
    }

}
