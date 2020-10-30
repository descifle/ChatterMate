// middleware
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

//port static or dynamic
const port = process.env.PORT || 8000;

//body data and cross origin
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

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

    io.on('connect', (socket) => {
        socket.on('message', message => {
            io.emit('message', message)
            console.log(message)
        })
    })
}

http.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})