import React from 'react'
import { getAllTracks } from '../../lib/api'
import LayOutTracks from './LayOutTracks'
import Footer from '../common/Footer'
import Spinner from '../common/Spinner'


class Tracks extends React.Component {
  state = {
    tracks: null
  }

  async componentDidMount() {
    try {
      const res = await getAllTracks()
      this.setState({ tracks: res.data })
    } catch (err) {
      this.props.history.push('/somethingwentwrong')
    }
  }
  render() {
    if (!this.state.tracks) return <Spinner />
    return (
      <>
        <div className="bangers">
          <h1>Bangers <span className="mate">.Mate.</span></h1>
          <section className="section">
            <div className="container">
              <div className="columns is-multiline">
                {this.state.tracks.map(track => (
                  <LayOutTracks key={track._id} {...track} />
                ))}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </>
    )
  }
}



export default Tracks