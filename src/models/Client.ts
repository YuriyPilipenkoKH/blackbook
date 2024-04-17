import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
}, {timestamps: true})

const Client = mongoose.models.clients || mongoose.model("clients", ClientSchema);

export default Client;