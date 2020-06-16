import React from 'react'
import { getPlaylist } from '../../lib/api'
import LayOutTracks from './LayOutTracks'

class PersonalPlaylist extends React.Component {
  state = {
    tracks: null
  }

  async componentDidMount() {
    try {
      const res = await getPlaylist()
      this.setState({ tracks: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { tracks } = this.state
    if (tracks === null) return <h1>Empty</h1>
    return (
      <>
        <section className="hero is-fullheight-with-navbar">
          <h1>Your Jams!</h1>
          {tracks.map(track => (
            <LayOutTracks key={track._id} {...track} />
          ))}
        </section>
      </>
    )
  }

}

export default PersonalPlaylist