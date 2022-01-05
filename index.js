const pkg = require('./package.json');
const path = require('path');
const glob = require('glob');
const webfontsGenerator = require('webfonts-generator');

const options = {
	dest: 'dist/',
	fontName: pkg.name,
	classPrefix: 'choreo-icon',
	fontFamilyName: pkg.fontFamilyName
}

glob("./icons/*.svg", {}, function (er, files) {
	webfontsGenerator({
	  	files: files,
		fontName: options.fontName,
	  	dest: options.dest + 'fonts/',
		cssDest: path.join(options.dest + 'fonts/', options.fontName + '.css'),
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
		startCodepoint: 0xe600
	}, function(error) {
	  if (error) {
		console.log('Fail!', error);
	  } else {
		console.log('Font successfully compiled!!');
	  }
	});
});
