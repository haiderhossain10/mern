import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const peopleModel = mongoose.model("People", peopleSchema);
export default peopleModel;
