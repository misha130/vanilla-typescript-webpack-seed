import { $ } from '../../utilities/domManipulation';

export default class Header {
    constructor() {
        $((<any>this).constructor.name.toLowerCase()).item(0).innerHTML = require("./header.html");
    }
}
