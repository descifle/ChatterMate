import React, {useState} from 'react'
// import axios from 'axios'
import './login.scss'

const Login = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const validateSubmit = (e) => {
        e.preventDefault()

        if(username && password) {
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

    const renderUser = username.length > 0 ? `Welcome ${username}` : "No info"

    return (
        <div className="entry">
            <h1>ChatterMate</h1>
            <div>
                <h3>{renderUser}</h3>
            </div>
            <form onSubmit={validateSubmit} className="login">
                    <div className="form-group">
                        <label >Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
                    </div>
                    <button className="btn btn-danger">Join</button>
                </form>
        </div>
    )
}

export default Login