'use strict'

const db = require("../knex/db");

const table_name = 'remarks';

var addRemark = (data) => {
    const generic = new (require('../knex/repositories/generic').Generic)(table_name);

    return generic.add({
        judge_id: data.judge_id,
        project_id: data.project_id,
        remark: data.remark
    });
}

var updateRemark = (id, data) => {
    return db(table_name)
        .where("id", id)
        .update(data);
}

var getRemark = (data) => {
    return db(table_name).select('id','remark').where(data);
}

module.exports = {
    addRemark: addRemark,
    updateRemark: updateRemark,
    getRemark: getRemark
}
