/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var $ = require('jquery');

	var db = function(odb) {
		this.odb = odb;
	};

	db.prototype = {

		constructor: db,

		create: function(t, d, cb) {

			var self = this;

			var fields = [];
			$.each(d, function(k1, v1) {
				fields.push(k1);
			});

			this.odb.transaction(

				function(tx) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS ' + t + ' (id INTEGER PRIMARY KEY AUTOINCREMENT,' + fields.join() + ')');
				},

				function(err) {
					console.log(err);
				},

				function() {

					self.odb.transaction(

						function(tx) {
							var values = [];
							$.each(d, function(k2, v2) {
								var v;
								if (typeof v2 === "object") {
									v = JSON.stringify(v2);
								} else {
									v = v2;
								}
								values.push("'" + v + "'");
							});
							if (values.length === fields.length) {
								var sql = 'INSERT INTO ' + t + ' (' + fields.join() + ') VALUES (' + values.join() + ')';
								tx.executeSql(sql);
							} else {
								console.error("El registro " + values.join() + " no coincide el numero de columnas!");
							}
						},

						function(err) {
							console.log(err);
						},

						cb);

				});
		},

		read: function(sql, cb) {

			var dataCollection = [];

			this.odb.transaction(

				function(tx) {
					tx.executeSql(sql, [], function(tx, results) {
						var len = results.rows.length;
						for (var i = 0; i < len; i = i + 1) {
							dataCollection[i] = results.rows.item(i);
						}
						cb(dataCollection);
					});
				},

				function(err) {
					console.log(err);
					cb(dataCollection);
				});
		}

	};

	return db;

});