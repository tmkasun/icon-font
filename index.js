const pkg = require('./package.json');
const path = require('path');
const glob = require('glob');
const webfontsGenerator = require('webfonts-generator');
const propertiesReader = require('properties-reader');

const options = {
	dest: 'dist/',
	fontName: pkg.name,
	classPrefix: 'siddhi-icon'
}

const properties = propertiesReader('./icons.properties');

//var codepoints = grunt.file.read('icons.properties'),
//	codePointString = codepoints.split('\n');
//
//function removeEscapeCharactersJsonObject(obj){
//	var str = JSON.stringify(obj);
//	str = str.replace(/(?:\\[rn"\"]|[\r\n]+)+/g, ''); //Remove characters "\r\n"
//	str = JSON.parse(str);
//	return str;
//}
//
//var iconsList = (function(){
//	var dataObj = {};
//	codePointString.forEach(function(codeString){
//		var cssClass = codeString.split(':')[0]; 
//		cssClass = cssClass.replace(/\[.*?\]/g, ''); //Remove [square brackets with value] 
//		cssClass = cssClass.replace(/"/g,''); //Remove double quotes
//		var className = cssClass.split('@');
//		dataObj[className[0]] = parseInt(codeString.split(':')[1],16);
//	});
//
//	return removeEscapeCharactersJsonObject(dataObj);
//})();

glob("./icons/*.svg", {}, function (er, files) {
	webfontsGenerator({
	  	files: files,
		fontName: options.fontName,
	  	dest: options.dest + 'fonts/',
		cssDest: path.join(options.dest + 'css/', options.fontName + '.css'),
		cssFontsUrl: '../fonts/',
		templateOptions: {
            iconSelector: options.classPrefix,
			baseSelector: options.classPrefix,
			classPrefix: options.classPrefix + '-',
			mixinPrefix: options.classPrefix + '-icon-'
		},
		cssTemplate: 'templates/css.hbs',
		html: true,
		htmlDest: path.join(options.dest, options.fontName + '.html'),
		htmlTemplate: 'templates/html.hbs',
		startCodepoint: 0xe600,
		codepoints: properties.path()
	}, function(error) {
	  if (error) {
		console.log('Fail!', error);
	  } else {
		console.log('Done!');
	  }
	});
});
