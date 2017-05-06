var cfg  = require("./knexfile");
var knex = require("knex")(cfg);

module.exports = knex;