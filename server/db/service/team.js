'use strict'

const db = require("../knex/db");

const table_name = 'team';

var addTeam = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        team_name: data.team_name,
    });
}

var updateTeam = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getTeam = () => {
    return db(table_name);
}

module.exports = {
    addTeam: addTeam,
    updateTeam: updateTeam,
    getTeam: getTeam
}
