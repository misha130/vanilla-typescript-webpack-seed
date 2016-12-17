import Footer from './components/footer/footer';
import Header from './components/header/header';

export default class App {
    public name = 'Rem';
    public index: number = 1;
    private component: Element;
    private header: Header;
    private footer: Footer;

    constructor() {
        document.getElementById((<any>this).constructor.name.toLowerCase()).innerHTML = require("./app.html");
        this.header = new Header();
        this.footer = new Footer();
        document.getElementById("add").addEventListener('click', () => {
            this.add();
        });
        document.getElementById("sub").addEventListener('click', () => {
            this.sub();
        });
        document.getElementById("name").innerHTML = this.name;
        document.getElementById("count").innerHTML = this.index.toString();

    }
    public add() {
        this.index = this.index + 1;
        document.getElementById("count").innerHTML = this.index.toString();
    }
    public sub() {
        this.index--;
        document.getElementById("count").innerHTML = this.index.toString();
    }
}
