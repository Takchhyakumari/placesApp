var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
	name: String,
	img: String,
	description: String
});
module.exports = mongoose.model("Blog", blogSchema);