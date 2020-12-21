import React, { useState, useEffect } from 'react'
import socketClient from 'socket.io-client'
import moment from 'moment'
import Popover from './Popover'
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import './chat.scss'

const socket = socketClient('http://localhost:3001')

const Chat = ({ user }) => {
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState([])
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 500)

    const date = moment().format('h:mm')

    const updateMedia = () => {
        setIsDesktop(window.innerWidth > 500);
    }

    useEffect(() => {

        // socket.on('connection', () => {

        //     console.log(`${user} connected`)
        // })

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

    }, [user])

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

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
    }

    const renderUsers = () => {

        if (users !== null) {
            return users.map((user, index) => {

                return (
                    // <Button className="message-username" key={index}>
                    //     {user.user}
                    // </Button>
                    <ListItem className="message-username" button key={index}>
                        {user.user}
                    </ListItem>
                )
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
            msgContainer.scroll(0, scrollHeight)
        }, 200)

        return (
            <div key={index} className={user === item.fullMsg.username ? "message" : "other-message"}>
                <div>
                    <span className={user === item.fullMsg.username ? "message-username" : "message-username text-dark"}>{item.fullMsg.username}</span>
                    <span className={user === item.fullMsg.username ? "message-time" : "message-time text-dark"}>{item.fullMsg.time}</span>
                </div>
                <p class={user === item.fullMsg.username ? "" : "text-dark"}>{item.fullMsg.message}</p>

            </div>
        )
    })

    return (
        <div className="chat-container container-fluid">
            <div className="row h-100">
                <div className="col-md-3 text-center">
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" >
                                ChatterMate Instant Messaging
                        </Typography>
                            {/* <Button className="ml-auto" color="inherit">{user}</Button> */}
                        </Toolbar>
                    </AppBar>
                    {isDesktop ? <div className="text-center bg-light">{renderUsers()}</div> : <Popover user={user} users={users} />}
                </div>
                <div className="messages col-md-9">
                    <div className="message-container">
                        {renderMessages}
                    </div>
                    <div className="chatitself">
                        <form onSubmit={onMessageSubmit}>
                            <div className="chat-bar">
                                <input autoFocus className="write-message" value={message} onChange={e => setMessage(e.target.value)} placeholder="type here to message..." />
                                <button className="send-btn"><i class="fa fa-paper-plane"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Chat