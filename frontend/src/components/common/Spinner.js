import React from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Footer from './Footer'

const Spinner = () => {
  return (
    <>
    <section className="hero is-fullheight-with-navbar">
      <h1>Bangers <span className="mate">.Mate.</span></h1>
      <div className="loading-bar">
        <Loader type="Puff" color="#ff0000" height="130" width="130" />
      </div>
    </section>
    <Footer />
    </>
  )
}

export default Spinner