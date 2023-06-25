const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    typeClean: {
        type: String,
        required: true,
    },
    typeRoom: {
        type: String,
        required: true,
    },
    areaRoom: {
        type: Number,
        required: true,
    },
    addition: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;