const port = process.env.PORT || 8000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/bangers-playlist'
const secret = process.env.SECRET || 'mobgoeswild'

module.exports = {
  dbURI,
  port,
  secret
}