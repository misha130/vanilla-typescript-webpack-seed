import Footer from './components/footer/footer';
import Header from './components/header/header';
import { $ } from './utilities/domManipulation';
export default class App {
    public name = 'Rem';
    public index: number = 1;
    private component: Element;
    private header: Header;
    private footer: Footer;

    constructor() {
        $("#" + (<any>this).constructor.name.toLowerCase()).innerHTML = require("./app.html");
        this.header = new Header();
        this.footer = new Footer();
        $("#add").addEventListener('click', () => {
            this.add();
        });
        $("#sub").addEventListener('click', () => {
            this.sub();
        });
        $("#name").innerHTML = this.name;
        $("#count").innerHTML = this.index.toString();

    }
    public add() {
        this.index = this.index + 1;
        $("#count").innerHTML = this.index.toString();
    }
    public sub() {
        this.index--;
        $("#count").innerHTML = this.index.toString();
    }
}
