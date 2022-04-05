import { check } from "express-validator";
import peopleModel from "./../model/peopleModel.js";

const regValidator = [
    check("name").notEmpty().withMessage("Name is required!").trim(),
    check("email")
        .custom(async (value) => {
            const find = await peopleModel.find({
                email: value,
            });
            if (find.length !== 0) {
                return Promise.reject("E-mail already in use");
            }
        })
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("This is not valid email!")
        .trim(),
    check("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({
            min: 6,
        })
        .withMessage("password must be at least 6 characters!")
        .trim(),
];

const loginValidator = [
    check("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("This is not valid email!")
        .trim(),
    check("password").notEmpty().withMessage("Password is required!").trim(),
];

export { regValidator, loginValidator };
