
# Average total songs per day: 332
# Average percentage of women's songs: 10.1
# Average percentage of men's songs: 81.6
# Average percentage of mixed-gender songs: 8.4

## flip men and women, keep mixed the same
data <- cbind.data.frame(
  total_COUNT = 332, onlyWomenSongs_PERCENT = 81.6,
  onlyCombinedGenderSongs_PERCENT = 8.4
)


## from simulate_day_level.R
get_null_raw <- function(id, data) {
  rowToUse <- data[id, ]
  total <- rowToUse$total_COUNT
  women_coin_p <- rowToUse$onlyWomenSongs_PERCENT / 100
  women_mix_coin_p <- rowToUse$onlyCombinedGenderSongs_PERCENT / 100

  women_coin <- rbinom(total, 1, women_coin_p)
  women_mix_coin <- rbinom(total, 1, women_mix_coin_p)

  return(list(women_coin = women_coin, women_mix_coin = women_mix_coin))
}


get_null_dist <- function(reps, data) {
  dist_infoW <- vector("list", nrow(data))
  dist_infoWM <- vector("list", nrow(data))
  for (i in 1:nrow(data)) {
    dist_info_temp <- replicate(n = reps, get_null_raw(i, data), simplify = F)
    women <- lapply(dist_info_temp, function(x) {
      x$women_coin
    })
    women_mix <- lapply(dist_info_temp, function(x) {
      x$women_mix_coin
    })
    dist_infoW[[i]] <- do.call("cbind", women)
    dist_infoWM[[i]] <- do.call("cbind", women_mix)
  }

  return(list(dist_infoW = dist_infoW, dist_infoWM = dist_infoWM))
}


set.seed(212234)
numReps <- 10 ## could increase this if you need more


all_dists <- get_null_dist(numReps, data)


for (i in 1:nrow(data)) {
  write.csv(all_dists$dist_infoW[[i]], file = paste("analysis/flip_ratio/women_only/", "playlist_mockup.csv", sep = ""), row.names = F)
  write.csv(all_dists$dist_infoWM[[i]], file = paste("analysis/flip_ratio/women_mix/", "playlist_mockup.csv", sep = ""), row.names = F)
}
