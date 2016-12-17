export default class Header {
    constructor() {
        document.getElementsByTagName((<any>this).constructor.name.toLowerCase()).item(0).innerHTML = require("./header.html");
    }
}
