/**
 * @dagrinchi
 * Author:
 * David Alméciga: wdavid@dagrinchi.com"
 */

define(function(require) {

	"use strict";

	var $ = require('jquery');

	var findByIdInyectables = function(id) {
		var deferred = $.Deferred();
		deferred.resolve(getProduct(inyectables, id));
		return deferred.promise();
	};

	var findByIdPildoras = function(id) {
		var deferred = $.Deferred();
		deferred.resolve(getProduct(pildoras, id));
		return deferred.promise();
	};

	var findByName = function(name) {
		var deferred = $.Deferred();
		deferred.resolve(getProductsByName($.merge(pildoras, inyectables), name));
		return deferred.promise();
	};	

	function getProductsByName(products, name) {
		var results = [];
		var l = products.length;		
		for (var i = 0; i < l; i++) {
			if (products[i].marca.search(new RegExp(name, "i")) >= 0) {			
				results.push(products[i]);
			}
		}
		return results;
	}

	function getProduct(products, id) {
		var product = null;
		var l = products.length;
		for (var i = 0; i < l; i++) {
			if (products[i].id === id) {
				product = products[i];
				break;
			}
		}
		return product;
	}

	var findAllInyectables = function() {
		var deferred = $.Deferred();
		deferred.resolve(inyectables);
		return deferred.promise();
	};

	var findAllPildoras = function() {
		var deferred = $.Deferred();
		deferred.resolve(pildoras);
		return deferred.promise();
	};

	var inyectables = [{
		"id": 1,
		"categoria": "inyectables",
		"nombreGenerico": "Acetato de Medroxiprogesterona 150mg",
		"marca": "Depotrim",
		"pastillaInyeccion": "Inyectable",
		"numero": 1,
		"frecuencia": "1 inyeccion trimestral",
		"caracteristica": "Ampolla lechosa",
		"modoUso": "Se inicia a la 4 o 6 semana postparto y de ahí en adelante cada 3 meses fecha calendario llegue o no llegue el periodo.",
		"image": "products/dep-100.png",
		"rec_type" : "month_3___#"
	}, {
		"id": 2,
		"categoria": "inyectables",
		"nombreGenerico": "Acetato de Medroxiprogesterona 25mg<br/> Cipionato de Estradiol 5mg",
		"marca": "Femelin",
		"pastillaInyeccion": "Inyectable",
		"numero": 1,
		"frecuencia": "1 inyeccion mensual",
		"caracteristica": "Ampolla lechosa",
		"modoUso": "Se inicia primer dia de la mestruación y se aplica cada mes fecha calendario llegue o no el periodo menstrual.",
		"image": "products/fem-100.png",
		"rec_type" : "month_1___#"
	}, {
		"id": 3,
		"categoria": "inyectables",
		"nombreGenerico": "Enantato de Noretisterona 50mg<br/> Valeriato de Estradiol 5mg",
		"marca": "Nofertyl",
		"pastillaInyeccion": "Inyectable",
		"numero": 1,
		"frecuencia": "1 inyeccion mensual",
		"caracteristica": "Ampolla aceitosa",
		"modoUso": "Se inicia primer dia de la mestruación y se aplica cada mes fecha calendario llegue o no el periodo menstrual.",
		"image": "products/nof-100.png",
		"rec_type" : "month_1___#"
	}, {
		"id": 4,
		"categoria": "inyectables",
		"nombreGenerico": "Algestona acetofenido 150mg<br/> Enantato de Estradiol 10mg",
		"marca": "Synovular",
		"pastillaInyeccion": "Inyectable",
		"numero": 1,
		"frecuencia": "1 inyeccion mensual",
		"caracteristica": "Ampolla aceitosa",
		"modoUso": "Se inicia al 8 día de la menstruación y se espera cada ciclo a que llegue el periodo y se aplica al 8 dia despues de haber llegado.",
		"image": "products/synf-100.png",
		"rec_type" : "month_1___#"
	}, {
		"id": 5,
		"categoria": "inyectables",
		"nombreGenerico": "Algestona acetofenido 90mg<br/> Enantato de Estradiol 6mg",
		"marca": "Synovular suave",
		"pastillaInyeccion": "Inyectable",
		"numero": 1,
		"frecuencia": "1 inyeccion mensual",
		"caracteristica": "Ampolla aceitosa",
		"modoUso": "Se inicia al 8 día de la menstruación y se espera cada ciclo a que llegue el periodo y se aplica al 8 dia despues de haber llegado.",
		"image": "products/syns-100.png",
		"rec_type" : "month_1___#"
	}];

	var pildoras = [{
		"id": 1,
		"categoria": "pildoras",
		"nombreGenerico": "Etinil-estradiol 30mcg<br/> Drospirenona 2mg",
		"marca": "Yax",
		"pastillaInyeccion": "Pildoras diarias",
		"numero": 21,
		"frecuencia": "1 tableta diaria",
		"caracteristica": "Blancas",
		"modoUso": "Se inicia primer dia de la menstruacion y se toma todos los dias a la misma hora por 21 dias.<br/>Se descansa 7 días y al 8o día reinicia un nuevo blíster.",
		"image": "products/yax-100.png",
		"rec_type" : null
	}, {
		"id": 2,
		"categoria": "pildoras",
		"nombreGenerico": "Etinil-estradiol 20mcg<br/> Drospirenona 2mg",
		"marca": "Yaxibelle",
		"pastillaInyeccion": "Pildoras diarias",
		"numero": 28,
		"frecuencia": "1 tableta diaria",
		"caracteristica": "24 Rosadas y 4 blancas",
		"modoUso": "Se inicia primer dia de la menstruacion y se toma todos los dias por 28 días sin parar y vuelve a iniciar el siguiente blister sin parar.",
		"image": "products/yaxi-100.png",
		"rec_type" : null
	}, {
		"id": 3,
		"categoria": "pildoras",
		"nombreGenerico": "Etinil-estradiol 30mcg<br/> Dienogest 2mg",
		"marca": "Bellaface",
		"pastillaInyeccion": "Pildoras diarias",
		"numero": 21,
		"frecuencia": "1 tableta diaria",
		"caracteristica": "Blancas",
		"modoUso": "Se inicia primer dia de la menstruacion y se toma todos los dias a la misma hora por 21 dias.<br/>Se descansa 7 días y al 8o día reinicia un nuevo blíster.",
		"image": "products/bell-100.png",
		"rec_type" : null
	}, {
		"id": 4,
		"categoria": "pildoras",
		"nombreGenerico": "Etinil-estradiol 20mcg<br/> Levonorgestrel 100 mcg",
		"marca": "Minipil",
		"pastillaInyeccion": "Pildoras diarias",
		"numero": 21,
		"frecuencia": "1 tableta diaria",
		"caracteristica": "Blancas",
		"modoUso": "Se inicia primer dia de la menstruacion y se toma todos los dias a la misma hora por 21 dias.<br/>Se descansa 7 días y al 8o día reinicia un nuevo blíster.",
		"image": "products/min-100.png",
		"rec_type" : null
	}, {
		"id": 5,
		"categoria": "pildoras",
		"nombreGenerico": "Levonorgestrel 0.03mg",
		"marca": "Poslac",
		"pastillaInyeccion": "Pildoras diarias",
		"numero": 35,
		"frecuencia": "1 tableta diaria",
		"caracteristica": "Blancas",
		"modoUso": "Se inicia 4 a 6 semanas postparto y se toma todos los dias por 35 días sin parar y vuelve y se inicia el siguiente blister.",
		"image": "products/pos-100.png",
		"rec_type" : null
	}, {
		"id": 6,
		"categoria": "pildoras",
		"nombreGenerico": "Etinil-estradiol 30mcg<br/> Levonorgestrel 150mcg",
		"marca": "Sinovul",
		"pastillaInyeccion": "Pildoras diarias",
		"numero": 21,
		"frecuencia": "1 tableta diaria",
		"caracteristica": "Blancas",
		"modoUso": "Se inicia primer dia de la menstruacion y se toma todos los dias a la misma hora por 21 dias.<br/>Se descansa 7 días y al 8o día reinicia un nuevo blíster.",
		"image": "products/sin-100.png",
		"rec_type" : null
	}
	// ,{
	// 	"id": 7,
	//  "categoria": "inyectables",
	// 	"nombreGenerico": "",
	// 	"marca": "Segubell",
	// 	"pastillaInyeccion": "Pildoras diarias",
	// 	"numero": 28,
	// 	"frecuencia": "1 tableta diaria",
	// 	"caracteristica": "Blancas",
	// 	"modoUso": "Régimen cíclico: Si quiere sangrar, se inicia el primer día de la menstruación, se toma todos los días a la misma hora por 24  días, desecha las últimas 4 tabletas que se encuentran en la franja roja, descansa 4 días y reinicia un nuevo blíster.<br/>Régimen Continuo: Si no desea sangrar, se inicia el primer día de la menstruación, se toma todos los días durante 28 días, al terminar el blíster al otro día inicia un nuevo blíster.",
	// 	"image": "products/seg-100.png",
	// 	"rec_type" : null
	// }
	];

	return {
		findByIdInyectables: findByIdInyectables,
		findByIdPildoras: findByIdPildoras,
		findByName: findByName,
		findAllInyectables: findAllInyectables,
		findAllPildoras: findAllPildoras
	};

});