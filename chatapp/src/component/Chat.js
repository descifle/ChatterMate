import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'
import moment from 'moment'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import './chat.scss'

const socket = socketClient('http://localhost:3001')

const Chat = ({ user }) => {
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState([])

    const date = moment().format('h:mm')

    useEffect(() => {

        socket.on('connection', () => {
            
            console.log(`${user} connected`)
        })

        // saving the data from server into chat array
        socket.on('message', data => {
            setChat(chat => [...chat, data])
        })

        // shows all connected visitors from server
        socket.on('visitors', (data) => {
            setUsers(data)
        })

        return () => {
            socket.disconnect()
            console.log('disconnected')
        }
    }, [])

    useEffect(() => {

        socket.emit('loggedUser', { user })

    }, []) 

    // useEffect(() => {

    //     const loginCheck = setInterval(() => {
    //         socket.emit('loggedUser', { user })
    //     }, 2000)

    //     return () => {
    //         clearInterval(loginCheck)  
    //         socket.disconnect()
    //     }      

    // }, []) 

    const validateText = (text) => {
        let validText = false
        text.length < 1 && typeof text == 'string' ? validText = false : validText = true
        return validText
    }

    const onMessageSubmit = (e) => {
        e.preventDefault()

        if (validateText(message)) {
            const fullMsg = {
                username: user,
                message: message,
                time: date
            }

            axios({
                method: 'POST',
                data: fullMsg,
                url: '/chat/message'
            })

            socket.emit('message', { fullMsg })
            setMessage('')
        } else {
            return
        }

        
        // console.log(document.querySelector('.message-container'))

        console.log(chat)
    }

    const renderUsers = () => {

        if (users !== null) {
            return users.map((user, index) => {

                return <Button key={index}>
                            {user.user}
                       </Button>
            })
        } else {
            return <div>
                empty
            </div>
        }
    }

    const renderMessages = chat.map((item, index) => {


        setTimeout(() => {
            const msgContainer = document.querySelector('.message-container')
            let scrollHeight = msgContainer.scrollHeight
            msgContainer.scroll(0,scrollHeight)
        }, 200)

        return <div key={index} className={user === item.fullMsg.username ? "message" : "other-message"}>
                    <span className={user === item.fullMsg.username ? "text-primary" : "text-white"}>{item.fullMsg.username}</span>
                    <p>{item.fullMsg.message}</p>
                    <div>{item.fullMsg.time}</div>
                </div>
    })

    return (
        <div className="chat-container container-fluid">
            <div className="row h-100">
                <div className="messages col-9">
                    <AppBar position="static">
                        <Toolbar>
                        <Typography variant="h6" >
                           ChatterMate Instant Messaging
                        </Typography>
                            <Button className="ml-auto" color="inherit">{user}</Button>
                        </Toolbar>
                    </AppBar>
                    <div className="message-container">
                        {renderMessages}
                    </div>
                    <form className="chatitself" onSubmit={onMessageSubmit}>
                        <div className="chat-bar">
                            <input className="write-message" value={message} onChange={e => setMessage(e.target.value)} />
                            <button className="send-btn">Send</button>
                        </div>
                    </form>
                </div>
                <div className="col-3">
                    <div>
                    {renderUsers()}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chat