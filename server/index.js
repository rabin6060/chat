import express from 'express'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'

const app = express()

app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
})

io.on("connection",(socket)=>{
    console.log(`User connected at :${socket.id}`)
    socket.on('send-message',(message)=>{
        io.emit('receive-message',message)
    })
    
    socket.on("Disconnected",()=>console.log('user disconnected'))
})

server.listen(4040,()=>console.log(`connected to port on 4040`))