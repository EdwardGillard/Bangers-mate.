//* require user model
const User = require('../models/user')

//* require login features
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const Track = require('../models/track')
const { notFound, unauthorized, duplicate } = require('../lib/errorMessages')

//* async function that creates a user.
async function register(req, res, next) {
  try {
    const user = await User.create(req.body)
    console.log(req.body)
    res.status(201).json({ message: `Welcome ${user.username}, please login to confirm registration` })
  } catch (err) {
    next(err)
  }
}

//* async function that logs in a user
async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user || !user.validatePassword(req.body.password)) throw new Error(unauthorized)
    const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '7 days' })
    res.status(202).json({ message: `Hello ${user.username}`, token })
  } catch (err) {
    next(err)
  }
}

async function addToMyOwnPlaylist(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const track = await Track.findById(req.body.playlistItem)
    if (!track) throw new Error(notFound)
    if (user.list.includes(track._id)) throw new Error(duplicate)
    if (!user.list.includes(track._id))user.list.push(track)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

async function removeFromPL(req, res, next) {
  try {
    const id = req.currentUser.id
    const user = await User.findById(id)
    if (!user) throw new Error(unauthorized)
    const track = req.params.id
    await user.list.remove(track)
    await user.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function getPlaylist(req, res, next) {
  try {
    const id = req.currentUser._id
    const user = await User.findById(id, { runValidators: true }).populate('list')
    if (!user) throw new Error(unauthorized)
    res.status(200).json(user.list)
  } catch (err) {
    next(err)
  }
}

//* export for usage on routes.
module.exports = {
  register: register,
  login: login,
  createPlaylist: addToMyOwnPlaylist,
  getPlaylist: getPlaylist,
  delete: removeFromPL
}


//*const user = await User.findOne({ email: req.body.email }) || await User.findOne({ username: req.body.username })
// console.log(req.body.email)
// if (!user || !user.validatePassword(req.body.password)) {
//   throw new Error()