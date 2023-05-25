// Using data from San Antonio KCYY 
//Creates an array of 6474 songs, anything under 11% is coded female, anything over is coded male (NOTE this does not take into account the 7.3% mixed gender songs)
let songs = new Array(6474).fill(0).map(x => Math.random() > .115 ? 'm' : 'f');

//The counts for b2b female and b2b male are set at zero
  let bb = {f: 0, m: 0};
  // Loop through the array of songs
  for (let i = 1; i < songs.length; ++i) {
    // If the previous song is coded the same as the current song add it to the b2B array
    if (songs[i-1] === songs[i]) ++bb[songs[i]]
  };
  //Get the percentage of songs in the b2b array
  bb.pf = 100 * bb.f/(songs.length - 1);
  bb.pm = 100 * bb.m/(songs.length - 1);
  //Print the b2b array percentages
  console.log(bb);