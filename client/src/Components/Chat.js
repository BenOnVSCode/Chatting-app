import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {get_Chat, SendMessage} from '../actions'
import './styles.css'
import { Input, Button } from 'antd';
import { io } from 'socket.io-client'
const Chat = () => {
    const dispatch = useDispatch()
    const socket = io('http://localhost:9000')
    const [msg, setmsg] = useState(null)
    const current_person = localStorage.getItem('current')
    const room = useSelector(state  => state.user.room)
    useEffect(() => {
        dispatch(get_Chat(localStorage.getItem('username'), current_person))
    }, [])
    const chat = useSelector(state => state.user.chat.chat) 
    
    let newChat = []
    if(chat) {
        for(let i = 0; i < chat.length; i++) {
            if(chat[i].him) {
                newChat = [...newChat,
                {
                    message: chat[i].him,
                    className: 'him',
                    date: chat[i].date
                }]
            }
            if(chat[i].me) {
                newChat = [...newChat,
                {
                    message: chat[i].me,
                    className: 'you',
                    date: chat[i].date
                }]
            }
        }
    }

    socket.on('connect', () => {
        
    })

    socket.emit('join-room', room)
    socket.on('recieve-message', message => {
        dispatch(get_Chat(localStorage.getItem('username'), current_person))
    })

    const send__message = (message) => {
        dispatch(SendMessage(current_person, message))
        socket.emit('send-message', message, room)
    }
    
    

    
    

    

    return (
        <div className="chat">
            <div className="user-container">
                <h3 className="user">{current_person}</h3>
            </div>
            <div className="messages-container">
                {
                    newChat.map((message, index) => (
                        <div className={message.className} key={index}>
                            <div className="message-container">
                                <h1 className={`message-${message.className}`}>{message.message}</h1>
                                <h5 className="date">{message.date.split('T')[0] + ' ' + message.date.split('T')[1]}</h5>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="input-container">
                <Input onChange={(e) => setmsg(e.target.value)} placeholder="Write a message" />
                <Button  type="primary" onClick={() => send__message(msg)}>Send</Button>
            </div>
        </div>
    )
}

export default Chat 
