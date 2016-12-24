import Footer from './components/footer/footer';
import Header from './components/header/header';

export default class App {
    public name = 'Rem';
    public index: number = 1;
    private component: Element;
    private header: Header;
    private footer: Footer;

    constructor() {
        $("#" + (<any>this).constructor.name.toLowerCase()).html(require("./app.html"));
        this.header = new Header();
        this.footer = new Footer();
        $("#add").on('click', () => {
            this.add();
        });
        $("#sub").on('click', () => {
            this.sub();
        });
        $("#name").html(this.name);
        $("#count").html(this.index.toString());

    }
    public add() {
        this.index = this.index + 1;
        $("#count").html(this.index.toString());
    }
    public sub() {
        this.index--;
        $("#count").html(this.index.toString());
    }
}
