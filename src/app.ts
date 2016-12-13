/* tslint:disable */

declare var require: any;

import Vue = require('vue');
let App = require('./app.vue').default;
new Vue({
    el: '#app',
    components: { App },
    render: (h) => h('app'),
});
