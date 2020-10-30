import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'

const socket = socketClient.connect('http://localhost:8000')

const Chat = () => {
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('message', data => {
            setChat(chat => [...chat, data])
        })

        return () => socket.disconnect()
    }, [])

    const onMessageSubmit = (e) => {
        e.preventDefault()
        socket.emit('message', {message})
        setMessage('')
    }

    const renderMessages = chat.map((item, index) => {
    return <p>hi {item.message}</p> 
    })

    return (
        <div>
            <p>
                {renderMessages}
            </p>
            <form onSubmit={onMessageSubmit}>
                <input value={message} onChange={e => setMessage(e.target.value)} />
                <button></button>
            </form>
        </div>
    )
}

export default Chat