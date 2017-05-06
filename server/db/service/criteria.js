'use strict'

const db = require("../knex/db");

const table_name = 'criteria';

var addCriteria = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        event_id: data.event_id,
        criteria_desc: data.criteria_desc,
        criteria_weight: data.criteria_weight,
        criteria_longdesc: data.criteria_longdesc
    });
}

var updateCriteria = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getCriteria = (event_id) => {
    return db(table_name)
        .where('event_id', event_id);
}

module.exports = {
    addCriteria: addCriteria,
    updateCriteria: updateCriteria,
    getCriteria: getCriteria
}
