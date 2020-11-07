import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'
import moment from 'moment'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box } from '@material-ui/core'
import './chat.scss'

const socket = socketClient.connect('http://localhost:3001')

const Chat = ({ user }) => {
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    const date = moment().format('h:mm')

    useEffect(() => {
        socket.on('message', data => {
            setChat(chat => [...chat, data])
        })

        return () => socket.disconnect()
    }, [])

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

            socket.emit('message', { fullMsg })
            setMessage('')
        } else {
            return
        }

        console.log(chat)
    }

    const renderMessages = chat.map((item, index) => {
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
                    <Box />
                </div>
            </div>
        </div>

    )
}

export default Chat