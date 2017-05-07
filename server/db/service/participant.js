'use strict'

const db = require("../knex/db");

const table_name = 'participants';

var addParticipant = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        team_id: data.team_id,
        participant_firstName: data.firstName,
        participant_lastName: data.lastName,
        participant_email: data.email,
        participant_contactNo: data.contactNo
    });
}

var updateParticipant = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getParticipant = () => {
    return db(table_name);
}

module.exports = {
    addParticipant: addParticipant,
    updateParticipant: updateParticipant,
    getParticipant: getParticipant
}
