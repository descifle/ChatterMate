import React, { useState } from 'react'
import axios from 'axios'
import './login.scss'

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const validateSubmit = (e) => {
        e.preventDefault()

        if (username) {
            console.log('this is me')

            setUser(username)

            // axios({
            //     method: 'POST',
            //     data: {
            //         username: username,
            //         password: password,
            //     },
            //     withCredentials: true,
            //     url: '/users/create',
            // })
            // .then(res => console.log(res))
            // .catch(err => console.log(err))
        }

    }

    const renderUser = username.length > 0 ? `Welcome ${username}` : "Join Us!"

    return (
        <div className="entry">
            <h1>ChatterMate</h1>
            <div>
                <h3>{renderUser}</h3>
            </div>
            <form onSubmit={validateSubmit} className="login">
                <div className="form-group py-3">
                    <label className="user-label">Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control username" />
                </div>
                {/* <div className="form-group">
                    <label >Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
                </div> */}

                <button className="btn btn-danger btn-join">Join</button>
                <div className="divide-container" ><hr className="short-divide" /><span>or</span><hr className="short-divide" /></div>
                <a href="/users/auth/google" className="btn btn-user btn-block">
                    <i className="fa fa-google"></i> Login with Google
                </a>
            </form>
        </div>
    )
}

export default Login