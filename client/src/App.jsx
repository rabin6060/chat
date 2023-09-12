
import { useState,useEffect } from 'react'
import {io} from 'socket.io-client'
import './index.css'


const socket = io("http://localhost:4040")
const App = () => {
  const [username,setUserName] = useState('')
  const [chatActive,setChatActive] = useState(false)
  const [messages,setMessages] = useState([])
  const [newMessages,setNewMessages] = useState('')

  
  const handleSubmit = (e) => {
    e.preventDefault()
    const messageData = {
      message:newMessages,
      user:username,
      time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
    }
    newMessages===""?alert("message cannot be empty"):socket.emit('send-message',messageData)
    setNewMessages('')
  }
  useEffect(()=>{
    socket.on("receive-message",(message)=>{
      setMessages([...messages,message])
    })
  },[messages,socket])

  
  return (
    <div className='w-screen h-screen bg-slate-100'>
      {
        chatActive ? 
        (
          <div className='w-screen h-screen bg-slate-100 flex flex-col justify-center items-center mx-auto'>
            <h1 className='text-2xl font-bold uppercase my-2'>chat squad</h1>
            <div className='rounded-md w-full md:w-[80%] lg:w-[40%] p-2'>
                <div className='h-[80vh] lg:h-[60vh] overflow-y-scroll '>
                  {
                    messages?.map((message,index)=>(
                      <div key={index} className={`w-fit flex my-5 rounded-md shadow-md ${username===message.user?'ml-auto':''} mr-2 `}>
                        <div className='bg-green-400 flex justify-center items-center rounded-l-lg'>
                          <h3 className='font-bold text-2xl text-white px-2'>{message.user[0].toUpperCase()}</h3>
                        </div>
                        <div className='bg-white px-2'>
                          <span className='text-sm'>{message.user}</span>
                          <h3 className='text-2xl'>{message.message}</h3>
                          <h3 className='text-slate-400 text-right text-sm'>{message.time}</h3>
                        </div>
                      </div>
                      
                    ))
                  }
                </div>
                <form className='flex gap-2 md:gap-4 ' onSubmit={handleSubmit}>
                  <input type="text" placeholder='write your messages' value={newMessages} className='w-full outline-none border-1
                  px-3 py-2 rounded-md' onChange={e=>setNewMessages(e.target.value)}/>
                  <button type="submit" className='bg-green-400 px-3 py-2 text-white font-bold rounded-md'>Send</button>
                </form>
            </div>
          </div>
        )
        :
        (
          <div className='w-screen h-screen flex items-center justify-center gap-2'>
            <input type="text" name="" value={username} className='border-2 rounded-md outline-none
              text-center px-2 py-3'
              onChange={e=>setUserName(e.target.value)}
              />
            <button type='submit' className='bg-teal-500  px-2 py-3 rounded-md text-white font-bold'
              onClick={()=>!username=='' && setChatActive(!chatActive)}
            >start chat</button>
          </div>
        )
      }
    </div>
  )
}

export default App