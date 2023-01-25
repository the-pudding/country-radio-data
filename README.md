# country-radio-data

Node scripts to clean and combine data for an upcoming article on 24-hr country radio plays by gender.

## Setup

#### Dependencies

- [node](https://nodejs.org/en/)
- [d3](https://d3js.org/)
- [fs](https://nodejs.org/api/fs.html)

#### Install

Clone the repo and run `pnpm `

## Reproduce

#### `pnpm run start`

Imports a single radio station's data from `input/{station}-{wave}-{year}.csv`, logs the summary data (described below), and outputs a new csv with back-to-back plays data added to `output/{station}-{wave}_withB2B.csv`. 

| var  | type  | description  |
|---|---|---|
| stationName  | string  | The radio station's 4-letter call sign and the wave (FM/AM) formatted like `{callSign}-{wave}`  |
| onlyWomenSongs_COUNT  | number  | The **total number of songs** by women artists (either solo or in a women's only ensemble)  |
| onlyWomenSongs_PERCENT  | number  | The **percentage of songs** by women artists (either solo or in a women's only ensemble)  |
| b2bWomenSongs_COUNT  | number  | The **total number of back-to-back songs** by women artists (either solo or in a women's only ensemble)  |
| b2bWomenSongs_PERCENT  | number  | The **percentage of back-to-back songs** by women artists (either solo or in a women's only ensemble)  |