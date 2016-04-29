/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var Backbone = require('backbone');
	var _ = require('underscore');
	var Sexyplan = require('app/adapters/sexyplan-plan');

	var Model = Backbone.Model.extend({

		defaults: {
			"allDay": 1,
			"rec_type": ""
		},

		sync: function(method, model, options) {
			if (method === "create") {
				Sexyplan.create(this.toJSON()).done(function() {
					options.success();
				});
			} else if (method === "delete") {
				Sexyplan.deleteAll().done(function(d) {
					options.success(d);
				});
			}
		}

	});

	var Collection = Backbone.Collection.extend({

		model: Model,

		initialize: function() {
			this.bind("reset", this.reset, this);
		},

		reset: function() {
			var self = this;
			_.each(this.models, function(m) {
				m.destroy();
			});
		},

		sync: function(method, model, options) {
			if (method === "read") {
				Sexyplan.findAll().done(function(d) {
					options.success(d);
				});
			}
		}

	});

	return {
		Model: Model,
		Collection: Collection
	};

});