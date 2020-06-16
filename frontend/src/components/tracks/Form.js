import React from 'react'

const Form = ({ artist, trackName, album, artistCountry, subgenre, bandPictureUrl, year, bangerRating, handleSubmit, handleChange, handleSelect, genre, errors }) => {
  return (
    <>
      <section>
        <div className="sign-ups">
          <form onSubmit={handleSubmit}>
            <p className="forms-name">Add a Banger:</p>
            <div className="login-fields">
              <label>Enter the name of a track.</label>
              <input
                className={`input ${errors.trackName ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Put a banger here"
                name="trackName"
                value={trackName} />
            </div>
            <div className="login-fields">
              <label>Enter the name of the artist.</label>
              <input
                className={`input ${errors.artist ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Who made the banger?"
                name="artist"
                value={artist} />
            </div>
            <div className="login-fields">
              <label>Enter the Album the track appears on.</label>
              <input
                className={`input ${errors.album ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Album?"
                name="album"
                value={album} />
            </div>
            <div className="login-fields">
              <label>Where is the Artist from?</label>
              <input
                className={`input ${errors.artistCountry ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Enter artist's country of origin"
                name="artistCountry"
                value={artistCountry} />
            </div>
            <div className="login-fields">
              <label>What is the closest genre?</label>
              <select
                name="genre"
                selectedvalue={genre}
                onChange={handleSelect}>
                <option value=" "></option>
                <option value="Blues">Blues</option>
                <option value="Classical">Classical</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Folk">Folk</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Jazz">Jazz</option>
                <option value="Metal">Metal</option>
                <option value="Pop">Pop</option>
                <option value="R&B">R&B</option>
                <option value="Reggae">Reggae</option>
                <option value="Rock">Rock</option>
                <option value="Soul">Soul</option>
                <option value="World">World</option>
              </select>
            </div>
            <div className="login-fields">
              <label>Subgenre?</label>
              <input
                className={`input ${errors.subgenre ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Enter a Subgenre"
                name="subgenre"
                value={subgenre} />
            </div>
            <div className="login-fields">
              <label>URL of a photo of the artist</label>
              <input
                className={`input ${errors.bandPictureUrl ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="URL"
                name="bandPictureUrl"
                value={bandPictureUrl} />
            </div>
            <div className="login-fields">
              <label>Year of song?</label>
              <input
                maxLength="4"
                type="number"
                className={`input ${errors.year ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Enter year"
                name="year"
                value={year} />
            </div>
            <div className="login-fields">
              <label>Give the song a score (?/10)?</label>
              <input
                maxLength="2"
                type="number"
                className={`input ${errors.bangerRating ? 'is-danger' : ''}`}
                onChange={handleChange}
                placeholder="Rate that Banger"
                name="bangerRating"
                value={bangerRating} />
            </div>
            <button className="auth-button">Submit</button>
          </form>
        </div>
      </section >
    </>
  )
}



export default Form