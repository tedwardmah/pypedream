var mongoose    =   require("mongoose");
mongoose.connect('mongodb://10.10.0.92:27017/pypedream');

// create instance of Schema
var mongoSchema =   mongoose.Schema;

// cleate schema
var audienceSchema  = ({
	aud_id: Integer,
	label: String
});

// create model if not exists.
module.exports = mongoose.model('audience',audienceSchema,'audience');
