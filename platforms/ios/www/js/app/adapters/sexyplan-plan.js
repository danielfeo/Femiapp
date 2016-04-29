/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var $ = require('jquery');
	var DBase = require('app/utils/db');

	var db = new DBase(window.openDatabase("sexyplan", "1.0", "SEXYPLAN -  TUS DIAS TU FUTURO", 4145728));

	var create = function(data) {
		var deferred = $.Deferred();
		db.create("planning", data, function() {
			deferred.resolve();
		});
		return deferred.promise();
	};

	var deleteAll = function() {
		var deferred = $.Deferred();
		db.read("DELETE FROM planning", function(d) {
			deferred.resolve(d);
		});
		return deferred.promise();
	};

	var findAll = function() {
		var deferred = $.Deferred();
		db.read("SELECT * FROM planning", function(d) {
			deferred.resolve(d);
		});
		return deferred.promise();
	};

	return {
		create: create,
		deleteAll: deleteAll,
		findAll: findAll
	};

});