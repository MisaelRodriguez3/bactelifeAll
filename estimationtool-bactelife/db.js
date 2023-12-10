import mongoose from "mongoose";
import { DATA_BASE } from "./config.js";

export const connection = async () => {
    try {
        await mongoose.connect(DATA_BASE);
        console.log('successful connection')
    } catch (error) {
        console.log(error);
    }
}