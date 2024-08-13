import { body, ValidationChain } from "express-validator";
import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";

export const createValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("title is required")
    .trim()
    .isString()
    .withMessage("title needs to be in text format"),
  
  body("date")
    .not()
    .isEmpty()
    .withMessage("date is required")
    .isString()
    .withMessage("date needs to have a valid date format"),

  body("description")
    .trim()
    .isString()
    .withMessage("description needs to be in text format"),

  body("priority")
    .trim()
    .isIn([Priority.normal, Priority.high, Priority.low])
    .withMessage("Priority can only be normal, high or low."),

  body("status")
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage("Status can only be to do, in progress or completed")
];

export const updateValidator: ValidationChain[] = [
  body("id")
    .not()
    .isEmpty()
    .withMessage("ID is required")
    .trim()
    .isString()
    .withMessage("ID needs to be a valid uuid format"),
  
  body("status")
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage("Status can only be to do, in progress or completed")
];

export const deleteValidator: ValidationChain[] = [
  body("id")
  .not()
  .isEmpty()
  .withMessage("ID is required")
  .trim()
  .isString()
  .withMessage("ID needs to be a valid uuid format")
]
