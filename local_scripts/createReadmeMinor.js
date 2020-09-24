#!/usr/bin/env node
/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-vx.x.x                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/

var root = require.resolve('../package.json').replace('/package.json', '');
var version = require(`${root}/package.json`, "utf8").version;
var mod = root;
var RED = '\x1b[31m%s\x1b[0m';
var GREEN = '\x1b[32m%s\x1b[0m';
var YELLOW = '\x1b[33m%s\x1b[0m';


var fs = require('fs');
var fillTemplate = require(`${root}/compiled/transformedMinor/craydent.fillTemplate`).default;
var fconfig = require(`${root}/compiled/transformedMinor/craydent.fillTemplate`).TEMPLATE_TAG_CONFIG;
fconfig.IGNORE_CHARS = [];
var readmeTemplate = fs.readFileSync(`${root}/local_scripts/readme.template.md`, 'utf-8');
var dirs = fs.readdirSync(`${root}/compiled/transformedMinor`);
var templateData = {
	version,
	suffix: '',
	methods: []
};
for (var i = 0, len = dirs.length; i < len; i++) {
	let dir = dirs[i];
	var method = require(`${root}/compiled/transformedMinor/${dir}`).default;
	if (method.name in { JSZip: 1 }) { continue; }
	templateData.suffix = `.${method.name}`;
	var data = JSON.parse(method.toString().replace(/[\s\S]*?\/\*\|(\{[\s\S]*?\})\|\*\/[\s\S]*/, '$1'));
	var parameters = data.parameters.map((item) => { for (var prop in item) { return `${prop}: ${item[prop]}` } });
	var overloads = (data.overloads || []).map((overloads) => overloads.parameters.map((item) => { for (var prop in item) { return `${prop}: ${item[prop]}` } }));;
	templateData.methods = [{
		name: method.name,
		functions: [{
			name: method.name,
			info: data.info,
			return: data.returnType,
			parameters,
			overloads
		}]
	}];
	var content = fillTemplate(readmeTemplate, templateData);
	fs.writeFile(`${root}/compiled/transformedMinor/${dir}/readme.md`, content, function (err) {
		if (err) {
			return console.log(RED, err), process.exit(1);;
		}

		console.log(GREEN, `saved: /compiled/transformedMinor/${dir}/readme.md`);
	});
}
