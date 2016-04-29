/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var $ = require('jquery'),
		Backbone = require('backbone'),
		_ = require('underscore'),
		tpl = require('text!tpl/home.html');

	return Backbone.View.extend({

		events: {
			"submit #search_form": "search"
		},

		search: function(e) {
			App.search_txt = $("#search_form").find('input[name=search_txt]').val();
			if (App.search_txt !== "")
				App.router.navigate("search", {
					trigger: true
				});
			return false;
		},

		template: _.template(tpl),

		render: function() {
			this.$el.html(this.template);
			return this;
		}

	});

});