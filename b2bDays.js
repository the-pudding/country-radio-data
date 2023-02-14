import fs from "fs";
import * as d3 from "d3";

const IN_PATH = "./output/"
const OUT_PATH = "./output/"
const files = fs.readdirSync(IN_PATH).filter(d => d.includes('withB2B'));

let daySumData = [];

function getDaysData(file) {
    // Loads in file 
    const raw = fs.readFileSync(`${IN_PATH}${file}`, "utf8");
    const csvData = d3.csvParse(raw);

    // Filters out spot breaks so that the data only includes songs
    let playsOnly = csvData.filter(d => !d.artist.includes("SPOT BREAK") )
    
    const dayGroups = d3.groups(playsOnly, d => d.date)
    //console.log(dayGroups[0])

   const cityName = file.split("_")[0];
   console.log(cityName)

    for(var i = 0; i < dayGroups.length; i++) {
        let ownerName = dayGroups[i][1][1].owner;
        let stationName = dayGroups[i][1][1].station;
        let date = dayGroups[i][0];
        let total_COUNT = dayGroups[i][1].length;
        let onlyWomenSongs_ARRAY = dayGroups[i][1].filter(d => d.gender == "women");
        let onlyWomenSongs_COUNT = onlyWomenSongs_ARRAY.length;
        let onlyWomenSongs_PERCENT = onlyWomenSongs_COUNT/total_COUNT*100;
        let b2bWomenSongs_COUNT = dayGroups[i][1].filter(d => d.b2b_gender == "B2Bwomen").length;
        let b2bWomenSongs_PERCENT = b2bWomenSongs_COUNT/total_COUNT*100;
        let onlyCombinedGenderSongs_ARRAY = dayGroups[i][1].filter(d => d.gender == "male-female" || d.gender == "women");
        let onlyCombinedGenderSongs_COUNT = onlyCombinedGenderSongs_ARRAY.length;
        let onlyCombinedGenderSongs_PERCENT = onlyCombinedGenderSongs_COUNT/total_COUNT*100;
        let b2bCombinedGenderSongs_COUNT = dayGroups[i][1].filter(d => d.b2b_combinedGender == "B2BCombWomen").length;
        let b2bCombinedGenderSongs_PERCENT = b2bCombinedGenderSongs_COUNT/total_COUNT*100;

        daySumData.push({
            date,
            stationName,
            cityName,
            ownerName,
            total_COUNT,
            onlyWomenSongs_COUNT,
            onlyWomenSongs_PERCENT,
            b2bWomenSongs_COUNT,
            b2bWomenSongs_PERCENT,
            onlyCombinedGenderSongs_COUNT,
            onlyCombinedGenderSongs_PERCENT,
            b2bCombinedGenderSongs_COUNT,
            b2bCombinedGenderSongs_PERCENT
        })
    }
}


function init() {
    files.map(getDaysData)
    //console.log(daysData)

    // Writes out the summary data csv
    const concatDaySumData = [].concat(...daySumData).map(d => ({
		...d
	}));
    const csvDaySum = d3.csvFormat(concatDaySumData);
    fs.writeFileSync(`${OUT_PATH}/daySummary.csv`, csvDaySum) 
}

init();