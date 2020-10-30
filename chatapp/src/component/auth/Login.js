import React, {useState} from 'react'
import './login.scss'

const Login = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const validateSumbit = (e) => {
        e.preventDefault()

        if(user && password) {
            console.log('this is me')
        }
      
    }

    const renderUser = user.length > 0 ? `Welcome ${user}` : "No info"

    return (
        <div className="entry">
            <h1>ChatterMate</h1>
            <div>
                <h3>{renderUser}</h3>
            </div>
            <form onSubmit={validateSumbit} className="login">
                    <div className="form-group">
                        <label >Username</label>
                        <input type="text" value={user} onChange={e => setUser(e.target.value)} className="form-control" />
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