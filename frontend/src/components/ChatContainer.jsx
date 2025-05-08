import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { ChatMessageSkeleton, LoadingBar } from './Loadings'
import ChatHeader from './ChatHeader'
import Messageinput from './Messageinput'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {

  const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessage} = useChatStore()
  const {authUser} = useAuthStore()

  const messageEndRef = useRef(null)

  useEffect(()=>{
    getMessages(selectedUser._id)

    subscribeToMessages()

    return ()=> unsubscribeFromMessage()
  },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessage])

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior : "smooth"})
    }
  },[messages])

  if(isMessagesLoading){
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <ChatMessageSkeleton />
        <Messageinput />
      </div>
    )
  }



  console.log('messages : ',messages)
  console.log('authuser profile : ',authUser.profilePic)
  console.log('selcteduser profile : ',selectedUser.profilePic)


  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />

        <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4 ">
            {messages.map((message)=>(
              <div key={message._id}
                   className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                   ref={messageEndRef}
              >
                  <div className="chat-image avatar">
                      <div className="size-10 rounded-full border">
                          <img src={
                                message.senderId === authUser._id 
                                ? authUser.profilePic || "/avatar.png"
                                : selectedUser.profilePic || "/avatar.png"
                                } 
                                alt="profile"
                                
                          />
                      </div>
                  </div>
                  <div className="chat-header mb-1">
                      <time className='text-xs opacity-50 ml-1'>
                          {formatMessageTime(message.createdAt)}
                      </time>
                  </div>  
                  <div className="chat-bubble flex flex-col">
                      {message.image && (
                        <img src={message.image}
                             alt='attachment'
                             className='sm:max-w-[200px] rounded-md mb-2'
                        />
                      )}
                      {message.text && <p>{message.text}</p>}
                  </div>           
              </div>
            ))}
        </div>

        <Messageinput />
    </div>
  )
}

export default ChatContainer