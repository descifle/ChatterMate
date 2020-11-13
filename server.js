// middleware
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

//port static or dynamic
const port = process.env.PORT || 3001;

//body data and cross origin
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// database info
const db = require('./models')

// express router setup
const usersRouter = require('./routes/users')
const chatRouter = require('./routes/chat')
app.use('/users', usersRouter)
app.use('/chat', chatRouter)

// serve client build when deployed to production else serve up base
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "chatapp", "build")))


    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "chatapp", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/index.html"));
    });

    const getVisitors = () => {
        let clients = io.sockets.clients().connected
        let sockets = Object.values(clients)
        let users = sockets.map(socket => socket.user)
        return users
    }

    const emitVisitors = () => {
        io.emit('visitors', getVisitors())
    }

    io.on('connection', (socket) => {
        console.log('a client connected')

        socket.emit('connection', null)

        socket.on('loggedUser', user => {
            // console.log(user)
            socket.user = user
            emitVisitors()
        })

        socket.on('message', message => {
            io.emit('message', message)
            // console.log(message)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

db.sequelize.sync().then((req) => {
    http.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch(err => console.log(err))