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

#### `pnpm run start`

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

