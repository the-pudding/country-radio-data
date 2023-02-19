## baseline wd is country-radio-data directory
data <- read.csv("output/summary.csv")

# View(data)

# total_COUNT
# onlyWomenSongs_PERCENT
# onlyCombinedGenderSongs_PERCENT

# b2bWomenSongs_COUNT
# b2bCombinedGenderSongs_COUNT

find_runs <- function(flips) {
  run_info <- rle(flips)

  numRuns <- length(intersect(which(run_info$values == 1), which(run_info$lengths > 1)))

  longerRuns <- sum(run_info$lengths[intersect(which(run_info$values == 1), which(run_info$lengths > 2))] - 2)

  return(numRuns + longerRuns)
}

test1 <- c(1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0) ## test 1
test2 <- c(1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0) ## test 10

find_runs(test1)
find_runs(test2)


get_null <- function(id, data) {
  rowToUse <- data[id, ]
  total <- rowToUse$total_COUNT
  women_coin_p <- rowToUse$onlyWomenSongs_PERCENT / 100
  women_mix_coin_p <- rowToUse$onlyCombinedGenderSongs_PERCENT / 100

  women_coin <- rbinom(total, 1, women_coin_p)
  women_mix_coin <- rbinom(total, 1, women_mix_coin_p)

  obsWomenRuns <- find_runs(women_coin)
  obsWomenMixRuns <- find_runs(women_mix_coin)



  return(cbind.data.frame(obsWomenRuns, obsWomenMixRuns))
}

get_null_dist <- function(reps, data) {
  dist_info <- vector("list", nrow(data))
  for (i in 1:nrow(data)) {
    dist_info_temp <- replicate(n = reps, get_null(i, data), simplify = F)
    dist_info[[i]] <- do.call("rbind", dist_info_temp)
  }

  return(dist_info)
}


set.seed(212234)
numReps <- 1000
# ptm <- proc.time()
all_dists <- get_null_dist(numReps, data) ## takes about a minute
# proc.time() - ptm

save(all_dists, file = "analysis/all_null_distsL.RData")

all_dists_df <- cbind.data.frame(
  stationName = rep(data$stationName, each = numReps),
  cityName = rep(data$cityName, each = numReps),
  simId = rep(1:numReps, nrow(data)),
  do.call("rbind", all_dists)
)

write.csv(all_dists_df, "analysis/all_null_distsDF.csv", row.names = F)


## assuming only care about playing fewer runs than observed just due to chance
calculate_pval <- function(id, dist, obs) {
  pval_women <- length(which(dist[[id]]$obsWomenRuns < obs$b2bWomenSongs_COUNT[id])) / nrow(dist[[id]])
  pval_women_mix <- length(which(dist[[id]]$obsWomenMixRuns < obs$b2bCombinedGenderSongs_COUNT[id])) / nrow(dist[[id]])

  return(cbind.data.frame(pval_women, pval_women_mix))
}

load("all_dists.RData")
pvals <- lapply(1:nrow(data), calculate_pval, all_dists, data)
pvals <- do.call("rbind", pvals)
pvals

pvals_df <- cbind.data.frame(cityName = data$cityName, stationName = data$stationName, pvals)
write.csv(pvals_df, "analysis/pvals.csv", row.names = F)

## women only
length(which(pvals[, 1] == 0)) ## 17 out of 29 stations played fewer runs than every single set of coin flips
length(which(pvals[, 1] < 0.05 / 30)) ## 19 out of 29 meet a conservative threshold for pval "reject null" that there is nothing fishy going on here

## women and mixed
length(which(pvals[, 2] == 0)) ## 22 out of 29 stations played fewer runs than every single set of coin flips
length(which(pvals[, 2] < 0.05 / 30)) ## 23 out of 29 meet a conservative threshold for pval "reject null" that there is nothing fishy going on here

data[which(pvals[, 1] > 0.05 / 30), c("cityName", "stationName")]
## cities/stations that do NOT have evidence of avoiding back to back plays for women
#        cityName stationName
# 1        Austin     KASE-FM
# 3     Charlotte     WKKT-FM
# 5       Chicago     WUSN-FM
# 12   Greensboro     WPAW-FM
# 13   Greensboro     WTQR-FM
# 15      Houston     KKBQ-FM
# 17 Indianapolis     WLHK-FM
# 21   LosAngeles     KKGO-FM
# 25   SanAntonio     KAJA-FM
# 26   SanAntonio     KCYY-FM


data[which(pvals[, 2] > 0.05 / 30), c("cityName", "stationName")]
## cities/stations that do NOT have evidence of avoiding back to back plays for women/mix
#        cityName stationName
# 5       Chicago     WUSN-FM
# 12   Greensboro     WPAW-FM
# 17 Indianapolis     WLHK-FM
# 21   LosAngeles     KKGO-FM
# 26   SanAntonio     KCYY-FM
# 28        Tampa     WQYK-FM


make_plot <- function(id, dist, obs) {
  par(mfrow = c(2, 1))
  hist(dist[[id]]$obsWomenRuns, main = paste("number of women runs \n obs = ", obs$b2bWomenSongs_COUNT[id], "\n", obs$stationName[id], sep = ""), xlab = "")
  abline(v = obs$b2bWomenSongs_COUNT[id], col = "red")
  hist(dist[[id]]$obsWomenMixRuns, main = paste("number of women/mix runs \n obs = ", obs$b2bCombinedGenderSongs_COUNT[id], "\n", obs$stationName[id], sep = ""), xlab = "")
  abline(v = obs$b2bCombinedGenderSongs_COUNT[id], col = "red")
}

for (i in 1:nrow(data)) {
  pdf(
    file = paste("analysis/figures/", data$stationName[i], "-", data$cityName[i], ".pdf", sep = ""),
    width = 4, # The width of the plot in inches
    height = 6
  )
  make_plot(i, all_dists, data)
  dev.off()
}

make_plot(1, all_dists, data)
make_plot(2, all_dists, data)
make_plot(3, all_dists, data)
make_plot(4, all_dists, data)
make_plot(5, all_dists, data)
make_plot(6, all_dists, data)
make_plot(7, all_dists, data)
make_plot(8, all_dists, data)
make_plot(9, all_dists, data)
make_plot(10, all_dists, data)
make_plot(11, all_dists, data)
make_plot(12, all_dists, data)
make_plot(13, all_dists, data)
make_plot(14, all_dists, data)
make_plot(15, all_dists, data)
make_plot(16, all_dists, data)
make_plot(17, all_dists, data)
make_plot(18, all_dists, data)
make_plot(19, all_dists, data)
make_plot(20, all_dists, data)
make_plot(21, all_dists, data)
make_plot(22, all_dists, data)
make_plot(23, all_dists, data)
make_plot(24, all_dists, data)
make_plot(25, all_dists, data)
make_plot(26, all_dists, data)
make_plot(27, all_dists, data)
make_plot(28, all_dists, data)
make_plot(29, all_dists, data)

par(mfrow = c(1, 1))
