'use strict';

module.exports = (input) => {
	if (typeof input !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof input}`);
	}
	var fields = input.split('.');
	var f1 = ("00000000" + parseInt(fields[0]).toString(2)).slice(-8);
	var f2 = ("00000000" + parseInt(fields[1]).toString(2)).slice(-8);
	var f3 = ("00000000" + parseInt(fields[2]).toString(2)).slice(-8);
	var f4 = ("00000000" + parseInt(fields[3]).toString(2)).slice(-8);
	return f1 + "." + f2 + "." + f3 + "." + f4;
};