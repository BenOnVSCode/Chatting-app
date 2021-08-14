import axios from 'axios'


export const login = (username) => axios.post('/login', {username: username})
export const getchat = (myusername, chatusername) => axios.get(`/${myusername}/messages/${chatusername}`)
export const sendmessage = (username, message) => axios.post(`/messages/${username}`, {username: localStorage.getItem('username'), message: message})