/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var $ = require('jquery'),
		Backbone = require('backbone'),
		tpl = require('text!tpl/help.html');

	return Backbone.View.extend({

		template: _.template(tpl),

		events: {
			"click .btn-back": "back",
			"click #send": "send"
		},

		back: function(e) {
			window.history.back();
			return false;
		},

		send: function() {
			var formData = $("#helpForm").serializeArray();
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

			if (Object.keys(data).length >= 5) {

				var message = "<strong>Nombre:  " + data.name + "</strong>" + " <br />";
				message += "<strong>Fecha de nacimiento:  " + data.bithdate + "</strong>" + " <br />";
				message += "<strong>Email:  " + data.email + "</strong>" + " <br />";
				message += "<strong>Ciudad:  " + data.city + "</strong>" + " <br />";
				message += "<strong>Medico tratante:  " + data.medico + "</strong>" + " <br />";
				message += "<p>Comentarios:  " + data.comment + "</p>";

				console.log(message);

				$.ajax({
					type: "POST",
					url: "https://api.mailgun.net/v2/dagrinchi.com/messages",
					username: "api:key-5d17kswasglvytgsyolm8zrpodjojqm3",
					data: {
						"from": "Sexyplan <vitalnetips@gmail.com>",
						"to": "vitalnetips@gmail.com, dudasvitalnetips@gmail.com",
						"subject": "Nuevo contacto del App Sexyplan",
						"html": message,
						"o:tag": "sexyplan",
						"o:tracking": "yes"
					},
					success: function(r) {
						navigator.notification.alert(r.message, function() {
							App.router.navigate("calendar", {
								trigger: true
							});
							return false;
						}, 'Mensaje enviado!', 'Aceptar');
					},
					error: function(r) {
						navigator.notification.alert("Ops! No se pudo enviar tu mensaje, comprueba tu conexión o intenta más tarde.", function() {
							App.router.navigate("calendar", {
								trigger: true
							});
							return false;
						}, 'Error!', 'Aceptar');
					}
				});

			}
			return false;
		},

		render: function() {
			var self = this;
			self.$el.html(self.template);
			setTimeout(function() {
				dhx.ui({
					id: "help",
					container: "help",
					view: "layout",
					height: self.$el.height(),
					rows: [{
						view: "scrollview",
						scroll: "y",
						content: {
							height: self.$el.height() * 2,
							rows: [{
								content: "helpForm",
								height: 534
							}, {
								content: "writeus"
							}]
						}
					}]
				});
			}, 400);
			return self;
		}

	});

});