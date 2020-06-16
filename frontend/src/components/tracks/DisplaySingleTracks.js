import React from 'react'
import { getSingleTrack, deleteATrack, addReview, deleteReview, addToPlaylist } from '../../lib/api'
import { isLoggedOn, isUser } from '../../lib/auths'
import { Link } from 'react-router-dom'
import Footer from '../common/Footer'
import Spinner from '../common/Spinner'
import Reviews from '../tracks/Reviews'
import { toast } from '../../lib/notifications'


class SingleTracks extends React.Component {
  state = {
    track: null,
    review: {
      text: ''
    },
    reviewArray: [],
    playlistItem: ''
  }


  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const trackId = this.props.match.params.id
      const res = await getSingleTrack(trackId)
      this.setState({ track: res.data })
    } catch (err) {
      this.props.history.push('/somethingwentwrong')
    }
  }

  handleChange = e => {
    const review = { ...this.state.review, [e.target.name]: e.target.value }
    this.setState({ review })
  }

  submitReview = async event => {
    const trackId = this.props.match.params.id
    event.preventDefault()
    try {
      const res = await addReview(trackId, this.state.review)
      this.setState({ reviewArray: res.data.review })
      this.getData()
      toast('Comment added')
    } catch (err) {
      console.log(err)
    }
  }

  deleteReview = async event => {
    const trackId = this.props.match.params.id
    const reviewId = event.target.value
    toast('Comment Deleted')
    await deleteReview(trackId, reviewId)
    this.getData()
  }

  addToPlaylist = async event => {
    try {
      const { track } = this.state
      const trackId = this.state.track._id
      const addToList = await { ...this.state.playlistItem, [event.target.name]: trackId }
      console.log(addToList)
      const res = await addToPlaylist(addToList)
      console.log(res)
      toast(`Added ${track.trackName} to your playlist`)
    } catch (err) {
      console.log(err.response)
      toast(err.response.data.message)

    }
  }

  handleDelete = async () => {
    try {
      const trackId = this.props.match.params.id
      await deleteATrack(trackId)
      this.props.history.push('/tracks')
      toast('Deleted track')
    } catch (err) {
      this.props.history.push('/somethingwentwrong')
    }
  }

  render() {
    const { track } = this.state
    const { text } = this.state.review
    if (!this.state.track) return <Spinner />
    return (
      <>
        <section className="hero is-fullheight-with-navbar">
          <div className="singles-page">
            <div>
              <h1 className="single-title">{track.trackName} by {track.artist}</h1>
            </div>
            <div className="center-display">
              {isUser(track.user) && <div>
                <Link to={`/tracks/${track._id}/edit`}> <button className="but">Edit</button> </Link>
              </div>}
              <div className="single-image">
                <img src={track.bandPictureUrl} alt={track.artist} />
              </div>
              {isUser(track.user) && <button onClick={this.handleDelete} className="but">Delete</button>}
            </div>
            <div className="single-main-content">
              <h2 id="track-album">{track.album} - {track.year}</h2>
              <h2 id="track-genre">{track.genre} - {track.subgenre}</h2>
              <h2 id="track-rating">{track.bangerRating}/10</h2>
            </div>
            <div className="add-but">
              {isLoggedOn() && <button name="playlistItem" onClick={this.addToPlaylist} className="add-but">Add to your Bangers!</button>}
            </div>
            {isLoggedOn() && <form onSubmit={this.submitReview} className="review-form">
              <div className="reviews-input-wrapper">
                <div className="label-for-review">
                  <p>Review this track:</p>
                </div>
                <input
                  className="reviews-input"
                  type="textArea"
                  maxLength="250"
                  name="text"
                  onChange={this.handleChange}
                  value={text} />
              </div>
              <div className="review-submition-button">
                <div className="but">
                  <button className="review-submission-button">Submit</button>
                </div>
              </div>
            </form>}
            <div className="reviews">
              {this.state.track.review.map(reviews => (
                <Reviews
                  key={reviews._id}
                  reviews={reviews}
                  track={track}
                  deleteReview={this.deleteReview} />
              ))}
            </div>
          </div>
        </section >
        <Footer />
      </>
    )
  }
}

export default SingleTracks