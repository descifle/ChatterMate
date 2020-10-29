import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'

const socket = socketClient.connect('http://localhost:8000')

const Chat = () => {
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    const [messages, setMessages] = useState([])

    const onMessageSubmit = (e) => {
        e.preventDefault()
        socket.emit('message', {message})
        setMessage('')
    }

    useEffect(() => {
        socket.on('message', message => {
            setResponse(message.message)
        })

        return () => socket.disconnect()
    }, [])

    return (
        <div>
            <p>
                {response}
            </p>
            <form onSubmit={onMessageSubmit}>
                <input value={message} onChange={e => setMessage(e.target.value)} />
                <button></button>
            </form>
        </div>
    )
}

export default Chat