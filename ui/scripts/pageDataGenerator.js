var rl = require('readline').createInterface(
        process.stdin, process.stdout
    ),
    prompts = ['numResults'],
    p = 0,
    data = {};
var faker = require('faker');
var parse = require('csv-parse');
var fs = require('fs');
var AUDIENCE_IDS = [];

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

function pickRandomIds(baseIds, minIds, maxIds) {
    var randomIdArray = [];
    var maxNumIds = Math.min(baseIds.length, maxIds);
    var numberOfIds = randomFloatBetween(minIds, maxNumIds, 0);

    var randomIndex;
    for (var i=0; i < numberOfIds; i++) {
        randomIndex = randomFloatBetween(0, baseIds.length - 1, 0);
        randomIdArray.push(baseIds.splice(randomIndex, 1)[0]);
    }

    return randomIdArray;
}

function pickRandomAudienceIds() {
    return pickRandomIds(AUDIENCE_IDS.concat(), 0, 5);
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
            },
            audienceIds: pickRandomAudienceIds(3, 10)

        }
        returnArray.push(dataObject);
    }

    return returnArray;
};

get();

function writeFile() {
    var directoryPath = './public/';
    var fileName = 'attention.json';
    var fileNameAndPath = directoryPath.concat(fileName);
    if (!fs.exists(directoryPath)) {
        fs.mkdir(directoryPath);
    }
    fs.writeFileSync(fileNameAndPath, JSON.stringify(buildPageDataArray(data)));
    console.log('File Saved.');
    process.exit(0);
}

rl.on('line', function(line) {
    data[prompts[p - 1]] = line;

    if (p === prompts.length) {
        return rl.close();
    }

    get();

}).on('close', function() {
    var audienceIdsCsvPath = './../resources/Audience_id.csv';
    fs.createReadStream(audienceIdsCsvPath)
        .pipe(parse({delimiter: ','}))
        .on('data', function(csvRow){
            AUDIENCE_IDS.push(csvRow[0])
        })
        .on('end', function(){
            writeFile();
        });


});
