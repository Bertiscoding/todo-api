"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const Priority_1 = require("../enums/Priority");
const Status_1 = require("../enums/Status");
exports.createValidator = [
    (0, express_validator_1.body)("title")
        .not()
        .isEmpty()
        .withMessage("title is required")
        .trim()
        .isString()
        .withMessage("title needs to be in text format"),
    (0, express_validator_1.body)("date")
        .not()
        .isEmpty()
        .withMessage("date is required")
        .isString()
        .withMessage("date needs to have a valid date format"),
    (0, express_validator_1.body)("description")
        .trim()
        .isString()
        .withMessage("description needs to be in text format"),
    (0, express_validator_1.body)("priority")
        .trim()
        .isIn([Priority_1.Priority.normal, Priority_1.Priority.high, Priority_1.Priority.low])
        .withMessage("Priority can only be normal, high or low."),
    (0, express_validator_1.body)("status")
        .trim()
        .isIn([Status_1.Status.todo, Status_1.Status.inProgress, Status_1.Status.completed])
        .withMessage("Status can only be to do, in progress or completed.")
];
