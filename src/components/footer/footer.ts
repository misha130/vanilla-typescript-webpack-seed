import { $ } from '../../utilities/domManipulation';

export default class Footer {
    constructor() {
        $((<any>this).constructor.name.toLowerCase()).item(0).innerHTML = require("./footer.html");
    }
}
