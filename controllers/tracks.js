const Track = require('../models/track')
const { notFound, unauthorized } = require('../lib/errorMessages')

// * Create the controllers for your resouce here (index, create), (show, update delete optional)

async function tracksIndex(req, res, next) {
  try {
    const tracks = await Track.find().populate('user').populate('track.user')
    if (!tracks) throw new Error(notFound)
    res.status(200).json(tracks)
  } catch (err) {
    next(err)
  }
}

async function addATrack(req, res, next) {
  try {
    req.body.user = req.currentUser
    const newTrack = await Track.create(req.body)
    res.status(201).json(newTrack)
  } catch (err) {
    next(err)
  }
}

async function getASingleTrack(req, res, next) {
  const trackId = req.params.id
  try {
    const findATrack = await Track.findById(trackId).populate('review.user')
    if (!findATrack) throw new Error(notFound)
    res.status(200).json(findATrack)
  } catch (err) {
    next(err)
  }
}

async function deleteTrack(req, res, next) {
  const trackId = req.params.id
  try {
    const trackDelete = await Track.findById(trackId)
    if (!trackDelete) throw new Error(notFound)
    if (!trackDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await trackDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function editTrack(req, res, next) {
  const trackId = req.params.id
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      trackId,
      req.body,
      { new: true, runValidators: true }
    )
    res.status(202).json(updatedTrack)
  } catch (err) {
    next(err)
  }
}

async function addReviewToTrack (req, res, next) {
  try {
    //* get track Id 
    req.body.user = req.currentUser
    const trackId = req.params.id
    const track = await Track.findById(trackId).populate('reviews.user')
    if (!track) throw new Error(notFound)
    //* push comment to track
    console.log(req.body)
    track.review.push(req.body)
    await track.save()
    res.status(201).json(track)
  } catch (err) {
    next(err)
  }
}

async function deleteReviewFromTrack (req, res,next) {
  try {
    const trackId = req.params.id
    const reviewId = req.params.reviewId
    const track = await Track.findById(trackId)
    if (!track) throw new Error(notFound)
    const reviewToDelete = track.review.id(reviewId)
    if (!reviewToDelete) throw new Error(notFound)
    await reviewToDelete.remove()
    await track.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


// * export your controllers for use in the router

module.exports = {
  index: tracksIndex,
  create: addATrack,
  single: getASingleTrack,
  delete: deleteTrack,
  update: editTrack,
  createReview: addReviewToTrack,
  deleteReview: deleteReviewFromTrack
}