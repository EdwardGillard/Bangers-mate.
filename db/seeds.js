const mongoose = require('mongoose')
const Tracks = require('../models/track')
const User = require('../models/user')
const { dbURI } = require('../config/environment')
const trackMaker = require('./data/tracks')
const userSeed = require('./data/users'
)

mongoose.connect(
  dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  async (err, db) => {
    if (err) return console.log(err)

    try {
      await db.dropDatabase()

      const users = await User.create(userSeed)
      console.log(`${users.length} users created`)
      const tracksWithUsers = trackMaker.map(track => {
        return { ...track, user: users[0]._id }
      })
      const tracks = await Tracks.create(tracksWithUsers)
      console.log(`${tracks.length} tracks available`)

      await mongoose.connection.close()
      console.log('Peace out')

    } catch (err) {
      console.log(err)
    }
  })