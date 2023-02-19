## day level analysis

## baseline wd is country-radio-data directory
data <- read.csv("output/daySummary.csv")

# View(data)

# total_COUNT
# onlyWomenSongs_PERCENT
# onlyCombinedGenderSongs_PERCENT

# b2bWomenSongs_COUNT
# b2bCombinedGenderSongs_COUNT


get_null_raw <- function(id, data) {
  rowToUse <- data[id, ]
  total <- rowToUse$total_COUNT
  women_coin_p <- rowToUse$onlyWomenSongs_PERCENT / 100
  women_mix_coin_p <- rowToUse$onlyCombinedGenderSongs_PERCENT / 100

  women_coin <- rbinom(total, 1, women_coin_p)
  women_mix_coin <- rbinom(total, 1, women_mix_coin_p)

  return(list(women_coin = women_coin, women_mix_coin = women_mix_coin))
}

# test <- get_null_raw(1, data)

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
  base_name <- paste(paste(data$stationName[i], data$cityName[i], data$date[i], sep = "_"), ".csv", sep = "")
  base_name <- gsub("/", "_", base_name) ## doesn't like slashes in file name
  write.csv(all_dists$dist_infoW[[i]], file = paste("analysis/byStationDayRaw/women_only/", base_name, sep = ""), row.names = F)
  write.csv(all_dists$dist_infoWM[[i]], file = paste("analysis/byStationDayRaw/women_mix/", base_name, sep = ""), row.names = F)
}