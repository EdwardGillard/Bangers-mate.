import React from 'react'
import Form from './Form'
import { editTrack, getSingleTrack } from '../../lib/api'
import { isLoggedOn } from '../../lib/auths'
import { toast } from '../../lib/notifications'

class EditTrack extends React.Component {
  state = {
    dataInput: {
      artist: '',
      trackName: '',
      album: '',
      artistCountry: '',
      genre: '',
      subgenre: '',
      bandPictureUrl: '',
      year: '',
      bangerRating: '',
      songReview: ''
    },
    errors: {}
  }

  async componentDidMount() {
    const trackId = this.props.match.params.id
    try {
      const res = await getSingleTrack(trackId)
      this.setState({ dataInput: res.data })
    } catch (err) {
      this.props.history.push('/somethingwentwrong')
    }
  }

  handleChange = e => {
    const dataInput = { ...this.state.dataInput, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ dataInput, errors })
  }

  handleSelect = e => {
    this.handleChange(e)
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      if (isLoggedOn()) {
        // console.log(this.state.dataInput)
        const trackId = this.state.dataInput._id
        const res = await editTrack(trackId, this.state.dataInput)
        // console.log(res)
        toast(`You updated ${this.state.dataInput.trackName}`)
        this.props.history.push(`/tracks/${res.data._id}`)
      }
    } catch (err) {
      // console.log(err)
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    return (
      <section>
        <div>
          <Form
            {...this.state.dataInput}
            errors={this.state.errors}
            handleSelect={this.handleSelect}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </section>
    )
  }
}

export default EditTrack