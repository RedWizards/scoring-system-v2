'use strict'

const db = require("../knex/db");
const table_name = 'scores';

var addScore = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        judge_id: data.judge_id,
        criteria_id: data.criteria_id,
        project_id: data.project_id,
        score: data.score
    });
}

var updateScore = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getScore = (data) => {
    return db(table_name).select('id', 'score').where(data);
}

module.exports = {
    addScore: addScore,
    updateScore: updateScore,
    getScore: getScore
}
