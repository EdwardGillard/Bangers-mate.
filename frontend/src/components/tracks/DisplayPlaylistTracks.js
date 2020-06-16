import React from 'react'
import { getSingleTrack, deletePlaylistItem } from '../../lib/api'
import Footer from '../common/Footer'
import { Link } from 'react-router-dom'
import { toast } from '../../lib/notifications'


class DisplayPlaylistTracks extends React.Component {
  state = {
    track: null,
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

  removeFromPlaylist = async () => {
    try {
      toast('Removed from playlist')
      const trackId = this.props.match.params.id
      await deletePlaylistItem(trackId)
      this.props.history.push('/playlist/tracks')
    } catch (err) {
      console.log(err)
    }

  }

  render() {
    const { track } = this.state
    if (!track) return null
    return (
      <>
        <Link to="/playlist/track/:id">
          <section className="hero is-fullheight-with-navbar">
            <p className="track-name-tag"> {track.trackName} by {track.artist} </p>
            <div id="plwrap">
              <div id="pl-main">
                <div className="plcenter-display">
                  <img id="pl-img" src={track.bandPictureUrl} alt={track.artist} value={track._id} />
                  <div className="pl-main-content">
                    <h2 id="pl-track-album">{track.album} - {track.year}</h2>
                    <h2 id="pl-track-genre">{track.genre} - {track.subgenre}</h2>
                    <h2 id="pl-track-rating">{track.bangerRating}/10</h2>
                    <div className="add-but removepl">
                      <button onClick={this.removeFromPlaylist}>Remove from Playlist</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section >
        </Link>
        <Footer />
      </>
    )
  }
}


export default DisplayPlaylistTracks