import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateMyUserRequest = [
  body("street").isString().notEmpty().withMessage("street must be a string"),
  body("postCode")
    .isString()
    .notEmpty()
    .withMessage("post code must be a string"),
  body("city").isString().notEmpty().withMessage("city must be a string"),
  body("country").isString().notEmpty().withMessage("country must be a string"),
  handleValidationErrors,
];

const itemValidationSchema = {
  "items.*.name": {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Item name must be a string and not empty",
  },
  "items.*.quantity": {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Item quantity must be a number and not empty",
  },
  "items.*.price": {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Item price must be a number and not empty",
  },
  "items.*.total": {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Item total must be a number and not empty",
  },
};

const addressValidationSchema = {
  "clientAddress.street": {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Client address street must be a string and not empty",
  },
  "clientAddress.city": {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Client address city must be a string and not empty",
  },
  "clientAddress.postCode": {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Client address postCode must be a string and not empty",
  },
  "clientAddress.country": {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Client address country must be a string and not empty",
  },
};

// export const validateInvoiceRequest = [
//   body("createdAt").isDate().notEmpty().withMessage("createdAt must be a date"),
//   body("paymentDate")
//     .isDate()
//     .notEmpty()
//     .withMessage("paymentDate must be a date"),
//   body("paymentTerms")
//     .isNumeric()
//     .notEmpty()
//     .withMessage("paymentTerms must be a number"),
//   body("clientName")
//     .isString()
//     .notEmpty()
//     .withMessage("clientName must be a string"),
//   body("clientEmail")
//     .isEmail()
//     .notEmpty()
//     .withMessage("clientEmail must be an email"),
//   body("status")
//     .isIn(["draft", "pending", "paid"])
//     .withMessage("status must be one of 'draft', 'pending', 'paid'"),
//   body("total").isNumeric().withMessage("total must be a number"),
//   body("clientAddress")
//     .isObject()
//     .withMessage("clientAddress must be an object"),
//   body("items").isArray().isEmpty().withMessage("items array cannot be empty"),
//   body("items.*.name").notEmpty().withMessage("item name is required"),
//   body("items.*.quantity").notEmpty().withMessage("item quantity is required"),
//   body("items.*.price").notEmpty().withMessage("item price is required"),
//   body("items.*.total").notEmpty().withMessage("item total price is required"),
//   handleValidationErrors,
// ];

export const validateInvoiceRequest = [
  body("createdAt")
    .isISO8601()
    .withMessage("createdAt must be a valid ISO8601 date"),
  body("paymentTerms")
    .isInt()
    .toInt()
    .withMessage("paymentTerms must be an integer"),
  body("description")
    .isString()
    .notEmpty()
    .withMessage("description must be a string"),
  body("clientName")
    .isString()
    .notEmpty()
    .withMessage("clientName must be a string"),
  body("clientEmail")
    .isEmail()
    .notEmpty()
    .withMessage("clientEmail must be a valid email"),
  body("status")
    .isIn(["draft", "pending", "paid"])
    .withMessage("status must be one of 'draft', 'pending', 'paid'"),

  body("clientAddress.street")
    .isString()
    .notEmpty()
    .withMessage("clientAddress.street must be a string and not empty"),
  body("clientAddress.city")
    .isString()
    .notEmpty()
    .withMessage("clientAddress.city must be a string and not empty"),
  body("clientAddress.postCode")
    .isString()
    .notEmpty()
    .withMessage("clientAddress.postCode must be a string and not empty"),
  body("clientAddress.country")
    .isString()
    .notEmpty()
    .withMessage("clientAddress.country must be a string and not empty"),

  body("items").isArray({ min: 1 }).withMessage("items array cannot be empty"),
  body("items.*.name")
    .isString()
    .notEmpty()
    .withMessage("items.*.name is required"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("items.*.quantity must be an integer greater than 0")
    .toInt(),
  body("items.*.price")
    .isFloat({ min: 0 })
    .withMessage("items.*.price must be a positive number")
    .toFloat(),
  body("items.*.total")
    .isFloat({ min: 0 })
    .withMessage("items.*.total must be a positive number")
    .toFloat(),

  handleValidationErrors,
];
