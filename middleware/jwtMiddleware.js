import jwt from "jsonwebtoken";

const jwtMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({
                msg: "token is not valid",
            });
        } else {
            req.decoded = decoded;
            next();
        }
    });
};

export default jwtMiddleware;
