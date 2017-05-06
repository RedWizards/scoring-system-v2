'use strict'

const db = require("../knex/db");

const table_name = 'event';

var addEvent = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        event_name: data.name,
        event_host: data.host,
        event_desc: data.desc,
        event_date: data.date
    });
}

var updateEvent = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getEvent = () => {
    return db(table_name);
}

module.exports = {
    addEvent: addEvent,
    updateEvent: updateEvent,
    getEvent: getEvent
}
