/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var $ = require('jquery'),
		Backbone = require('backbone'),
		tpl = require('text!tpl/search.html');

	return Backbone.View.extend({

		search_txt: "",

		events: {
			"click .btn-back": "back"
		},

		back: function(event) {
			window.history.back();
			return false;
		},

		template: _.template(tpl),	

		render: function() {
			var self = this;
			self.$el.html(self.template({
				search_txt : self.search_txt,
				data: self.collection.toJSON()
			}));
			setTimeout(function() {				
				dhx.ui({
					id: "products",
					container: "products",
					view: "layout",
					height: self.$el.height(),
					rows: [{
						view: "scrollview",
						scroll: "y",
						content: {
							height: self.$el.height() * 2,
							rows: [{
								content: "products-list"
							}]
						}
					}]
				});
			}, 600);
			return self;
		}

	});

});