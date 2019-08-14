'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lodash = require('lodash');

var validateField = function validateField(value, rules) {
	var errors = [];
	var type = '';

	rules.split('|').map(function (rule) {

		// empty validation
		if (rule === 'required') {
			if (!value || value.length === 0) {
				return errors.push('This is required');
			}
		}

		if (value === undefined || value === null || value === '' || value.length === 0) {
			return false;
		}

		// integer validation
		if (rule === 'integer') {
			type = rule;
			if (isNaN(parseInt(value, 10))) {
				return errors.push('This must be a number');
			}
		}

		// string validation
		if (rule === 'string') {
			type = rule;
			if (typeof value !== 'string') {
				return errors.push('This mut be a string');
			}
		}

		// string validation
		if (rule === 'file') {
			type = rule;
		}

		// email validation
		if (rule === 'email') {
			var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (emailRegex.test(value) === false) {
				return errors.push('This must be a valid email address');
			}
		}

		// except validation
		if (rule.indexOf('except:') !== -1) {
			var exceptValues = rule.replace('except:', '').split(',');

			// string validation
			if (typeof value === 'string' && (0, _lodash.includes)(exceptValues, value.toLowerCase())) {
				return errors.push('This cannot be ' + value);
			}
		}

		// min value validation
		if (rule.indexOf('min:') !== -1) {
			var minValue = rule.replace('min:', '');

			// string validation
			if (type === 'string' || typeof value === 'string') {
				if (value.length < parseInt(minValue, 10)) {
					return errors.push('This must be at least ' + minValue + ' characters long');
				}

				// integer validation
			} else if (type === 'integer' || !isNaN(parseInt(value, 10))) {
				if (parseInt(value, 10) < parseInt(minValue, 10)) {
					return errors.push('This cannot be smaller than ' + minValue);
				}

				// array validation
			} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				if (value.length < parseInt(minValue, 10)) {
					return errors.push('This should have at least ' + minValue + ' options selected');
				}
			}
		}

		// max value validation
		if (rule.indexOf('max:') !== -1) {
			var maxValue = rule.replace('max:', '');

			// string validation
			if (type === 'string' || typeof value === 'string') {
				if (value.length > parseInt(maxValue, 10)) {
					return errors.push('This cannot exceed ' + maxValue + ' characters');
				}

				// file validation
			} else if (type === 'file') {
				var invalid = (0, _lodash.filter)(value, function (file) {
					return parseInt(file.size / 1024, 10) > parseInt(maxValue, 10);
				});

				if (invalid && invalid.length > 0) {
					return errors.push('Uploaded file cannot be greater than ' + maxValue / 1000 + ' Mb');
				}

				// integer validation
			} else if (type === 'integer' || !isNaN(parseInt(value, 10))) {
				if (parseInt(value, 10) > parseInt(maxValue, 10)) {
					return errors.push('This cannot be greater than ' + maxValue);
				}

				// array validation
			} else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
				if (value.length > parseInt(maxValue, 10)) {
					return errors.push('This should not have more than ' + maxValue + ' options selected');
				}
			}
		}

		return false;
	});

	return errors;
};

var validate = function validate(value, rules) {
	var errors = validateField(value, rules);

	if (errors.length > 0) {
		return {
			valid: false,
			errors: errors
		};
	}

	return {
		valid: true,
		errors: errors
	};
};

exports.default = validate;