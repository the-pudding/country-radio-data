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

    const OVNwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "OVN")
    const OVNwomenSongs_COUNT = OVNwomenSongs_ARRAY.length;
    const OVNwomenSongs_PERCENT = OVNwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bOVNwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "OVN").length;
    const b2bOVNwomenSongs_PERCENT = b2bOVNwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    const AMDwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "AMD")
    const AMDwomenSongs_COUNT = AMDwomenSongs_ARRAY.length;
    const AMDwomenSongs_PERCENT = AMDwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bAMDwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "AMD").length;
    const b2bAMDwomenSongs_PERCENT = b2bAMDwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    const MIDwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "MID")
    const MIDwomenSongs_COUNT = MIDwomenSongs_ARRAY.length;
    const MIDwomenSongs_PERCENT = MIDwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bMIDwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "MID").length;
    const b2bMIDwomenSongs_PERCENT = b2bMIDwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    const PMDwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "PMD")
    const PMDwomenSongs_COUNT = PMDwomenSongs_ARRAY.length;
    const PMDwomenSongs_PERCENT = PMDwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bPMDwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "PMD").length;
    const b2bPMDwomenSongs_PERCENT = b2bPMDwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    const EVEwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "EVE")
    const EVEwomenSongs_COUNT = EVEwomenSongs_ARRAY.length;
    const EVEwomenSongs_PERCENT = EVEwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bEVEwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "EVE").length;
    const b2bEVEwomenSongs_PERCENT = b2bEVEwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    const GwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.grc == "G")
    const GwomenSongs_COUNT = GwomenSongs_ARRAY.length;
    const GwomenSongs_PERCENT = GwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bGwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.grc == "G").length;
    const b2bGwomenSongs_PERCENT = b2bGwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    const RwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.grc == "R")
    const RwomenSongs_COUNT = RwomenSongs_ARRAY.length;
    const RwomenSongs_PERCENT = RwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bRwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.grc == "R").length;
    const b2bRwomenSongs_PERCENT = b2bRwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    const CwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.grc == "C")
    const CwomenSongs_COUNT = CwomenSongs_ARRAY.length;
    const CwomenSongs_PERCENT = CwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bCwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.grc == "C").length;
    const b2bCwomenSongs_PERCENT = b2bCwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

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

    // Non-white song stats
    const onlyNonWhiteSong_ARRAY = data.filter(d => d.race !== "white");
    const onlyNonWhiteSongs_COUNT = onlyNonWhiteSong_ARRAY.length;
    const onlyNonWhiteSongs_PERCENT = onlyNonWhiteSongs_COUNT/songPlays*100;
    const b2bNonWhiteSongs_COUNT = songPlays_B2B.filter(d => d.b2b_race == "B2Bnonwhite").length;
    const b2bNonWhiteSongs_PERCENT = b2bNonWhiteSongs_COUNT/songPlays*100;
    
    const onlyNonWhiteWomenSong_ARRAY = data.filter(d => d.race !== "white" && d.gender == "women");
    const onlyNonWhiteWomenSongs_COUNT = onlyNonWhiteWomenSong_ARRAY.length;
    const onlyNonWhiteWomenSongs_PERCENT = onlyNonWhiteWomenSongs_COUNT/songPlays*100;
    const b2bNonWhiteWomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_raceGender == "B2BnonwhiteWomen").length;
    const b2bNonWhiteWomenSongs_PERCENT = b2bNonWhiteWomenSongs_COUNT/songPlays*100;

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
                    b2bcombinedCollabDiff_PERCENT,
                    onlyNonWhiteSongs_COUNT,
                    onlyNonWhiteSongs_PERCENT,
                    b2bNonWhiteSongs_COUNT,
                    b2bNonWhiteSongs_PERCENT,
                    onlyNonWhiteWomenSongs_COUNT,
                    onlyNonWhiteWomenSongs_PERCENT,
                    b2bNonWhiteWomenSongs_COUNT,
                    b2bNonWhiteWomenSongs_PERCENT,
                    OVNwomenSongs_COUNT,
                    OVNwomenSongs_PERCENT,
                    b2bOVNwomenSongs_COUNT,
                    b2bOVNwomenSongs_PERCENT,
                    AMDwomenSongs_COUNT,
                    AMDwomenSongs_PERCENT,
                    b2bAMDwomenSongs_COUNT,
                    b2bAMDwomenSongs_PERCENT,
                    MIDwomenSongs_COUNT,
                    MIDwomenSongs_PERCENT,
                    b2bMIDwomenSongs_COUNT,
                    b2bMIDwomenSongs_PERCENT,
                    PMDwomenSongs_COUNT,
                    PMDwomenSongs_PERCENT,
                    b2bPMDwomenSongs_COUNT,
                    b2bPMDwomenSongs_PERCENT,
                    EVEwomenSongs_COUNT,
                    EVEwomenSongs_PERCENT,
                    b2bEVEwomenSongs_COUNT,
                    b2bEVEwomenSongs_PERCENT,
                    GwomenSongs_COUNT,
                    GwomenSongs_PERCENT,
                    b2bGwomenSongs_COUNT,
                    b2bGwomenSongs_PERCENT,
                    RwomenSongs_COUNT,
                    RwomenSongs_PERCENT,
                    b2bRwomenSongs_COUNT,
                    b2bRwomenSongs_PERCENT,
                    CwomenSongs_COUNT,
                    CwomenSongs_PERCENT,
                    b2bCwomenSongs_COUNT,
                    b2bCwomenSongs_PERCENT

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

function addB2BRaceData(data, file) {
    let b2bRaceValue;
    let b2bRaceValue_ARRAY = [];

    for(var i = 0; i < data.length; i++) {
        if (i > 0) {
            let prevRace = data[i-1].race;
            let currRace = data[i].race;
            let prevDate = data[i-1].date;
            let currDate = data[i].date;

            if (currRace == prevRace && prevDate == currDate || currRace !== "white" && prevRace !=="white" && prevDate == currDate) {
                if (currRace !== "white") { b2bRaceValue = "B2Bnonwhite" }
                else { b2bRaceValue = "B2Bwhite" }
            } else {
                b2bRaceValue = "X"
            }

            b2bRaceValue_ARRAY.push(b2bRaceValue)
        }
    }

    songPlays_B2B = data.map((d, i) => ({
        ...d,
        b2b_race: b2bSync(b2bRaceValue_ARRAY, i)
    }))
}

function addB2BRaceGenderData(data, file) {
    let b2bRaceGenderValue;
    let b2bRaceGenderValue_ARRAY = [];

    for(var i = 0; i < data.length; i++) {
        if (i > 0) {
            let prevGender = data[i-1].gender;
            let currGender = data[i].gender;
            let prevRace = data[i-1].race;
            let currRace = data[i].race;
            let prevDate = data[i-1].date;
            let currDate = data[i].date;

            if (currRace == prevRace && prevDate == currDate && currGender == prevGender || currRace !== "white" && prevRace !=="white" && prevDate == currDate && currGender == prevGender) {
                if (currRace !== "white" && currGender == "women") { b2bRaceGenderValue = "B2BnonwhiteWomen" }
                else if (currRace !== "white" && currGender == "men") { b2bRaceGenderValue = "B2BnonwhiteMen" }
                else if (currRace !== "white" && currGender == "male-female") { b2bRaceGenderValue = "B2BnonwhiteMixed" }
                else if (currRace == "white" && currGender == "women") { b2bRaceGenderValue = "B2BwhiteWomen" }
                else if (currRace == "white" && currGender == "men") { b2bRaceGenderValue = "B2BwhiteMen" }
                else if (currRace == "white" && currGender == "male-female") { b2bRaceGenderValue = "B2BwhiteMixed" }
                else { b2bRaceGenderValue = "X" }
            } else {
                b2bRaceGenderValue = "X"
            }

            b2bRaceGenderValue_ARRAY.push(b2bRaceGenderValue)
        }
    }

    songPlays_B2B = data.map((d, i) => ({
        ...d,
        b2b_raceGender: b2bSync(b2bRaceGenderValue_ARRAY, i)
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
    addB2BRaceData(songPlays_B2B, file) 
    addB2BRaceGenderData(songPlays_B2B, file)

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