import NavBar from './LandPageComponents/NavBar/NavBar'
import './LandPage.css'
import Chat from './LandPageComponents/Chat/Chat'
import React, { useState, useEffect } from 'react'


function Landpage() {
 
  return (
    <>
      <NavBar />
      <Chat/>
      <div id="CorpoLand">
        <div className="relative w-full h-screen">
          <div className='absolute top-0 left-0 w-full h-full z-0'>
            <img className='w-full h-full object-cover' src="/VideoFuria.gif" alt="" />
          </div>
          <div className='relative z-10 w-full h-full bg-black/60 flex items-center justify-center pt-20'>
            <div className='w-full h-100 rounded flex justify-center items-center'>
              <div className='grid grid-cols-12'>
                <div className='col-span-4 justify-center '>
                  <img src="/Furia_Esports_logo.png" className='' />
                </div>
                <div className='col-span-8 flex justify-center items-center'>
                  <h1 className='text-white md:text-3xl text-center'>
                    Fique por Dentro das Novidades do Seu time do Coração
                    <br />
                    #VemSerFuria
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-100">
          <h1 className='text-2xl md:text-3xl pl-10 md:pl-20 py-4'>
            Noticias Furia
          </h1>

          <div className="overflow-x-auto whitespace-nowrap scroll-smooth px-4 py-5" id="NoticiasFuria">
            <div className="inline-block md:w-150 md:h-110 bg-black text-white text-center mx-2 rounded-lg shadow-lg ">
              <img src='/Noticias/NoticiaFuria.jpg' className='w-full h-80'></img>
              <p className='mt-4 px-4 h-[6rem] overflow-hidden text-wrap'>
                Treinos da Furia tem inicio em 24/04/2025
              </p>
            </div>
            <div className="inline-block w-150 h-110 bg-black text-white text-center mx-2 rounded-lg shadow-lg ">
              <img src='/Noticias/CalendarioDeJogosFuria.jpg' className='w-full h-80'></img>
              <p className='mt-4 px-4 h-[6rem] overflow-hidden text-wrap'>
                Calendario de Jogos Kings League já disponivel
              </p>
            </div>
            <div className="inline-block w-150 h-110 bg-black text-white text-center mx-2 rounded-lg shadow-lg ">
              <img src='/Noticias/NoticiaFuria2.jpg' className='w-full h-80'></img>
              <p className='mt-4 px-4 h-[6rem] overflow-hidden text-wrap'>
                A furiagg anunciou a ida de skullzcs ao banco de reservas. yek1ndar entra no time como stand-in.
              </p>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center mt-50 overflow-x-auto' >
              <img src="/Patrocinadores/adidas.jpg" alt="" className='w-12 md:w-20 m-3 md:m-5' />
              <img src="/Patrocinadores/cs.jpg" alt="" className='w-12 md:w-20 m-3 md:m-5' />
              <img src="/Patrocinadores/lenovo.jpg" alt="" className='w-12 md:w-20 m-3 md:m-5' />
              <img src="/Patrocinadores/ps.jpg" alt="" className='w-12 md:w-20 m-3 md:m-5' />
              <img src="/Patrocinadores/redbull.jpg" alt="" className='w-12 md:w-20 m-3 md:m-5' />
              <img src="/Patrocinadores/hellmanns.jpg" alt="" className='w-12 md:w-20 m-3 md:m-5' />
          </div>
      </div>
    </>
  )
}

export default Landpage