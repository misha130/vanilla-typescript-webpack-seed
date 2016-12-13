declare var require: any;

import { Component, Vue } from 'av-ts';
@Component({
    template: require('./app.vue'),
})
export default class App extends Vue {
    public name = 'Rem';
    public i = 0;
    constructor() {
        super();
    }
    public add() {
        this.i++;
    }
    public sub() {
        this.i--;
    }
}
