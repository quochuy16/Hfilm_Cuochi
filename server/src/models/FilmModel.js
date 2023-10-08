const mongoose = require('mongoose')

const filmSchema = new mongoose.Schema(
    {
        name: { type: String, trim:true },
        url: { type: String, trim:true },
        category: { type: String, required: true },
        national: { type: String, required: true },
        description: { type: String },
        filmEpisode: { type: String },
        filmName: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;