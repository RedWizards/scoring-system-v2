'use strict'

const db = require("../knex/db");

const table_name = 'judge';

var addJudge = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        event_id: data.event_id,
        judge_name: data.judge_name,
    });
}

var updateJudge = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getJudge = (event_id) => {
    return db(table_name)
        .where('event_id', event_id);
}

module.exports = {
    addJudge: addJudge,
    updateJudge: updateJudge,
    getJudge: getJudge
}
