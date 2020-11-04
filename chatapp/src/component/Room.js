import React, { useState } from 'react';
import Login from './auth/Login'
import Chat from './Chat'

const Room = () => {
    const [user, setUser] = useState('')

    const renderPage = user ? <Chat user={user} /> : <Login setUser={setUser} />

    return (
        <div className="">
           {renderPage}
        </div>
       
    )
}

export default Room