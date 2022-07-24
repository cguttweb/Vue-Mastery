import axios from 'axios'

// single axios instance to be used throughout the app
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/cguttweb/Vue-Mastery/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents(){
    return apiClient.get('events')
  }
}