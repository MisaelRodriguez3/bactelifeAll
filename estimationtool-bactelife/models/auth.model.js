import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model('administrator', adminSchema);