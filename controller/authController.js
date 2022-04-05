import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import peopleModel from "../model/peopleModel.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            errors: errors.array(),
        });
    } else {
        const hash = await bcrypt.hash(password, 10);
        const insert = await peopleModel.create({
            name: name,
            email: email,
            password: hash,
        });

        if (insert) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "mdhaiderhossain11@gmail.com",
                    pass: "MdHaider@Hossain11",
                },
            });

            transporter.sendMail(
                {
                    from: "mdhaiderhossain11@gmail.com",
                    to: email,
                    subject: "Account verify",
                    html:
                        "<a target='_blank' href='http://localhost:5000/api/verify?id=" +
                        insert._id +
                        "'>Verify Now</a>",
                },
                (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                        res.status(200).json({
                            alert: "Your account is not activated. please check your email for activation!",
                            msg: "Account created successfully",
                        });
                    }
                }
            );
        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            errors: errors.array(),
        });
    } else {
        const find = await peopleModel.findOne({ email: email }).exec();
        if (find) {
            if (find.isActive) {
                bcrypt.compare(password, find.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign(
                            {
                                _id: find._id,
                                name: find.name,
                                email: find.email,
                            },
                            process.env.SECRET_KEY,
                            {
                                expiresIn: 30,
                            }
                        );
                        res.status(200).json({
                            token: token,
                            isLogged: true,
                        });
                    } else {
                        res.status(200).json({
                            alert: "Email & password is not matched!",
                        });
                    }
                });
            } else {
                res.status(200).json({
                    alert: "Your account is not activated. please check your email for activation!",
                });
            }
        } else {
            res.status(200).json({ alert: "User not found" });
        }
    }
};

export { register, login };
