import * as api from '../api'

export const LoginToAccount = (username) => async (dispatch) => {
    try {
        const { data } = await api.login(username)
        dispatch({type: 'LOGIN_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'LOGIN_ERROR'})
    }
}

export const get_Chat = (myusername, username) => async (dispatch) => {
    try {
        const {data} = await api.getchat(myusername, username)
        dispatch({type: 'GET_CHAT_SUCCESS', payload: data})
    } catch (error) {
        dispatch({type: 'GET_CHAT_ERROR'})
    }
}

export const SendMessage = (username, message) => async (dispatch) => {
    try {
        const { data } = await api.sendmessage(username,message)
        dispatch({type: 'MESSAGE_SEND', payload: data})
        
    } catch (error) {
        dispatch({type: 'MESSAGE_ERROR'})
    }
}

export const RecieveMessage = (message) => async (dispatch) => {
    try {
        dispatch({type: 'MESSAGE_RECIEVED', payload: message})
    } catch (error) {
        dispatch({type: 'MESSAGE_RECIEVED_ERROR'})
    }
}