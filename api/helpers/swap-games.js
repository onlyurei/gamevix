const { sortBy } = require('lodash')

const BUCKET_MAX_SCORE = 100

function getUserIdSetFromUserGames(userGames) {
  return new Set(userGames.map(userGame => userGame.owner))
}

function createBuckets(bucketSize) {
  const buckets = []
  for (let i = 0; i < BUCKET_MAX_SCORE; i += bucketSize) {
    buckets.push({ low: i, high: i + bucketSize, games: [] })
  }
  return buckets
}

async function bucketGames(buckets, userGames) {
  await Promise.all(
    userGames.map(async userGame => {
      const { igdbId: platformIgdbId } = userGame.platform || {}
      const { score } = await sails.helpers.getGameMarketScores(
        userGame.igdbId,
        platformIgdbId
      )
      const matchingBucket = buckets.find(
        bucket => score > bucket.low && score <= bucket.high
      )
      if (matchingBucket) {
        matchingBucket.games.push(userGame)
      } else {
        sails.log.error({ buckets, userGame })
      }
    })
  )
  return buckets
}

function filterSwappableGamesForUser(user, userGames, alreadySentUserIdSet) {
  return userGames.filter(userGame => {
    return (
      !alreadySentUserIdSet.has(userGame.owner) &&
      userGame.owner !== user.id &&
      !user.games.some(game => game.igdbId === userGame.igdbId) &&
      !user.futureGames.some(futureGame => futureGame.igdbId === userGame.igdbId) &&
      !user.pastGames.some(pastGame => pastGame.igdbId === userGame.igdbId) &&
      user.platforms.some(platform => platform.igdbId === userGame.platform.igdbId)
    )
  })
}

function sortSwappableGamesForUser(user, userGames) {
  userGames.forEach(userGame => {
    userGame.preferenceScore = 0
    user.swapPreferences.forEach(swapPreference => {
      if (
        (userGame.genres &&
          userGame.genres.length &&
          userGame.genres.some(
            genre =>
              genre === swapPreference.igdbId && swapPreference.igdbType === 'genres'
          )) ||
        (userGame.themes &&
          userGame.themes.length &&
          userGame.themes.some(
            theme =>
              theme === swapPreference.igdbId && swapPreference.igdbType === 'themes'
          ))
      ) {
        userGame.preferenceScore++
      }
    })
  })
  return sortBy(userGames, userGame => userGame.preferenceScore)
}

async function swapGamesInBuckets(
  gameBuckets,
  participatingUserIdSet,
  alreadySentUserIdSet,
  queriedUsers
) {
  await Promise.all(
    gameBuckets.map(async gameBucket => {
      if (gameBucket.games.length) {
        gameBucket.swappableGamesForUsers = {}
        const users = await Promise.all(
          [...new Set(gameBucket.games.map(game => game.owner))].map(async owner => {
            let user = queriedUsers[owner]
            if (user) {
              return user
            }
            user = await User.findOne(owner)
              .populate('platforms')
              .populate('games')
              .populate('futureGames')
              .populate('pastGames')
              .populate('swapPreferences')
            if (user) {
              queriedUsers[owner] = user
            }
            return user
          })
        )
        // currently only swap up to 1 game for 1 user at each run
        users
          .filter(user => user && participatingUserIdSet.has(user.id))
          .forEach(user => {
            const filteredGamesInBucket = filterSwappableGamesForUser(
              user,
              gameBucket.games,
              alreadySentUserIdSet
            )
            if (filteredGamesInBucket.length) {
              const sortedSwappableGamesForUser = sortSwappableGamesForUser(
                user,
                filteredGamesInBucket
              )
              const swappedGameForUser = sortedSwappableGamesForUser.pop()
              if (swappedGameForUser) {
                swappedGameForUser.futureOwner = user.id
                alreadySentUserIdSet.add(swappedGameForUser.owner)
                participatingUserIdSet.delete(user.id)
              }
            }
          })
      }
    })
  )
}

module.exports = {
  friendlyName: 'Swap games among Users',
  description: 'set futureOwner of all eligible UserGames',

  inputs: {
    include: {
      type: 'string',
      description:
        'comma separated user ids - only include swappable games from these corresponding users'
    },
    exclude: {
      type: 'string',
      description:
        'comma separated user ids - exclude swappable games from these corresponding users'
    }
  },

  async fn(inputs, exits) {
    const allSwappableGames = await sails.helpers.getSwappableGamesForUsers.with(inputs)
    allSwappableGames.forEach(swappableGame => {
      if (typeof swappableGame.owner === 'object') {
        swappableGame.owner = swappableGame.owner.id
      }
    })
    const participatingUserIdSet = getUserIdSetFromUserGames(allSwappableGames)
    const alreadySentUserIdSet = new Set()
    const queriedUsers = {}
    if (!participatingUserIdSet.size) {
      return exits.success([])
    }
    const bucketBatches = [
      createBuckets(1),
      createBuckets(2),
      createBuckets(5),
      createBuckets(10)
    ]
    let bucketBatch = 0
    do {
      const gameBuckets = await bucketGames(bucketBatches[bucketBatch], allSwappableGames)
      await swapGamesInBuckets(
        gameBuckets,
        participatingUserIdSet,
        alreadySentUserIdSet,
        queriedUsers
      )
      bucketBatch++
    } while (participatingUserIdSet.size && bucketBatch < bucketBatches.length)

    const sendingUserIdSet = new Set(
      allSwappableGames.filter(game => game.futureOwner).map(game => game.owner)
    )

    const receivingUserIdSet = new Set(
      allSwappableGames.filter(game => game.futureOwner).map(game => game.futureOwner)
    )

    const donatingUserIdSet = new Set([...sendingUserIdSet])
    for (const userId of receivingUserIdSet) {
      donatingUserIdSet.delete(userId)
    }

    for (const userId of donatingUserIdSet) {
      const gamesToRetrieve = allSwappableGames.filter(
        game => game.owner === userId && game.futureOwner
      )
      if (gamesToRetrieve.length) {
        gamesToRetrieve.forEach(gameToRetrieve => {
          gameToRetrieve.futureOwner = null
        })
      }
    }

    const freebiesUserIdSet = new Set([...receivingUserIdSet])
    for (const userId of sendingUserIdSet) {
      freebiesUserIdSet.delete(userId)
    }

    for (const userId of freebiesUserIdSet) {
      const gamesToRevoke = allSwappableGames.filter(game => game.futureOwner === userId)
      if (gamesToRevoke.length) {
        gamesToRevoke.forEach(gameToRevoke => {
          gameToRevoke.futureOwner = null
        })
      }
    }

    return exits.success(
      allSwappableGames
        .filter(userGame => userGame.futureOwner)
        .map(userGame => ({ id: userGame.id, futureOwner: userGame.futureOwner }))
    )
  }
}
