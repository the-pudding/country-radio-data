# country-radio-data

Node scripts to clean and combine data for an upcoming article on 24-hr country radio plays by gender.

## Setup

#### Dependencies

- [node](https://nodejs.org/en/)
- [d3](https://d3js.org/)
- [fs](https://nodejs.org/api/fs.html)

#### Install

Clone the repo and run `pnpm i`

## Reproduce

#### `pnpm run b2bSum`

Imports all radio station data csvs from `input/`, outputs new csvs with back-to-back plays data added to `output/{city}_{station}-{wave}_withB2B.csv`, and outputs the summary data (described below) for all stations in `output/summary.csv`. 

| var  | type  | description  |
|---|---|---|
| cityName | string | The city in which the radio station is located |
| stationName  | string  | The radio station's 3-to-4-letter call sign and the wave (FM/AM) formatted like `{callSign}-{wave}`  |
| ownerName | string | The radio station's owner |
| total_COUNT  | number  | The **total number of songs** by all artists |
| onlyWomenSongs_COUNT  | number  | The **total number of songs** by women artists (either solo or in a women's only ensemble)  |
| onlyWomenSongs_PERCENT  | number  | The **percentage of songs** by women artists (either solo or in a women's only ensemble)  |
| b2bWomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists (either solo or in a women's only ensemble)  |
| b2bWomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists (either solo or in a women's only ensemble)  |
| onlyMenSongs_COUNT  | number  | The **total number of songs** by men artists (either solo or in a men's only ensemble)  |
| onlyMenSongs_PERCENT  | number  | The **percentage of songs** by men artists (either solo or in a men's only ensemble)  |
| b2bMenSongs_COUNT  | number  | The **total number of back-to-back songs** by men artists (either solo or in a men's only ensemble)  |
| b2bMenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by men artists (either solo or in a men's only ensemble)  |
| onlyMixedGenderSongs_COUNT  | number  | The **total number of songs** by mix gendered artists (ensemble, collaboration, duet, etc.)  |
| onlyMixedGenderSongs_PERCENT  | number  | The **percentage of songs** by mix gendered artists (ensemble, collaboration, duet, etc.)  |
| b2bMixedGenderSongs_COUNT  | number  | The **total number of back-to-back songs** by mix gendered artists (ensemble, collaboration, duet, etc.)  |
| b2bMixedGenderSongs_PERCENT  | number  | The **percentage of back-to-back songs** by mix gendered artists (ensemble, collaboration, duet, etc.)  |
| onlyCombinedGenderSongs_COUNT  | number  | The **total number of songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.)  |
| onlyCombinedGenderSongs_PERCENT  | number  | The **percentage of songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.)  |
| b2bCombinedGenderSongs_COUNT  | number  | The **total number of back-to-back songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.)  |
| b2bCombinedGenderSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.)  |
| onlyCollabGenderSongs_COUNT  | number  | The **total number of songs** by women AND mix gendered artists collabs  |
| onlyCollabGenderSongs_PERCENT  | number  | The **percentage of songs** by women AND mix gendered artists collabs  |
| b2bCollabGenderSongs_COUNT  | number  | The **total number of back-to-back songs** by women AND mix gendered artists collabs  |
| b2bCollabGenderSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women AND mix gendered artists collabs  |
| b2bcombinedCollabDiff_COUNT  | number | The **number difference of songs** between women + ALL mixed gendered artists and women + ONLY mixed gendered collabs |
| b2bcombinedCollabDiff_PERCENT  | number | The **percent difference of songs** between women + ALL mixed gendered artists and women + ONLY mixed gendered collabs |
| onlyNonWhiteSongs_COUNT  | number  | The **total number of songs** by non-white artists |
| onlyNonWhiteSongs_PERCENT  | number  | The **percentage of songs** by non-white artists  |
| b2bNonWhiteSongs_COUNT  | number  | The **total number of back-to-back songs** by non-white artists  |
| b2bNonWhiteSongs_PERCENT  | number  | The **percentage of back-to-back songs** by non-white artists  |
| onlyNonWhiteWomenSongs_COUNT  | number  | The **total number of songs** by non-white women artists |
| onlyNonWhiteWomenSongs_PERCENT  | number  | The **percentage of songs** by non-white women artists  |
| b2bNonWhiteWomenSongs_COUNT  | number  | The **total number of back-to-back songs** by non-white women artists  |
| b2bNonWhiteWomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by non-white women artists  |
| OVNwomenSongs_COUNT  | number  | The **total number of songs** by women artists played during the overnight or OVN hours (12–6am)|
| OVNwomenSongs_PERCENT  | number  | The **percentage of songs** by women artists played during the overnight or OVN hours (12–6am)  |
| b2bOVNwomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists played during the overnight or OVN hours (12–6am)  |
| b2bOVNwomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists played during the overnight or OVN hours (12–6am)  |
| AMDwomenSongs_COUNT  | number  | The **total number of songs** by women artists played during the morning day or AMD hours (6–10am)|
| AMDwomenSongs_PERCENT  | number  | The **percentage of songs** by women artists played during the morning day or AMD hours (6–10am)  |
| b2bAMDwomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists played during the morning day or AMD hours (6–10am)  |
| b2bAMDwomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists played during the morning day or AMD hours (6–10am)  |
| MIDwomenSongs_COUNT  | number  | The **total number of songs** by women artists played during the morning day or MID hours (10–3pm)|
| MIDwomenSongs_PERCENT  | number  | The **percentage of songs** by women artists played during the morning day or MID hours (10–3pm)  |
| b2bMIDwomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists played during the morning day or MID hours (10–3pm)  |
| b2bMIDwomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists played during the morning day or MID hours (10–3pm)  |
| PMDwomenSongs_COUNT  | number  | The **total number of songs** by women artists played during the afternoon day or PMD hours (3–7pm)|
| PMDwomenSongs_PERCENT  | number  | The **percentage of songs** by women artists played during the afternoon day or PMD hours (3–7pm)  |
| b2bPMDwomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists played during the afternoon day or PMD hours (3–7pm)  |
| b2bPMDwomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists played during the afternoon day or PMD hours (3–7pm)  |
| EVEwomenSongs_COUNT  | number  | The **total number of songs** by women artists played during the evening or EVE hours (7pm-12am)|
| EVEwomenSongs_PERCENT  | number  | The **percentage of songs** by women artists played during the evening or EVE hours (7pm-12am)  |
| b2bEVEwomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists played during the evening or EVE hours (7pm-12am)  |
| b2bEVEwomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists played during the evening or EVE hours (7pm-12am) |
| GwomenSongs_COUNT  | number  | The **total number of gold songs** by women artists |
| GwomenSongs_PERCENT  | number  | The **percentage of gold songs** by women artists  |
| b2bGwomenSongs_COUNT  | number  | The **total number of back-to-back gold songs** by women artists  |
| b2bGwomenSongs_PERCENT  | number  | The **percentage of back-to-back gold songs** by women artists  |
| RwomenSongs_COUNT  | number  | The **total number of recurrent songs** by women artists |
| RwomenSongs_PERCENT  | number  | The **percentage of recurrent songs** by women artists  |
| b2bRwomenSongs_COUNT  | number  | The **total number of back-to-back recurrent songs** by women artists  |
| b2bRwomenSongs_PERCENT  | number  | The **percentage of back-to-back recurrent songs** by women artists  |
| CwomenSongs_COUNT  | number  | The **total number of current songs** by women artists |
| CwomenSongs_PERCENT  | number  | The **percentage of current songs** by women artists  |
| b2bCwomenSongs_COUNT  | number  | The **total number of back-to-back current songs** by women artists  |
| b2bCwomenSongs_PERCENT  | number  | The **percentage of back-to-back current songs** by women artists  |

#### `pnpm run b2bDay`

Imports all radio station data with b2b plays csvs from `output/`, and outputs the summary data for EACH day (described below) for all stations in `output/daySummary.csv`. 

| var  | type  | description  |
|---|---|---|
| date | string | A 24-hr period of radio play |
| cityName | string | The city in which the radio station is located |
| stationName  | string  | The radio station's 3-to-4-letter call sign and the wave (FM/AM) formatted like `{callSign}-{wave}`  |
| ownerName | string | The radio station's owner |
| total_COUNT  | number  | The **total number of songs** by all artists per date |
| onlyWomenSongs_COUNT  | number  | The **total number of songs** by women artists (either solo or in a women's only ensemble) per date  |
| onlyWomenSongs_PERCENT  | number  | The **percentage of songs** by women artists (either solo or in a women's only ensemble) per date |
| b2bWomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists (either solo or in a women's only ensemble) per date |
| b2bWomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists (either solo or in a women's only ensemble) per date  |
| onlyCombinedGenderSongs_COUNT  | number  | The **total number of songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.) per date   |
| onlyCombinedGenderSongs_PERCENT  | number  | The **percentage of songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.) per date  |
| b2bCombinedGenderSongs_COUNT  | number  | The **total number of back-to-back songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.) per date   |
| b2bCombinedGenderSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women AND mix gendered artists (ensemble, collaboration, duet, etc.) per date  |