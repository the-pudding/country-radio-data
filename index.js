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

    // Women and all mixed combined stats
    const onlyCombinedGenderSongs_ARRAY = data.filter(d => d.gender == "male-female" || d.gender == "women");
    const onlyCombinedGenderSongs_COUNT = onlyCombinedGenderSongs_ARRAY.length;
    const onlyCombinedGenderSongs_PERCENT = onlyCombinedGenderSongs_COUNT/songPlays*100;
    const b2bCombinedGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_combinedGender == "B2BCombWomen").length;
    const b2bCombinedGenderSongs_PERCENT = b2bCombinedGenderSongs_COUNT/songPlays*100;

    // Women and collabs combined stats
    let onlyCollabGenderSongs_ARRAY = data.filter(d => d.gender == "male-female" && d.ensemble == "collab" || d.gender == "women");
    const onlyCollabGenderSongs_COUNT = onlyCollabGenderSongs_ARRAY.length;
    const onlyCollabGenderSongs_PERCENT = onlyCollabGenderSongs_COUNT/songPlays*100;
    const b2bCollabGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_collabGender == "B2BCollabWomen").length;
    const b2bCollabGenderSongs_PERCENT = b2bCollabGenderSongs_COUNT/songPlays*100;

    const combinedCollabDiff_COUNT = onlyCombinedGenderSongs_COUNT - onlyCollabGenderSongs_COUNT;
    const combinedCollabDiff_PERCENT = onlyCombinedGenderSongs_PERCENT - onlyCollabGenderSongs_PERCENT;
    const b2bcombinedCollabDiff_COUNT = b2bCombinedGenderSongs_COUNT - b2bCollabGenderSongs_COUNT;
    const b2bcombinedCollabDiff_PERCENT = b2bCombinedGenderSongs_PERCENT - b2bCollabGenderSongs_PERCENT;

    // Total songs
    const total_COUNT = data.length;

    summaryData.push({cityName, 
                    stationName, 
                    ownerName, 
                    total_COUNT,
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
                    onlyCollabGenderSongs_COUNT,
                    onlyCollabGenderSongs_PERCENT,
                    b2bCollabGenderSongs_COUNT,
                    b2bCollabGenderSongs_PERCENT,
                    combinedCollabDiff_COUNT,
                    combinedCollabDiff_PERCENT,
                    b2bcombinedCollabDiff_COUNT,
                    b2bcombinedCollabDiff_PERCENT

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

function addB2BCollabData(data, file) {
    let b2bValueCollab;
    let b2bValueCollab_ARRAY = [];

    for(var i = 0; i < data.length; i++) {
        if (i > 0) {
            let prevGender = data[i-1].gender;
            let currEnsemble = data[i].ensemble;
            let prevEnsemble = data[i-1].ensemble;
            let currGender = data[i].gender;
            let prevDate = data[i-1].date;
            let currDate = data[i].date;

            if (currDate == prevDate) {
                if (currGender == "women" && prevGender == "women") {
                    b2bValueCollab = "B2BCollabWomen"
                } else if (currGender == "women" && prevGender == "male-female") {
                    if (prevEnsemble == "collab") {
                        b2bValueCollab = "B2BCollabWomen"
                    } else {
                        b2bValueCollab = "X"
                    }
                } else if (currGender == "male-female" && prevGender == "women") {
                    if (currEnsemble == "collab") {
                        b2bValueCollab = "B2BCollabWomen"
                    } else {
                        b2bValueCollab = "X"
                    }
                } else if (currGender == "male-female" && prevGender == "male-female") {
                    if (prevEnsemble == "collab" && currEnsemble == "collab") {
                        b2bValueCollab = "B2BCollabWomen"
                    } else {
                        b2bValueCollab = "X"
                    }
                } else if (currGender == "men" && prevGender == "men") {
                    b2bValueCollab = "B2BCollabMen"
                } else {
                    b2bValueCollab = "X"
                }
            } else {
                b2bValueCollab = "X"
            }

            b2bValueCollab_ARRAY.push(b2bValueCollab)
        }
    }

    const currCity = file.split("_")[0];

    songPlays_B2B = data.map((d, i) => ({
        ...d,
        city: currCity,
        b2b_collabGender: b2bSync(b2bValueCollab_ARRAY, i)
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
    addB2BCollabData(songPlays_B2B, file) 

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