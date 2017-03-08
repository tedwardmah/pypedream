var rl = require('readline').createInterface(
        process.stdin, process.stdout
    ),
    prompts = ['numResults'],
    p = 0,
    data = {};
var faker = require('faker');

var get = function() {
    rl.setPrompt(prompts[p] + '> ');
    rl.prompt();

    p++
};

function randomFloatBetween(min,max,precision){
    var minValue = parseFloat(min);
    var maxValue = parseFloat(max);
    if(typeof(precision) == 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

var buildPageDataArray = function (data) {
    var returnArray = [];
    var dataObject = {};
    var numResults = data.numResults || 100;
    var domain;
    var url;
    var adOps;
    for (var i=0;i<numResults;i++){
        domain = faker.internet.domainName();
        url = domain + '/' + [faker.random.word(), faker.random.word(), faker.random.word()].join('-').replace(/ /g, "-");
        adOps = randomFloatBetween(0, 100000, 0);
        adStarts = randomFloatBetween(0, adOps, 0);
        adCompletes = randomFloatBetween(0, adStarts, 0);

        dataObject = {
            url: url,
            domain_name: domain,
            twentyfour_hour: {
                ad_metrics: {
                    par: randomFloatBetween(0, 1, 2),
                    skip_rank: randomFloatBetween(0, 1, 2),
                    completion_rank: randomFloatBetween(0, 1, 2),
                    ad_starts: adStarts,
                    ad_opps: adOps,
                    ad_completes: adCompletes,
                    fill_rate: parseFloat(adStarts / adOps).toFixed(2),
                    util_rate: parseFloat(adCompletes / adStarts).toFixed(2)
                },
                page_metric: {
                    pageview: randomFloatBetween(0, 1000, 0),
                    timespent_rank: randomFloatBetween(0, 1000, 0),
                    session_initiation_rank: randomFloatBetween(0, 1, 2),
                    scroll_rank: randomFloatBetween(0, 1, 2),
                    click_rank: randomFloatBetween(0, 1, 2)
                }
            }

        }
        returnArray.push(dataObject);
    }

    return returnArray;
};

get();

rl.on('line', function(line) {
    data[prompts[p - 1]] = line;

    if (p === prompts.length) {
        return rl.close();
    }

    get();

}).on('close', function() {
    var $fs = require('fs');
    var directoryPath = './public/';
    var fileName = 'attention.json';
    var fileNameAndPath = directoryPath.concat(fileName);
    if (!$fs.exists(directoryPath)) {
        $fs.mkdir(directoryPath);
    }
    $fs.writeFileSync(fileNameAndPath, JSON.stringify(buildPageDataArray(data)));
    console.log('File Saved.');
    process.exit(0);
});
