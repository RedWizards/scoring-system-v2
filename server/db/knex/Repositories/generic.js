"use strict";

var db = require("../db");
var util = require('../db-util');
var _tableName;

class GenericRepo {
    constructor(tableName) {
        this._tableName = tableName;
        _tableName = tableName;
    };
    getForName(data, fieldName) {
        return _getForName(data, fieldName)
    };
    getForAll(data) {
        return _getForAll(data);
    }
    add(data) {
        return _add(data);
    };
    update(data, fieldName) {
        return _update(data, fieldName)
    };
    updateWithFiterFields(filterFields, data) {
        return _updateWithFilterFields(filterFields, data);    
    }
    addIfNotExists(data, referenceFieldName) {
        let fieldName = referenceFieldName || "name"
        return _getForName(data, fieldName).then((results) => {
            if (results.length === 0) {
                return _add(data)
            }
            else {
                return Promise.resolve(results[0]);
            }
        });
    };
    addIfNotAllFieldsExists(data) {
        return _getForAll(data).then((results) => {
            if (results.length === 0) {
                return _add(data)
            }
            else {
                return Promise.resolve(results[0]);
            }
        });
    };
    addIfNotMultiFieldsExists(filterdata, data) {
        return _getForAll(filterdata).then((results) => {
            if (results.length === 0) {
                return _add(data)
            }
            else {
                return Promise.resolve(results[0]);
            }
        });
    };
    upsertUsingMultiFields(filterData, data) {
        return _getForAll(filterData).then((results) => {
            if (results.length === 0) {
                return _add(data)
            }
            else {
                return _updateUsingMultipleFields(filterData, data);
            }
        });
    };
    upsert(data, referenceFieldName) {
        let fieldName = referenceFieldName || "name"
        return _getForName(data, fieldName).then(function (results) {
            if (results && results.length > 0) {
                return _update(data, fieldName).then(() => {
                    return results[0];
                });
            }
            else {
                return _add(data);
            }
        });
    };
    updateUsingMultipleFields(filterData, data) {
        return _updateUsingMultipleFields(filterData, data);
    }
};

var _getForName = (data, fieldName) => {
    return db(_tableName).where(fieldName, data[fieldName]);
}

var _getForAll = (data) => {
    var queryAll = db(_tableName);
    if (data) {
        queryAll.where(data);
    }
    return queryAll;
}

var _add = (data) => {
    return db(_tableName).insert(data, "id")
        .then((results) => {
            return { id: results[0] };
        });
}

var _update = (data, fieldName) => {
    delete data.id;
    return db(_tableName)
        .where(fieldName, data[fieldName])
        .update(data);
}
var _updateWithFilterFields = (filterFields, data) => {
    return db(_tableName)
        .where(filterFields)
        .update(data);
}
var _updateUsingMultipleFields = (filterData, data) => {
    delete data.id;
    return db(_tableName)
        .where(filterData)
        .update(data);
}

module.exports.Generic = GenericRepo;