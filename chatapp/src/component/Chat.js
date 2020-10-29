import React, {useState, useEffect} from 'react'
import socketClient from 'socket.io-client'

const ENDPOINT = 'http://127.0.0.1:8000'

const Chat = () => {
    const [response, setResponse] = useState()

    useEffect(() => {
        const socket = socketClient(ENDPOINT)
        socket.on('fromapi', data => {
            setResponse(data)
        })

        return () => socket.disconnect()
    }, [])

    return (
        <p>
            {response}
        </p>
    )
}

export default Chat