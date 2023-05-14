san_antonio_1722 <- read.csv("analysis/byStationDayRaw/women_only/KCYY-FM_SanAntonio_1_7_22.csv")

apply(san_antonio_1722, 2, sum)
# 31  31  31  34  41  36  39  33  33  33

# in simulate_day_level.R
# i=476 ## check one quoted in story
apply(all_dists$dist_infoW[[i]], 2, sum)
# 31 31 31 34 41 36 39 33 33 33

## histograms made in simulate_no_avoidance.R

## use this data as input
data <- read.csv("output/summary.csv")

head(data)


## check histograms against combined.pdf
## made from simulate_no_avoidance.R
