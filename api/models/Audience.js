var mongoose    =   require("mongoose");

// create instance of Schema
var mongoSchema =   mongoose.Schema;

// cleate schema
var audienceSchema  = ({
	aud_id: Number,
	label: String
});

// create model if not exists.
module.exports = mongoose.model('audience',audienceSchema,'audience');
