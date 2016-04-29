/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

var App = {
    search_txt: "",
    sound: "",
    router: {},
    models: {},
    collections: {},
    views: {},
    slider: {},
    utils: {}    
};

var ga = {};

require.config({

    waitSeconds: 120,

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        async: '../lib/requirejs-plugins/async',
        goog: '../lib/requirejs-plugins/goog'
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['app/router', 'ratchet', 'pageslider', '../../cordova'], function(router) {
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);
    document.addEventListener('deviceready', function() {
        ga = navigator.analytics;
        ga.setTrackingId('UA-50190992-1');
        App.router = new router();
        Backbone.history.start();
    });
});