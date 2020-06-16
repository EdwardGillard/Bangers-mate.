import axios from 'axios'
import { getToken } from './auths'

const baseUrl = '/api/'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

export const getAllTracks = () => {
  return axios.get(`${baseUrl}tracks`)
}

export const getSingleTrack = id => {
  return axios.get(`${baseUrl}tracks/${id}`)
}

export const addATrack = data => {
  return axios.post(`${baseUrl}tracks`, data, withHeaders())
}

export const registerAUser = data => {
  return axios.post(`${baseUrl}register`, data)
}

export const loginUser = data => {
  return axios.post(`${baseUrl}login`, data)
}

export const editTrack = ( id, data ) => {
  return axios.put(`${baseUrl}tracks/${id}`, data, withHeaders())
}

export const deleteATrack = id => {
  return axios.delete(`${baseUrl}tracks/${id}`, withHeaders())
}

export const addReview = ( id, text ) => {
  return axios.post(`${baseUrl}tracks/${id}/reviews`, text, withHeaders())
}

export const deleteReview = ( id, reviewId) => {
  return axios.delete(`${baseUrl}tracks/${id}/reviews/${reviewId}`, withHeaders())
}

export const addToPlaylist = data => {
  return axios.post(`${baseUrl}playlist`, data, withHeaders())
}

export const getPlaylist = () => {
  return axios.get(`${baseUrl}playlist`, withHeaders())
}

export const deletePlaylistItem = id => {
  console.log(id)
  return axios.delete(`${baseUrl}playlist/tracks/${id}`, withHeaders())
}


