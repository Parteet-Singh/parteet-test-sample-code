const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const streamerSchema = new Schema({
   name: {type: String, maxlength: 30, required: true }
});

const Streamer = mongoose.model("Streamer", streamerSchema);

module.exports = Streamer;