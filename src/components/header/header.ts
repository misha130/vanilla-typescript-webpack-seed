export default class Header {
    constructor() {
        $((<any>this).constructor.name.toLowerCase()).html(require("./header.html"));
    }
}
