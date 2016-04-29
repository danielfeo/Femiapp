/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

    "use strict";

    var $ = require('jquery'),
        Backbone = require('backbone'),
        _ = require('underscore');

    var Product = require('app/models/product');
    var Plan = require('app/models/plan');

    var IntroView = require('app/views/intro');
    var HomeView = require('app/views/home');
    var ProductsView = require('app/views/products');
    var ProductView = require('app/views/product');
    var PlanView = require('app/views/plan');
    var HelpView = require('app/views/help');
    var SearchView = require('app/views/search');

    var InyectablesTpl = require('text!tpl/inyectables.html');
    var PildorasTpl = require('text!tpl/pildoras.html');

    return Backbone.Router.extend({

        routes: {
            "": "intro",
            "home": "home",
            "inyectables": "inyectables",
            "pildoras": "pildoras",
            "product/:type/:id": "product",
            "calendar": "calendar",
            "help": "help",
            "search": "search"
        },

        initialize: function() {
            switch (device.platform) {
                case "Android":
                    App.sound = "/www/audio/android/metronome.mp3";
                    break;
                case "iOS":
                    App.sound = "/www/audio/ios/metronome.caf";
                    break;
                default:
                    App.sound = "/www/audio/android/metronome.mp3";
                    break;
            }
            App.slider = new PageSlider($('body'));
        },

        intro: function() {
            ga.sendAppView("intro");
            if (typeof App.collections.plan === "undefined")
                App.collections.plan = new Plan.Collection();
            App.collections.plan.fetch({
                "success": function() {
                    if (typeof App.views.plan === "undefined")
                        App.views.plan = new PlanView({
                            collection: App.collections.plan
                        });

                    var acept = window.localStorage.getItem("acept");
                    if (typeof acept !== "undefined") {
                        if (acept) {
                            App.router.navigate("home", {
                                trigger: true
                            });
                        } else {
                            goIntro();
                        }
                    } else {
                        goIntro();
                    }

                    function goIntro() {
                        App.views.intro = new IntroView();
                        App.views.intro.render();
                        App.slider.slidePage(App.views.intro.$el);
                    }
                }
            });
        },

        home: function() {
            ga.sendAppView("home");
            if (typeof App.views.home === "undefined") {
                App.views.home = new HomeView();
                App.views.home.render();
            } else {
                App.views.home.delegateEvents();
            }
            App.slider.slidePage(App.views.home.$el);
        },

        inyectables: function() {
            ga.sendAppView("inyectables");
            if (typeof App.collections.inyectables === "undefined")
                App.collections.inyectables = new Product.Collection();
            App.collections.inyectables.type = "inyectables";
            App.collections.inyectables.fetch({
                "success": function() {
                    if (typeof App.views.inyectables === "undefined") {
                        App.views.inyectables = new ProductsView({
                            collection: App.collections.inyectables
                        });
                        App.views.inyectables.template = _.template(InyectablesTpl);
                        App.views.inyectables.render();
                    } else {
                        App.views.inyectables.delegateEvents();
                    }
                    App.slider.slidePage(App.views.inyectables.$el);
                }
            });
        },

        pildoras: function() {
            ga.sendAppView("pildoras");
            if (typeof App.collections.pildoras === "undefined")
                App.collections.pildoras = new Product.Collection();
            App.collections.pildoras.type = "pildoras";
            App.collections.pildoras.fetch({
                "success": function() {
                    if (typeof App.views.pildoras === "undefined") {
                        App.views.pildoras = new ProductsView({
                            collection: App.collections.pildoras
                        });
                        App.views.pildoras.template = _.template(PildorasTpl);
                        App.views.pildoras.render();
                    } else {
                        App.views.pildoras.delegateEvents();
                    }
                    App.slider.slidePage(App.views.pildoras.$el);
                }
            });
        },

        product: function(type, id) {
            ga.sendAppView("producto_" + type + "_" + id);
            console.log("producto_" + type + "_" + id);
            App.models.product = new Product.Model({
                id: id
            });
            App.models.product.type = type;
            App.models.product.fetch({
                "success": function() {
                    App.slider.slidePage(new ProductView({
                        model: App.models.product
                    }).render().$el);
                }
            });
        },

        calendar: function() {
            ga.sendAppView("calendar");
            if (typeof App.collections.plan === "undefined")
                App.collections.plan = new Plan.Collection();

            App.collections.plan.fetch({
                "success": function() {
                    if (typeof App.views.plan === "undefined")
                        App.views.plan = new PlanView({
                            collection: App.collections.plan
                        });
                    
                    App.views.plan.render();
                    App.slider.slidePage(App.views.plan.$el);
                }
            });
        },

        help: function() {
            ga.sendAppView("help");
            App.slider.slidePage(new HelpView().render().$el);
        },

        search: function() {
            ga.sendAppView("search");

            if (typeof App.collections.search === "undefined")
                App.collections.search = new Product.Collection();

            App.collections.search.type = "search";
            App.collections.search.search_txt = App.search_txt;
            App.collections.search.fetch({
                "success": function() {
                    if (typeof App.views.search === "undefined") {
                        App.views.search = new SearchView({                            
                            collection: App.collections.search
                        });                
                    } else {
                        App.views.search.delegateEvents();
                    }
                    App.views.search.search_txt = App.search_txt;
                    App.slider.slidePage(App.views.search.render().$el);  
                }
            });
        },

        getQueryVariable: function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return (false);
        }

    });

});