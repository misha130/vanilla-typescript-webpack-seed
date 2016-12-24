
export default class Footer {
    constructor() {
        let $ = require('jquery');
        $((<any>this).constructor.name.toLowerCase()).html(require("./footer.html"));
    }
}
