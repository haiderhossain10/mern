import peopleModel from "../model/peopleModel.js";

const verify = async (req, res) => {
    if (req.query.id) {
        const update = await peopleModel.findOneAndUpdate(
            { _id: req.query.id },
            { isActive: true }
        );
        if (update) {
            res.status(200).json({ msg: "Account is activated!" });
        }
    } else {
        res.send("Empty");
    }
};

const jwt = async (req, res) => {
    res.send("jwt");
};

export { verify, jwt };
