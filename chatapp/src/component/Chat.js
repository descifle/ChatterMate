import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'
import moment from 'moment'
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
        return <div key={index} className="message">
            <span className={user === item.fullMsg.username ? "text-primary" : "text-white"}>{item.fullMsg.username}</span> 
            <p>{item.fullMsg.message}</p>
            <div>{item.fullMsg.time}</div>
        </div>
    })

    return (
        <div className="chat-container container-fluid">
        <div className="row h-100">
            <div className="messages col-9">
                <div className="chat-header">chattermate instant messaging | {user}</div>
                <div className="message-container">
                    {renderMessages}
                </div>
            </div>
            <div className="col-md-3">
                some text
            </div>
            <form className="col-12 chatitself" onSubmit={onMessageSubmit}>
                <div className="chat-bar row h-100">
                    {/* <span className="col-3">{user}</span> */}
                    <input className="write-message col-9" value={message} onChange={e => setMessage(e.target.value)} />
                    <button className="col-3 send-btn">Send</button>
                </div>
            </form>
            {/* <form className="chat-box" onSubmit={onMessageSubmit}>
                    <div className="form-group">
                    <span>{user}</span>
                    <input className="form-control" value={message} onChange={e => setMessage(e.target.value)} />
                    <button className="btn btn-dark">send</button>
                    </div>
                </form> */}
        </div>
    </div>
    
    )
}

export default Chat