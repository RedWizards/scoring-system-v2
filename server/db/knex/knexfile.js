'use strict'

let configDir = process.env.NODE_CONFIG_DIR;

 // process.env.NODE_CONFIG_DIR = '../../../config';

var config = require('config');

var dbConfig = config.get("Database.Knex");
var config = dbConfig;

config = dbConfig[process.env.NODE_ENV] = dbConfig;

module.exports = dbConfig;
