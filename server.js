// middleware
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./passport-config')

//port static or dynamic
const port = process.env.PORT || 3001;

//body data and cross origin
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// cookie setup
app.use(cookieSession({
    name: 'my-session',
    keys: ['key1', 'key2']
}))

// passport initiliaze
app.use(passport.initialize())
app.use(passport.session())

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
    // app.get("/", (req, res) => {
    //     res.sendFile(path.join(__dirname, "/index.html"));
       
    // });
    app.use(express.static(path.join(__dirname, 'chatapp/build')));

    const getVisitors = () => {

        // checks for all connected clients then creates an array of from clients variable. Then creates an array of users from mapping over each socket returning socket.user 

        let clients = io.sockets.clients().connected
        let sockets = Object.values(clients)
        let users = sockets.map(socket => socket.user)
        return users
    }

    const emitVisitors = () => {
        // sends all visitors info over sockets
        io.emit('visitors', getVisitors())
    }

    io.on('connection', function (socket) {
        console.log('a client connected')

        socket.on('loggedUser', user => {

            socket.user = user
            emitVisitors()
        })

        socket.on('message', message => {
            io.emit('message', message)
        })

        socket.on('disconnect', () => {
            //attempted disconnect of socket that leaves
            console.log('a user disconnected')
            emitVisitors() 
        })
    })
}

db.sequelize.sync().then((req) => {
    http.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch(err => console.log(err))