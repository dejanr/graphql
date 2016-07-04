var babelRelayPlugin = require('babel-relay-plugin');
var schema = require('../src/schema.json');

module.exports = babelRelayPlugin(schema.data);
