"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectNotFoundError extends Error {
    constructor(object, id) {
        super(`Error: ${object} with id ${id} not found in the database.`);
        this.name = 'pageNotFoundError';
        Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
    }
}
exports.default = ObjectNotFoundError;
