import fs from "fs";
import * as d3 from "d3";

const IN_PATH = "./input/"
const OUT_PATH = "./output/"

// Loads in file (eventually this will load dynamically)
const raw = d3.csvParse(fs.readFileSync(`${IN_PATH}WKDF-FM-2022.csv`, "utf8"));

// Filters out spot breaks so that the data only includes songs
const playsOnly = raw.filter(d => !d.Artist.includes("SPOT BREAK") )

// Overall variables
const stationName = playsOnly[0].Station;
const songPlays = playsOnly.length;
let songPlays_B2B;
let b2bValue_ARRAY = [];

// Women songs stats
const onlyWomenSongs_ARRAY = playsOnly.filter(d => d.gender == "women");
const onlyWomenSongs_COUNT = onlyWomenSongs_ARRAY.length;
const onlyWomenSongs_PERCENT = onlyWomenSongs_COUNT/songPlays*100;
let b2bWomenSongs_COUNT;
let b2bWomenSongs_PERCENT;


// Men songs stats
const onlyMenSongs_ARRAY = playsOnly.filter(d => d.gender == "men");
const onlyMenSongs_COUNT = onlyMenSongs_ARRAY.length;
const onlyMenSongs_PERCENT = onlyMenSongs_COUNT/songPlays*100;
let b2bMenSongs_COUNT;
let b2bMenSongs_PERCENT;

// Mixed gender songs stats
const onlyMixedGenderSongs_ARRAY = playsOnly.filter(d => d.gender == "male-female");
const onlyMixedGenderSongs_COUNT = onlyMixedGenderSongs_ARRAY.length;
const onlyMixedGenderSongs_PERCENT = onlyMixedGenderSongs_COUNT/songPlays*100;


function b2bSync(i) {
    if (i == 0) {
        return "X"
    } else {
        return b2bValue_ARRAY[i-1]
    }
}

function addB2BData(data) {
    let b2bValue;

    for(var i = 0; i < data.length; i++) {
        if (i > 0) {
            let prevGender = data[i-1].gender;
            let currGender = data[i].gender;

            if (currGender == prevGender) {
                b2bValue = currGender == "women" ? "B2Bwomen" : "B2Bman"
            } else {
                b2bValue = "X"
            }

            //b2bValue = prevGender === currGender ? "same" : "different";
            b2bValue_ARRAY.push(b2bValue)
        }
    }

    songPlays_B2B = data.map((d, i) => ({
        ...d,
        b2b_gender: b2bSync(i)
    }))
}

function init() {
    addB2BData(playsOnly) 

    b2bWomenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bwomen").length;
    b2bWomenSongs_PERCENT = b2bWomenSongs_COUNT/songPlays*100;

    b2bMenSongs_COUNT = songPlays_B2B.filter(d => d.b2b_gender == "B2Bmen").length;
    b2bMenSongs_PERCENT = b2bMenSongs_COUNT/songPlays*100;

    const concatData = [].concat(...songPlays_B2B).map(d => ({
		...d
	}));

    console.log({stationName, onlyWomenSongs_COUNT, onlyWomenSongs_PERCENT, b2bWomenSongs_COUNT, b2bWomenSongs_PERCENT})

    const csv = d3.csvFormat(concatData);
	fs.writeFileSync(`${OUT_PATH}/${stationName}_withB2B.csv`, csv) 
}

init();