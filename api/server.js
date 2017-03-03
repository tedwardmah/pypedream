var express       =   require("express");
var bodyParser    =   require("body-parser");
var Page          =   require("./models/Page");
var mongoose      =   require("mongoose");
mongoose.Promise  =  require('bluebird');

var app           =   express();
var router        =   express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "The pypedream is working. Please use route /pages"});
});

//TODO: 
// (1) Add null/datatype tests for query params 
// (2) Add better err msg 
// (3) Move route logic out of server.js
// (4) Add audience routes

router.route("/pages")
    .get(function(req,res){
        var response = {};
 
	var limit = parseInt(req.query.limit);
      
	Page.find({}).sort({'twentyfour_hour.ad_metrics.par': -1}).limit(limit).exec()
		.then(function(data) {
			response = {"error" : false,"message" : data};
        		res.json(response);

		})
		.catch(function(err){
	              response = {"error" : true,"message" : err};
        	      res.json(response);
		})
});

router.route("/pages/top")
    .get(function(req,res){
        var response = {};

	var limit = parseInt(req.query.limit);

	Page.find({}).sort({'twentyfour_hour.ad_metrics.par': -1}).limit(limit).exec()
		.then(function(data) {
			response = {"error" : false,"message" : data};
        		res.json(response);

		})
		.catch(function(err){
	              response = {"error" : true,"message" : err};
        	      res.json(response);
		})
});

router.route("/pages/bottom")
    .get(function(req,res){
        var response = {};

	var limit = parseInt(req.query.limit);

	Page.find({}).sort({'twentyfour_hour.ad_metrics.par': 1}).limit(limit).exec()
		.then(function(data) {
			response = {"error" : false,"message" : data};
        		res.json(response);

		})
		.catch(function(err){
	              response = {"error" : true,"message" : err};
        	      res.json(response);
		})

});

router.route("/pages/random")
    .get(function(req,res){
        var response = {};

	var limit = parseInt(req.query.limit);

	Page.aggregate([{$sample: {size: limit}}]).sort({'twentyfour_hour.ad_metrics.par': 1}).limit(limit).exec()
		.then(function(data) {
			response = {"error" : false,"message" : data};
        		res.json(response);

		})
		.catch(function(err){
	              response = {"error" : true,"message" : err};
        	      res.json(response);
		})

});


app.use('/',router);
app.listen(3002);
console.log("Server running at http://127.0.0.1:3002/'");
