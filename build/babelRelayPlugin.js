const babelRelayPlugin = require('babel-relay-plugin');
const schema = require('../src/schema.json');

module.exports = babelRelayPlugin(schema.data);
