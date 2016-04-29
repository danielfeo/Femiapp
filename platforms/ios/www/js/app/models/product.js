/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var Backbone = require('backbone');
	var SexyplanData = require('app/adapters/sexyplan-data');

	var Model = Backbone.Model.extend({

		sync: function(method, model, options) {
			if (method === "read") {
				if (this.type === "inyectables") {
					SexyplanData.findByIdInyectables(parseInt(this.id, 0)).done(function(data) {
						options.success(data);
					});
				} else if (this.type === "pildoras") {
					SexyplanData.findByIdPildoras(parseInt(this.id, 0)).done(function(data) {
						options.success(data);
					});
				}
			}
		}

	});

	var Collection = Backbone.Collection.extend({

		model: Model,

		sync: function(method, model, options) {
			if (method === "read") {
				if (this.type === "inyectables") {
					SexyplanData.findAllInyectables().done(function(data) {
						options.success(data);
					});
				} else if (this.type === "pildoras") {
					SexyplanData.findAllPildoras().done(function(data) {
						options.success(data);
					});
				} else if (this.type === "search") {
					var prom = SexyplanData.findByName(this.search_txt);
					prom.done(function(data) {
						options.success(data);
					});
				}
			}
		}

	});

	return {
		Model: Model,
		Collection: Collection
	};

});