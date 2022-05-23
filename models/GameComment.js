const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameCommentSchema = new Schema({
    name:{type:String, maxlength: 30, required:true},
    comment:{type:String, maxlength: 30, required:true}
});

const GameComment = mongoose.model("GameComment", gameCommentSchema);

module.exports = GameComment;