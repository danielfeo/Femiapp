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
		moment = require('moment'),
		tpl = require('text!tpl/product.html');

	var Plan = require('app/models/plan');

	return Backbone.View.extend({

		template: _.template(tpl),

		events: {
			"click .btn-back": "back",
			"click #plan": "plan"
		},

		back: function(event) {
			window.history.back();
			return false;
		},

		plan: function() {
			var formData = $("#planForm").serializeArray();
			var data = {};
			$.map(formData, function(v, i) {
				var name = v["name"];
				var value = v["value"];

				if (value === "") {
					$("#" + name + "-lbl").css("color", "#c03e8a");
				} else {
					$("#" + name + "-lbl").css("color", "#000");
					data[name] = value;
				}
			});

			function create() {
				var date = moment(data["start-date"] + " " + data["start-time"]);
				var plan = new Plan.Model();
				plan.set("text", data["text"]);
				plan.set("start_date", date.format("YYYY-MM-DD HH:mm:ss"));
				plan.set("reminder", data["reminder"]);

				if (typeof data.rec_type === "undefined") {
					plan.set("end_date", date.add("days", data["numero"]).format("YYYY-MM-DD HH:mm:ss"));
					plan.set("event_length", data["numero"]);
				} else {
					plan.set("end_date", date.add("days", 12).format("YYYY-MM-DD HH:mm:ss"));
					plan.set("event_length", 12);
					plan.set("rec_type", data.rec_type);
				}

				plan.save(null, {
					"success": function(model) {
						navigator.notification.alert('Recordatorio guardado!', function() {
							App.router.navigate("calendar", {
								trigger: true
							});
							return false;
						}, 'Listo!', 'Aceptar');
					}
				});
			}
			if (Object.keys(data).length >= 5) {

				if (App.collections.plan.length > 0) {
					navigator.notification.confirm(
						'Las notificaciones anteriores se borrarán y creará una nueva. ¿Desea continuar?',
						function(ix) {
							switch (ix) {
								case 1:
									window.plugin.notification.local.cancelAll(function() {
										console.log("Todas las notificaciones borradas!");
									});
									App.collections.plan.reset();
									create();
									break;
								case 2:
									window.history.back();
									break;
								default:
									window.history.back();
									break;
							}
						},
						'Atención', ['Aceptar', 'Cancelar']);
				} else {
					create();
				}
			}
			return false;
		},

		render: function() {
			var self = this;
			self.$el.html(self.template(self.model.toJSON()));
			setTimeout(function() {
				dhx.ui({
					id: "product",
					container: "product",
					view: "layout",
					height: self.$el.height(),
					rows: [{
						view: "scrollview",
						scroll: "y",
						content: {
							height: self.$el.height() * 2,
							rows: [{
								content: "product-detail"
							}]
						}
					}]
				});
			}, 400);
			return self;
		}

	});

});