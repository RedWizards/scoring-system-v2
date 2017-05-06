'use strict'

const db = require("../knex/db");

const table_name = 'project';

var addProject = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        team_id: data.team_id,
        event_id: data.event_id,
        project_name: data.project_name,
        project_type: data.project_type,
        short_desc: data.short_desc,
        long_desc: data.long_desc,
    });
}

var updateProject = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getProject = (event_id) => {
    return db(table_name)
        .where('event_id', event_id);
}

module.exports = {
    addProject: addProject,
    updateProject: updateProject,
    getProject: getProject
}
