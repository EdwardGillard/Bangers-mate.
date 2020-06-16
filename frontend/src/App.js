import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import Tracks from './components/tracks/AllTracks'
import SingleTracks from './components/tracks/DisplaySingleTracks'
import NewTrack from './components/tracks/NewTrack'
import Registration from './components/auth/Registration'
import Login from './components/auth/Login'
import Edit from './components/tracks/EditTrackInfo'
import SecureRoute from './components/common/SecureRoute'
import Error from './components/common/Error'
import PersonalPlaylist from './components/tracks/PersonalPlaylist'
import Notifications from 'react-notify-toast'
import DisplayPlaylistTracks from './components/tracks/DisplayPlaylistTracks'

const App = () => {
  return (
    <BrowserRouter>
      <Notifications />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <SecureRoute path="/tracks/add-a-track" component={NewTrack} />
        <SecureRoute path="/tracks/:id/edit" component={Edit} />
        <Route path="/tracks/:id" component={SingleTracks} />
        <Route path="/tracks" component={Tracks} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
        <SecureRoute path="/playlist/tracks/:id" component={DisplayPlaylistTracks} />
        <SecureRoute path="/playlist/tracks" component={PersonalPlaylist} />
        <Route path="/*" component={Error} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
