const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
   name: {type: String, maxlength: 30, required: true },
   developer:{type: String, maxlength: 20, required: true },
   genre:{type: String, maxlength: 20, required: true },
   description: { type: String, maxlength: 50, required: true },
   streamers: [{ type: Schema.Types.ObjectId, ref: 'Streamer' }]
   
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;