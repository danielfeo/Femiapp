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

	return Backbone.View.extend({

		events: {
			"click .btn-back": "back"
		},

		back: function(event) {
			window.history.back();
			return false;
		},

		render: function() {
			var self = this;
			self.$el.html(self.template({
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