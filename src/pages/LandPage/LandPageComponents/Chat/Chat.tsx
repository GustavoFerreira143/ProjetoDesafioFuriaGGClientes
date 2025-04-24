import React from 'react'
import './Chat.css'
import { useState } from 'react'

function Chat() {

  const [janelaVisivel, setJanelaVisivel] = useState(false)

  return (
    <>
      <button className="fixed bottom-10 right-10 bg-white text-white p-5 w-15 h-15 rounded-full shadow-xl hover:bg-blue-700 transition duration-300 z-40 cursor-pointer" onClick={() => {
        if (janelaVisivel) {
          setJanelaVisivel(false);
        } else {
          setJanelaVisivel(true);
        }
      }}>
        <img src='/chat-dots-fill.svg' className='w-full' />
      </button>
      <div className={`fixed w-full h-full bg-black/80 z-30 transition-all duration-300 ease-in-out 
              ${janelaVisivel ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className='fixed md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 bg-white p-5 rounded shadow-lg bg-white w-full md:w-100 h-105 md:w-190 md:h-180 z-30 mt-20 md:mt-0' >
          <div className='grid grid-cols-12'>
            <div className='col-span-1'>
              <img src="/Furia_Esports_logo.png" alt="" />
            </div>
            <div className='col-span-10 inline-block items-center ml-2'>
              <h1>Chat Bot Furia GG</h1>
              <p className='text-sm text-green-600'>ONLINE</p>
            </div>
            <div className='col-span-1 cursor-pointer' onClick={() => setJanelaVisivel(false)}>
              <img src="/x-lg.svg" alt="" className='h-10' />
            </div>
          </div>
          <hr />
          <div id="Mensagens" className='h-65 md:h-140 w-full mt-3 overflow-y-auto'>
            <h1 className='float-left mensagemRecebida'>Mensagem dads adasdsa dsad asdasdsa dasdsa das dasd as</h1>
            <h1 className='float-right mensagemEnviada'>Mensagem</h1>
            <h1 className='float-left mensagemRecebida'>Mensagem</h1>
            <h1 className='float-right mensagemEnviada'>Mensagem</h1>
            <h1 className='float-left mensagemRecebida'>Mensagem</h1>
            <h1 className='float-right mensagemEnviada'>Mensagem</h1>
            <h1 className='float-left mensagemRecebida'>Mensagem</h1>
          </div>
          <hr />
          <div className='grid grid-cols-12'>
            <div className='col-span-9 md:col-span-10'>
              <input id="" type="text" placeholder='Digite Sua Mensagem' className='w-70 md:w-150 h-10 bg-white rounded-lg mt-2 p-1 border' />
            </div>
            <div className='col-span-3 md:col-span-2 flex items-center ml-10 justify-center'>
              <button className='w-30 hover:bg-blue-500 rounded-lg md:p-2 mt-1 ml-3 transition duration-300'><img src="/send-fill.svg" alt="" className='h-7' /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat