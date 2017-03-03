var mongoose    =   require("mongoose");
mongoose.connect('mongodb://10.10.0.92:27017/pypedream');

// create instance of Schema
var mongoSchema =   mongoose.Schema;

// cleate schema
var pagesSchema  = ({
	id: String,
	url: String,
	domain_name: String,
	timestamp: String,
	hour: {
	  ad_metrics: {
		par: Number,
		skip_rank: Number,
		completion_rank: Number,
		ad_starts: Number,
		ad_opps: Number,
		ad_completes: Number,
		fill_rate: Number,
		util_rate: Number
		},
	page_metric: {
		pageview: Number,
		timespent_rank: Number,
		session_initiation_rank: Number,
		scroll_rank: Number,
		click_rank: Number
	}
      },
	advertiser_ids: [String],
	campaign_ids: [String],
	insertion_ids: [String],
	page_ids: [String],
	placement_ids: [String],
	publisher_ids: []
});

// create model if not exists.
module.exports = mongoose.model('page',pagesSchema,'adg_pages_new');
