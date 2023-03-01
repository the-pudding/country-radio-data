import fs from "fs";
import * as d3 from "d3";

const IN_PATH = "./input/"
const OUT_PATH = "./output/"
const files = fs.readdirSync(IN_PATH).filter(d => d.includes('.csv'));
const lgbtqArtists = ["BROTHERS OSBORNE", "CLARK, BRANDY", "EDEN, BROOKE", "FAIRCHILD, SHELLY", "GILMAN, BILLY", "HAYES, HUNTER", "HERNDON, TY", "LIL NAS X", "CARLILE, BRANDI", "ROSE, LILY", "WRIGHT, CHELY", "HIGHWOMEN", "GRAE, HARPER"];

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

    // WOMEN
    // Women ONLY
    const onlyWomenSongs_ARRAY = data.filter(d => d.gender == "women");
    const onlyWomenSongs_COUNT = onlyWomenSongs_ARRAY.length;
    const onlyWomenSongs_PERCENT = onlyWomenSongs_COUNT/songPlays*100;
    const b2bWomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen").length;
    const b2bWomenSongs_PERCENT = b2bWomenSongs_COUNT/songPlays*100;

    // Women ONLY overnight
    const OVNwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "OVN")
    const OVNwomenSongs_COUNT = OVNwomenSongs_ARRAY.length;
    const OVNwomenSongs_PERCENT = OVNwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bOVNwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "OVN").length;
    const b2bOVNwomenSongs_PERCENT = b2bOVNwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // Women ONLY morning
    const AMDwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "AMD")
    const AMDwomenSongs_COUNT = AMDwomenSongs_ARRAY.length;
    const AMDwomenSongs_PERCENT = AMDwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bAMDwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "AMD").length;
    const b2bAMDwomenSongs_PERCENT = b2bAMDwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // Women ONLY midday
    const MIDwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "MID")
    const MIDwomenSongs_COUNT = MIDwomenSongs_ARRAY.length;
    const MIDwomenSongs_PERCENT = MIDwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bMIDwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "MID").length;
    const b2bMIDwomenSongs_PERCENT = b2bMIDwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // Women ONLY afternoon
    const PMDwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "PMD")
    const PMDwomenSongs_COUNT = PMDwomenSongs_ARRAY.length;
    const PMDwomenSongs_PERCENT = PMDwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bPMDwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "PMD").length;
    const b2bPMDwomenSongs_PERCENT = b2bPMDwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // Women ONLY evening
    const EVEwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.dayparts == "EVE")
    const EVEwomenSongs_COUNT = EVEwomenSongs_ARRAY.length;
    const EVEwomenSongs_PERCENT = EVEwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bEVEwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.dayparts == "EVE").length;
    const b2bEVEwomenSongs_PERCENT = b2bEVEwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // Women ONLY gold
    const GwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.grc == "G")
    const GwomenSongs_COUNT = GwomenSongs_ARRAY.length;
    const GwomenSongs_PERCENT = GwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bGwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.grc == "G").length;
    const b2bGwomenSongs_PERCENT = b2bGwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // Women ONLY recurrent
    const RwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.grc == "R")
    const RwomenSongs_COUNT = RwomenSongs_ARRAY.length;
    const RwomenSongs_PERCENT = RwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bRwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.grc == "R").length;
    const b2bRwomenSongs_PERCENT = b2bRwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // Women ONLY current
    const CwomenSongs_ARRAY = data.filter(d => d.gender == "women" && d.grc == "C")
    const CwomenSongs_COUNT = CwomenSongs_ARRAY.length;
    const CwomenSongs_PERCENT = CwomenSongs_COUNT/onlyWomenSongs_COUNT*100;
    const b2bCwomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen" && d.grc == "C").length;
    const b2bCwomenSongs_PERCENT = b2bCwomenSongs_COUNT/b2bWomenSongs_COUNT*100;

    // MEN
    // Men ONLY
    const onlyMenSongs_ARRAY = data.filter(d => d.gender == "men");
    const onlyMenSongs_COUNT = onlyMenSongs_ARRAY.length;
    const onlyMenSongs_PERCENT = onlyMenSongs_COUNT/songPlays*100;
    const b2bMenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bmen").length;
    const b2bMenSongs_PERCENT = b2bMenSongs_COUNT/songPlays*100;

    // MIXED
    // Mixed gender ONLY
    const onlyMixedGenderSongs_ARRAY = data.filter(d => d.gender == "male-female");
    const onlyMixedGenderSongs_COUNT = onlyMixedGenderSongs_ARRAY.length;
    const onlyMixedGenderSongs_PERCENT = onlyMixedGenderSongs_COUNT/songPlays*100;
    const b2bMixedGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bmixed").length;
    const b2bMixedGenderSongs_PERCENT = b2bMixedGenderSongs_COUNT/songPlays*100;

    // Women + all mixed gender
    const onlyCombinedGenderSongs_ARRAY = data.filter(d => d.gender == "male-female" || d.gender == "women");
    const onlyCombinedGenderSongs_COUNT = onlyCombinedGenderSongs_ARRAY.length;
    const onlyCombinedGenderSongs_PERCENT = onlyCombinedGenderSongs_COUNT/songPlays*100;
    const b2bCombinedGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_combinedGender == "B2BCombWomen").length;
    const b2bCombinedGenderSongs_PERCENT = b2bCombinedGenderSongs_COUNT/songPlays*100;

    // Women + men/women collabs ONLY
    const onlyCollabGenderSongs_ARRAY = data.filter(d => d.gender == "male-female" && d.ensemble == "collab" || d.gender == "women");
    const onlyCollabGenderSongs_COUNT = onlyCollabGenderSongs_ARRAY.length;
    const onlyCollabGenderSongs_PERCENT = onlyCollabGenderSongs_COUNT/songPlays*100;
    const b2bCollabGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_collabGender == "B2BCollabWomen").length;
    const b2bCollabGenderSongs_PERCENT = b2bCollabGenderSongs_COUNT/songPlays*100;

    // Mixed gender without collabs
    const onlyMixedNOCollabGenderSongs_ARRAY = data.filter(d => d.gender == "male-female" && d.ensemble !== "collab");
    const onlyMixedNOCollabGenderSongs_COUNT = onlyMixedNOCollabGenderSongs_ARRAY.length;
    const onlyMixedNOCollabGenderSongs_PERCENT = onlyMixedNOCollabGenderSongs_COUNT/songPlays*100;
    const b2bMixedNOCollabGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_collabGender == "B2BCollabMixed").length;
    const b2bMixedNOCollabGenderSongs_PERCENT = b2bMixedNOCollabGenderSongs_COUNT/songPlays*100;

    // LGBTQ
    const onlyLGBTQSong_ARRAY = songPlays_B2B.filter(d => d.lgbtq == true);
    const onlyLGBTQSongs_COUNT = onlyLGBTQSong_ARRAY.length;
    const onlyLGBTQSongs_PERCENT = onlyLGBTQSongs_COUNT/songPlays*100;
    const b2bLGBTQSongs_COUNT = songPlays_B2B.filter(d => d.b2b_lgbtq == "B2BLGBTQ").length;
    const b2bLGBTQSongs_PERCENT = b2bLGBTQSongs_COUNT/songPlays*100;

    // STRAIGHT
    const onlyStraightSong_ARRAY = songPlays_B2B.filter(d => d.lgbtq == false);
    const onlyStraightSongs_COUNT = onlyStraightSong_ARRAY.length;
    const onlyStraightSongs_PERCENT = onlyStraightSongs_COUNT/songPlays*100;
    const b2bStraightSongs_COUNT = songPlays_B2B.filter(d => d.b2b_lgbtq == "B2BStraight").length;
    const b2bStraightSongs_PERCENT = b2bStraightSongs_COUNT/songPlays*100;

    // POC
    // Men of color
    const onlyPOCMenSong_ARRAY = data.filter(d => d.race !== "white" && d.gender == "men");
    const onlyPOCMenSongs_COUNT = onlyPOCMenSong_ARRAY.length;
    const onlyPOCMenSongs_PERCENT = onlyPOCMenSongs_COUNT/songPlays*100;
    const b2bPOCMenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_raceGender == "B2BPOCMen").length;
    const b2bPOCMenSongs_PERCENT = b2bPOCMenSongs_COUNT/songPlays*100;
    
    // Women of color
    const onlyPOCWomenSong_ARRAY = data.filter(d => d.race !== "white" && d.gender == "women");
    const onlyPOCWomenSongs_COUNT = onlyPOCWomenSong_ARRAY.length;
    const onlyPOCWomenSongs_PERCENT = onlyPOCWomenSongs_COUNT/songPlays*100;
    const b2bPOCWomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_raceGender == "B2BPOCWomen").length;
    const b2bPOCWomenSongs_PERCENT = b2bPOCWomenSongs_COUNT/songPlays*100;

    // Mixed-gender of color
    const onlyPOCMixedSong_ARRAY = data.filter(d => d.race !== "white" && d.gender == "male-female");
    const onlyPOCMixedSongs_COUNT = onlyPOCMixedSong_ARRAY.length;
    const onlyPOCMixedSongs_PERCENT = onlyPOCMixedSongs_COUNT/songPlays*100;
    const b2bPOCMixedSongs_COUNT = songPlays_B2B.filter(d => d.b2b_raceGender == "B2BPOCMixed").length;
    const b2bPOCMixedSongs_PERCENT = b2bPOCMixedSongs_COUNT/songPlays*100;

    // White men
    const onlyWhiteMenSong_ARRAY = data.filter(d => d.race == "white" && d.gender == "men");
    const onlyWhiteMenSongs_COUNT = onlyWhiteMenSong_ARRAY.length;
    const onlyWhiteMenSongs_PERCENT = onlyWhiteMenSongs_COUNT/songPlays*100;
    const b2bWhiteMenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_raceGender == "B2BwhiteMen").length;
    const b2bWhiteMenSongs_PERCENT = b2bWhiteMenSongs_COUNT/songPlays*100;

    // White women
    const onlyWhiteWomenSong_ARRAY = data.filter(d => d.race == "white" && d.gender == "women");
    const onlyWhiteWomenSongs_COUNT = onlyWhiteWomenSong_ARRAY.length;
    const onlyWhiteWomenSongs_PERCENT = onlyWhiteWomenSongs_COUNT/songPlays*100;
    const b2bWhiteWomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_raceGender == "B2BwhiteWomen").length;
    const b2bWhiteWomenSongs_PERCENT = b2bWhiteWomenSongs_COUNT/songPlays*100;

    // White mixed-gender
    const onlyWhiteMixedGenderSong_ARRAY = data.filter(d => d.race == "white" && d.gender == "male-female");
    const onlyWhiteMixedGenderSongs_COUNT = onlyWhiteMixedGenderSong_ARRAY.length;
    const onlyWhiteMixedGenderSongs_PERCENT = onlyWhiteMixedGenderSongs_COUNT/songPlays*100;
    const b2bWhiteMixedGenderSongs_COUNT = songPlays_B2B.filter(d => d.b2b_raceGender == "B2BwhiteMixed").length;
    const b2bWhiteMixedGenderSongs_PERCENT = b2bWhiteMixedGenderSongs_COUNT/songPlays*100;

    // TOTAL
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
                    onlyMixedNOCollabGenderSongs_COUNT,
                    onlyMixedNOCollabGenderSongs_PERCENT,
                    b2bMixedNOCollabGenderSongs_COUNT,
                    b2bMixedNOCollabGenderSongs_PERCENT,
                    onlyLGBTQSongs_COUNT,
                    onlyLGBTQSongs_PERCENT,
                    b2bLGBTQSongs_COUNT,
                    b2bLGBTQSongs_PERCENT,
                    onlyStraightSongs_COUNT,
                    onlyStraightSongs_PERCENT,
                    b2bStraightSongs_COUNT,
                    b2bStraightSongs_PERCENT,
                    onlyPOCMenSongs_COUNT,
                    onlyPOCMenSongs_PERCENT,
                    b2bPOCMenSongs_COUNT,
                    b2bPOCMenSongs_PERCENT,
                    onlyPOCWomenSongs_COUNT,
                    onlyPOCWomenSongs_PERCENT,
                    b2bPOCWomenSongs_COUNT,
                    b2bPOCWomenSongs_PERCENT,
                    onlyPOCMixedSongs_COUNT,
                    onlyPOCMixedSongs_PERCENT,
                    b2bPOCMixedSongs_COUNT,
                    b2bPOCMixedSongs_PERCENT,
                    onlyWhiteMenSongs_COUNT,
                    onlyWhiteMenSongs_PERCENT,
                    b2bWhiteMenSongs_COUNT,
                    b2bWhiteMenSongs_PERCENT,
                    onlyWhiteWomenSongs_COUNT,
                    onlyWhiteWomenSongs_PERCENT,
                    b2bWhiteWomenSongs_COUNT,
                    b2bWhiteWomenSongs_PERCENT,
                    onlyWhiteMixedGenderSongs_COUNT,
                    onlyWhiteMixedGenderSongs_PERCENT,
                    b2bWhiteMixedGenderSongs_COUNT,
                    b2bWhiteMixedGenderSongs_PERCENT,
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
        lgbtq: matchLGBTQ(d.artist),
        b2b_gender: b2bSync(b2bValue_ARRAY, i)
    }))
}

function matchLGBTQ(name) {
    const match = lgbtqArtists.includes(name);
    return match;
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
                // Both songs women
                if (currGender == "women" && prevGender == "women") {
                    b2bValueCollab = "B2BCollabWomen"
                // Women then male-female
                } else if (currGender == "women" && prevGender == "male-female") {
                    // Must be collab
                    if (prevEnsemble == "collab") {
                        b2bValueCollab = "B2BCollabWomen"
                    // If not collab
                    } else {
                        b2bValueCollab = "X"
                    }
                // Male-female then woman
                } else if (currGender == "male-female" && prevGender == "women") {
                    // Must be collab
                    if (currEnsemble == "collab") {
                        b2bValueCollab = "B2BCollabWomen"
                    // If not collab
                    } else {
                        b2bValueCollab = "X"
                    }
                // Both male-female
                } else if (currGender == "male-female" && prevGender == "male-female") {
                    // Both must be collab
                    if (prevEnsemble == "collab" && currEnsemble == "collab") {
                        b2bValueCollab = "B2BCollabWomen"
                    } else if (prevEnsemble !== "collab" && currEnsemble !== "collab") {
                        b2bValueCollab = "B2BCollabMixed"
                    } else {
                        b2bValueCollab = "X"
                    }
                // Both men
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

function addB2BLGBTQData(data, file) {
    let b2bValueLGBTQ;
    let b2bValueLGBTQ_ARRAY = [];

    for(var i = 0; i < data.length; i++) {
        if (i > 0) {
            let prevLGBTQ = data[i-1].lgbtq;
            let currLGBTQ = data[i].lgbtq;
            let prevDate = data[i-1].date;
            let currDate = data[i].date;

            if (currDate == prevDate) {
                if (currLGBTQ == true && prevLGBTQ == true) { b2bValueLGBTQ = "B2BLGBTQ" } 
                else if (currLGBTQ == false && prevLGBTQ == false) { b2bValueLGBTQ = "B2BStraight" }
                else { b2bValueLGBTQ = "X" }
            } else {
                b2bValueLGBTQ = "X"
            }

            b2bValueLGBTQ_ARRAY.push(b2bValueLGBTQ)
        }
    }

    const currCity = file.split("_")[0];

    songPlays_B2B = data.map((d, i) => ({
        ...d,
        city: currCity,
        b2b_lgbtq: b2bSync(b2bValueLGBTQ_ARRAY, i)
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
                if (currRace !== "white" && currGender == "women") { b2bRaceGenderValue = "B2BPOCWomen" }
                else if (currRace !== "white" && currGender == "men") { b2bRaceGenderValue = "B2BPOCMen" }
                else if (currRace !== "white" && currGender == "male-female") { b2bRaceGenderValue = "B2BPOCMixed" }
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
    addB2BLGBTQData(songPlays_B2B, file) 
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