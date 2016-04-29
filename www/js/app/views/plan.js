/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var Backbone = require('backbone'),
		_ = require('underscore'),
		tpl = require('text!tpl/plan.html'),
		moment = require('moment');

	var Plan = require('app/models/plan');

	return Backbone.View.extend({

		template: _.template(tpl),

		events: {
			"click .btn-back": "back"
		},

		initialize: function() {
			this.collection.bind("add", function(model) {
				var init = moment(model.get("start_date"));
				var r = model.get("reminder").split("-");
				var reminder = init.subtract(r[0], parseInt(r[1], 0));
				var length = parseInt(model.get("event_length"), 0);
				var rec = model.get("rec_type");
				var key = "days";
				var number = 1;

				if (model.get("reminder") != "minutes-0") {

					if (rec === "null") {
						key = "days";
					} else if (rec === "month_1___#") {
						key = "months";
					} else if (rec === "month_3___#") {
						key = "months";
						number = 3;
					}

					var i = 0;
					while (i < length) {
						window.plugin.notification.local.add({
							id: model.get("id") + "-" + i,
							title: "¡Oye!",
							message: model.get("text"),
							date: reminder.add(key, number).toDate(),
							autoCancel: true,
							badge: i,
							sound: App.sound
						});
						i++;
					}
				}

			}, this);
		},

		back: function(event) {
			window.history.back();
			return false;
		},

		render: function() {
			this.$el.html(this.template);
			var data = this.collection.toJSON();
			setTimeout(function() {
				dhx.ui({
					id: "scheduler",
					view: "scheduler",
					container: "plan",
					height: $("#plan").height()
				});
				$$("scheduler").$$("month").show();
				$$("scheduler").$$("calendar").$setSize($("#plan").width(), 240);
				$$("scheduler").$$("calendar").on_click.dhx_cal_day_num = function(e, id, html_object) {
					var date_string = html_object.getAttribute('date');

					var date = this._calendarDateFormatDate(date_string);

					if (this._settings.timeSelect) {
						var selects = this._time_selects;
						date.setMinutes((selects[0].value * 60) + selects[1].value * 1);
					}
					this.selectDate(date);
					this.callEvent("onDateSelect", [date]);
					this.callEvent("onChange", [date]);

					navigator.notification.confirm(
						'¿Llegó tu periodo?',
						function(ix) {
							switch (ix) {
								case 1:
									var plan = new Plan.Model();
									plan.set("text", "Mi periodo");
									plan.set("start_date", moment(date_string + " 00:00").format("YYYY-MM-DD HH:mm:ss"));
									plan.set("end_date", moment(date_string + " 23:59").format("YYYY-MM-DD HH:mm:ss"));
									plan.set("reminder", "minutes-0");
									plan.set("event_length", 1);
									plan.set("rec_type", "month_1___#");
									plan.save(null, {
										"success": function(model) {
											App.collections.plan.fetch({
												"success": function(coll) {
													$$("scheduler").parse(coll.toJSON());
												}
											});
										}
									});
									break;
								case 2:
									break;
								default:
									break;
							}
						},
						date_string, ['Si', 'No']);
				};

				$$("scheduler").$$("calendarDayEvents").blockEvent();
				$$("scheduler").parse(data);
			}, 400);
			return this;
		}

	});

});