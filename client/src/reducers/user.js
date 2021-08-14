let initialState = {
    auth: false,
    user:{},
    chat: [],
    room: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            state.auth = true
            state.user = action.payload
            localStorage.setItem('username', state.user.user.username)
            return state 
        case 'GET_CHAT_SUCCESS':
            state.chat = action.payload
            state.room = action.payload.room
            return state 
        case 'MESSAGE_SEND':
            const { messages } = action.payload
            const found = messages.find((conversation) => {
                if(conversation.member1 === localStorage.getItem('username') && conversation.member2 === localStorage.getItem('current') || conversation.member1 === localStorage.getItem('current') && conversation.member2 === localStorage.getItem('username')) return true
            })
            state.chat = found
            return state
        default: 
            return state 
    }
}