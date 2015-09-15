var reactTemplates = require('react-templates/src/reactTemplates');
var url = require('url');
var queryString = require('querystring');

module.exports = function(source) {
	this.cacheable && this.cacheable();

	options = {
		modules: 'commonjs'
	};

	return reactTemplates.convertTemplateToReact(source, options);
};