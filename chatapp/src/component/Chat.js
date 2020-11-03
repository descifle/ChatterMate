import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'
import moment from 'moment'
import './chat.scss'

const socket = socketClient.connect('http://localhost:8000')

const Chat = () => {
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

        if(validateText(message)) {
            const fullMsg = {
                username: 'giovanni',
                message: message,
                time: date
            }

            socket.emit('message', {fullMsg})
            setMessage('')
        } else {
            return
        }

        console.log(chat)
    }

    const renderMessages = chat.map((item, index) => {
    return <div key={index} className="message">
                <span>{item.fullMsg.username}</span> : {item.fullMsg.message}
                <div>{item.fullMsg.time}</div>
            </div> 
    })

    return (
        <div className="chat-container">
            <div className="messages">
                <div className="message-container">
                    {renderMessages}
                </div>
            </div>
            <form className="chat-box" onSubmit={onMessageSubmit}>
                <div className="form-group">
                <input className="form-control" value={message} onChange={e => setMessage(e.target.value)} />
                <button className="btn btn-dark">send</button>
                </div>
            </form>
        </div>
    )
}

export default Chat