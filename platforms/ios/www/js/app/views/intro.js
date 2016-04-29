/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var $ = require('jquery'),
		Backbone = require('backbone'),
		tpl = require('text!tpl/intro.html');

	return Backbone.View.extend({

		template: _.template(tpl),

		events: {
			"click #acept": "acept",
			"click .btn-back": "back"
		},

		back: function(e) {
			window.history.back();
			return false;
		},

		acept: function(e) {
			window.localStorage.setItem("acept", true);
			App.router.navigate("home", {
				trigger: true
			});
			return true;
		},

		render: function() {
			this.$el.html(this.template);
			return this;
		}

	});

});