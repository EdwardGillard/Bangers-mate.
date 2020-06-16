import React from 'react'
import Form from './Form'
import { addATrack } from '../../lib/api'
import Footer from '../common/Footer'

class NewTrack extends React.Component {
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

  //! handle changes on form.
  handleChange = e => {
    const dataInput = { ...this.state.dataInput, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ dataInput, errors })
  }

  //! handles the selects on form
  handleSelect = e => {
    this.handleChange(e)
  }

  //! handles submit.
  handleSubmit = async e => {
    e.preventDefault()
    try {
      let res = await addATrack(this.state.dataInput)
      res = res.data._id
      this.props.history.push(`/tracks/${res}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    const { errors } = this.state
    return (
      <>
        <section className="form-sec">
          <div>
            <Form
              {...this.state.dataInput}
              errors={errors}
              handleSelect={this.handleSelect}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </section>
        <Footer />
      </>
    )
  }
}




export default NewTrack