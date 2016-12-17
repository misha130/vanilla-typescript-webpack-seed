export default class Footer {
    constructor() {
        document.getElementsByTagName((<any>this).constructor.name.toLowerCase()).item(0).innerHTML = require("./header.html");
    }
}
