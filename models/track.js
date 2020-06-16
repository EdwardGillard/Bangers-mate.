//* get mongoose to create a schema 
const mongoose = require('mongoose')

//* create schema to handle comments
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

// * Create your model for your resource here
const trackSchema = new mongoose.Schema({
  artist: { type: String, required: true, uppercase: true },
  trackName: { type: String, required: true },
  album: { type: String, required: true },
  artistCountry: { type: String, required: true },
  genre: { type: String, required: true, enum: ['Rock', 'Hip-Hop', 'R&B', 'Metal', 'Classical', 'Jazz', 'Electronic', 'Folk', 'World', 'Pop', 'Country', 'Reggae', 'Soul', 'Blues'] },
  subgenre: { type: String },
  bandPictureUrl: { type: String, required: true },
  year: { type: Number, required: true, min: 1900, max: 2020, maxlength: 4 },
  bangerRating: { type: Number, required: true, min: 1, max: 10 },
  review: [reviewSchema],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

trackSchema
  .pre('validate', function (next) {
    this.trackName = this.trackName.charAt(0).toUpperCase() + this.trackName.slice(1)
    this.album = this.album.charAt(0).toUpperCase() + this.album.slice(1)
    this.artistCountry = this.artistCountry.charAt(0).toUpperCase() + this.artistCountry.slice(1)
    this.subgenre = this.subgenre.charAt(0).toUpperCase() + this.subgenre.slice(1)

    next()
  })


// * Remember to export it at the end for use in your controllers

module.exports = mongoose.model('Track', trackSchema)

// * head over to "controller.js" next