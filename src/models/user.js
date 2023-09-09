import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: Number },
    picture: { type: String},
    role: { type: String, enum: ["Admin", "User","Company"], default: "user" },
    received_orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders"}],
    requested_orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders"}],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
},
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
