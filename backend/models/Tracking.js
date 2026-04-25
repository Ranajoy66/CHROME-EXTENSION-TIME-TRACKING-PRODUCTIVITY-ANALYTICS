// models/Tracking.js

import mongoose from "mongoose";

const schema = new mongoose.Schema({
    url: String,
    domain: String,
    duration: Number,
    category: String,
    date: { type: Date, default: Date.now }
});

export default mongoose.model("Tracking", schema);