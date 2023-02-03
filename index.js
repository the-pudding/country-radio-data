import fs from "fs";
import * as d3 from "d3";

const IN_PATH = "./input/"
const OUT_PATH = "./output/"
const files = fs.readdirSync(IN_PATH).filter(d => d.includes('.csv'));

// Overall variables
let stationName;
let cityName;
let ownerName;
let songPlays;
let songPlays_B2B;
let summaryData = []

function computeSummary(data, file) {
    stationName = data[0].station;
    cityName = file.split("_")[0];
    ownerName = data[0].owner;
    console.log(cityName)
    songPlays = data.length;

    // Women songs stats
    const onlyWomenSongs_ARRAY = data.filter(d => d.gender == "women");
    const onlyWomenSongs_COUNT = onlyWomenSongs_ARRAY.length;
    const onlyWomenSongs_PERCENT = onlyWomenSongs_COUNT/songPlays*100;
    const b2bWomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen").length;
    const b2bWomenSongs_PERCENT = b2bWomenSongs_COUNT/songPlays*100;

    // Men songs stats
    const onlyMenSongs_ARRAY = data.filter(d => d.gender == "men");
    const onlyMenSongs_COUNT = onlyMenSongs_ARRAY.length;
    const onlyMenSongs_PERCENT = onlyMenSongs_COUNT/songPlays*100;
    const b2bMenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bmen").length;
    const b2bMenSongs_PERCENT = b2bMenSongs_COUNT/songPlays*100;

    // Mixed gender songs stats
    const onlyMixedGenderSongs_ARRAY = data.filter(d => d.gender == "male-female");
    const onlyMixedGenderSongs_COUNT = onlyMixedGenderSongs_ARRAY.length;
    const onlyMixedGenderSongs_PERCENT = onlyMixedGenderSongs_COUNT/songPlays*100;
    const b2bMixedGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bmixed").length;
    const b2bMixedGenderSongs_PERCENT = b2bMixedGenderSongs_COUNT/songPlays*100;

    // Women and mixed combined stats
    const onlyCombinedGenderSongs_ARRAY = data.filter(d => d.gender == "male-female" || d.gender == "women");
    const onlyCombinedGenderSongs_COUNT = onlyCombinedGenderSongs_ARRAY.length;
    const onlyCombinedGenderSongs_PERCENT = onlyCombinedGenderSongs_COUNT/songPlays*100;
    const b2bCombinedGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_combinedGender == "B2BCombWomen").length;
    const b2bCombinedGenderSongs_PERCENT = b2bCombinedGenderSongs_COUNT/songPlays*100;

    // Total songs
    const total_COUNT = data.length;

    summaryData.push({cityName, 
                    stationName, 
                    ownerName, 
                    onlyWomenSongs_COUNT, 
                    onlyWomenSongs_PERCENT,
                    b2bWomenSongs_COUNT,
                    b2bWomenSongs_PERCENT,
                    onlyMenSongs_COUNT, 
                    onlyMenSongs_PERCENT,
                    b2bMenSongs_COUNT,
                    b2bMenSongs_PERCENT,
                    onlyMixedGenderSongs_COUNT, 
                    onlyMixedGenderSongs_PERCENT,
                    b2bMixedGenderSongs_COUNT,
                    b2bMixedGenderSongs_PERCENT,
                    onlyCombinedGenderSongs_COUNT,
                    onlyCombinedGenderSongs_PERCENT,
                    b2bCombinedGenderSongs_COUNT,
                    b2bCombinedGenderSongs_PERCENT,
                    total_COUNT
    })
}


function b2bSync(array, i) {
    if (i == 0) {
        return "X"
    } else {
        return array[i-1]
    }
}

function addB2BData(data, file) {
    let b2bValue;
    let b2bValue_ARRAY = [];

    for(var i = 0; i < data.length; i++) {
        if (i > 0) {
            let prevGender = data[i-1].gender;
            let currGender = data[i].gender;
            let prevDate = data[i-1].date;
            let currDate = data[i].date;

            if (currGender == prevGender && prevDate == currDate) {
                if (currGender == "women") { b2bValue = "B2Bwomen" }
                else if (currGender == "men") { b2bValue = "B2Bmen" }
                else { b2bValue = "B2Bmixed" }
                //b2bValue = currGender == "women" ? "B2Bwomen" : "B2Bmen"
            } else {
                b2bValue = "X"
            }

            //b2bValue = prevGender === currGender ? "same" : "different";
            b2bValue_ARRAY.push(b2bValue)
        }
    }

    const currCity = file.split("_")[0];

    songPlays_B2B = data.map((d, i) => ({
        ...d,
        city: currCity,
        b2b_gender: b2bSync(b2bValue_ARRAY, i)
    }))
}

function addB2BCombinedData(data, file) {
    let b2bValueCombined;
    let b2bValueCombined_ARRAY = [];

    for(var i = 0; i < data.length; i++) {
        if (i > 0) {
            let prevGender = data[i-1].gender;
            let currGender = data[i].gender;
            let prevDate = data[i-1].date;
            let currDate = data[i].date;

            if (currDate == prevDate) {
                if (currGender == "women" && prevGender == "women" || currGender == "women" && prevGender == "male-female") {
                    b2bValueCombined = "B2BCombWomen"
                } else if (currGender == "male-female" && prevGender == "women" || currGender == "male-female" && prevGender == "male-female") {
                    b2bValueCombined = "B2BCombWomen"
                } else if (currGender == "men" && prevGender == "men") {
                    b2bValueCombined = "B2BCombMen"
                } else {
                    b2bValueCombined = "X"
                }
            } else {
                b2bValueCombined = "X"
            }

            b2bValueCombined_ARRAY.push(b2bValueCombined)
        }
    }

    const currCity = file.split("_")[0];

    songPlays_B2B = data.map((d, i) => ({
        ...d,
        city: currCity,
        b2b_combinedGender: b2bSync(b2bValueCombined_ARRAY, i)
    }))
}

function createB2Bcsv(file) {
    // Loads in file 
    const raw = fs.readFileSync(`${IN_PATH}${file}`, "utf8");
    const csvData = d3.csvParse(raw);

    // Filters out spot breaks so that the data only includes songs
    let playsOnly = csvData.filter(d => !d.artist.includes("SPOT BREAK") )

    // Adds the column for b2b plays
    addB2BData(playsOnly, file) 
    addB2BCombinedData(songPlays_B2B, file) 

    // Creates summary data for each station
    computeSummary(playsOnly, file)

    // Writes out the station b2b csv
    const concatData = [].concat(...songPlays_B2B).map(d => ({
		...d
	}));
    const csv = d3.csvFormat(concatData);
	fs.writeFileSync(`${OUT_PATH}/${cityName}_${stationName}_withB2B.csv`, csv) 
}

function init() {
    // Loops through each file and adds the b2b data
    files.map(createB2Bcsv)

    // Writes out the summary data csv
    const concatSumData = [].concat(...summaryData).map(d => ({
		...d
	}));
    const csvSum = d3.csvFormat(concatSumData);
    fs.writeFileSync(`${OUT_PATH}/summary.csv`, csvSum) 
}

init();