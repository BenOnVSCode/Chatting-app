const express = require('express')
const router = express.Router()
const User = require('../models/user')
const uuid = require('uuid')

router.post('/login', (req, res) => {
    const { username } = req.body
    if(!username) {
        res.status(505)
    }
    if(username) {
        User.findOne({username})
            .then(user => {
                if(user) res.json({user: user})
                if(!user) {
                    const newUser = new User({
                        username: username,
                        messages: []
                    })
                    newUser.save()
                    res.json({user: newUser})
                }
            })
    }
    
})

router.post('/messages/:username', async (req, res) => {
    const reciever  = req.params.username
    const sender = req.body.username
    const message = req.body.message
    const room = uuid.v4();
    await User.findOne({username: reciever})
        .then(async user => {
            if(!user) res.status(400)
            if(user) {
                let messages = user.messages
                let found = messages.find((conversation) => {
                    if(conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender) return true
                })
                if(found) {
                    let index = messages.indexOf(found)
                    messages[index].chat.push({
                        him: message,
                        date: new Date()
                    })
                    User.findOneAndUpdate({username: reciever}, {messages: messages}, (err, user) => {
                        if(err) res.status(500)
                    })
                }
                if(!found) {
                    messages.push({
                        room: room,
                        member1: reciever,
                        member2: sender,
                        chat: [{
                            him: message,
                            date: new Date()
                        }]
                    })
                    User.findOneAndUpdate({username: reciever}, {messages: messages}, (err, user) => {
                        if(err) res.status(500)
                    })
                }
            }
        }).catch(err => {
            res.status(500)
        })

        await User.findOne({username: sender})
        .then(async user => {
            if(!user) res.status(400)
            if(user) {
                let messages = user.messages
                let found = messages.find((conversation) => {
                    if(conversation.member1 === sender && conversation.member2 === reciever || conversation.member1 === reciever && conversation.member2 === sender) return true
                })
                if(found) {
                    let index = messages.indexOf(found)
                    messages[index].chat.push({
                        me: message,
                        date: new Date()
                    })
                    User.findOneAndUpdate({username:sender}, {messages: messages}, (err, user) => {
                        if(err) res.status(500)
                    })
                }
                if(!found) {
                    messages.push({
                        room: room,
                        member1: reciever,
                        member2: sender,
                        chat: [{
                            me: message,
                            date: new Date()
                        }]
                    })
                    User.findOneAndUpdate({username: sender}, {messages: messages}, (err, user) => {
                        if(err) res.status(500)
                    })
                }
            }
        }).catch(err => {
            res.status(500)
        })
        const user = await User.findOne({username: sender})
            .then(user => res.status(200).json(user)) 
        
    
    
})

router.get('/:client/messages/:username', async (req, res) => {
    const clientusername = req.params.client
    const chatusername = req.params.username
    let messages ;
    User.findOne({username: clientusername})
        .then(user => {
            const messages = user.messages
            const found = messages.find((conversation) => {
                if(conversation.member1 === clientusername && conversation.member2 === chatusername || conversation.member1 === chatusername && conversation.member2 === clientusername) return true
            })
            res.json({chat: found.chat, room: found.room})
        }).catch(err => res.status(500))
    
})

router.get('/newfriend/:username', (req, res) => {
    const username = req.params.username
    User.findOne({username})
        .then(user => {
            if(user) res.json(true)
            else res.json(false)
        })
})
module.exports = router 