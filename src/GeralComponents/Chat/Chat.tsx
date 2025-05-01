import React from 'react'
import './Chat.css'
import { useState } from 'react'
import axios from 'axios'

function Chat() {

  const [janelaVisivel, setJanelaVisivel] = useState(false)

  const [mensagemUser, setmensagemUser] = useState('')

  const [isLoading, setIsLoading] = useState(false)

   const[sucesso, setsucesso] = useState('')

  const [respostaIa, setrespostaIa] = useState([{
    mensagem: '',
    resposta: ''
  }])

  const [error, seterror] = useState('');

  async function EnviaMensagem() {
    seterror('')
    setsucesso('')
    if (!mensagemUser || mensagemUser.trim() === '') {
      return seterror('A mensagem não pode estar vazia.');
    }

    try {
      setIsLoading(true);
      setsucesso('Carregando...')
      const resposta = await axios.post('https://localhost:5000/conversas', {
        mensagem: mensagemUser
      });

      let respostaIA = resposta.data.resposta;
      respostaIA = respostaIA.replace("Resposta da IA:", "").trim();
      setrespostaIa(prev => [...prev, { mensagem: mensagemUser, resposta: respostaIA }]);
      setmensagemUser("");
      seterror('')
      setsucesso('')
      setIsLoading(false)

    } catch (erro) {
      setIsLoading(false)
      setsucesso('');
      return seterror('Houve um Erro Interno Tente Novamente.');
    }
  }

  function formatarTextoCompleto(texto) {
    // Substituir ^ por \n para tratar tudo como quebra de linha
    const textoComQuebras = texto.replace(/\^/g, '\n');
  
    // Regex para identificar links &url&, http(s) e quebras de linha
    const regex = /(&[^&]+&|https?:\/\/[^\s]+|\n)/g;
  
    const partes = textoComQuebras.split(regex);
  
    return partes.map((parte, index) => {
      // Se for um link formatado com &
      if (parte.startsWith('&') && parte.endsWith('&')) {
        const url = parte.slice(1, -1);
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            {url}
          </a>
        );
      }
  
      // Se for um link normal (http:// ou https://)
      if (parte.match(/^https?:\/\/[^\s]+$/)) {
        return (
          <a
            key={index}
            href={parte}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700 transition"
          >
            {parte}
          </a>
        );
      }
  
      // Se for uma quebra de linha
      if (parte === '\n') {
        return <br key={index} />;
      }
  
      // Texto comum
      return <span key={index}>{parte}</span>;
    });
  }
  

  return (
    <>
      <button className="fixed bottom-10 right-10 bg-white text-white p-3 w-15 h-15 md:w-18 md:h-18 rounded-full shadow-xl hover:bg-blue-700 transition duration-300 z-20 lg:z-40 cursor-pointer" onClick={() => {
        if (janelaVisivel) {
          setJanelaVisivel(false);
          document.body.style.overflow = 'auto';
        } else {
          setJanelaVisivel(true);
          document.body.style.overflow = 'hidden';
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
      }}>
        <img src='/Furia_Esports_logo.png' className='w-full' />
      </button>
      <div className={`fixed w-full h-full bg-black/80 z-30 transition-all duration-300 ease-in-out 
              ${janelaVisivel ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className='overflow-y-auto md:overflow-y-hidden fixed md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 bg-white p-5 rounded shadow-lg bg-white w-full md:w-100 h-full md:w-190 md:h-180 z-30 mt-0 md:mt-0' >
          <div className='h-[13%] md:h grid grid-cols-12'>
            <div className='col-span-1'>
              <img src="/Furia_Esports_logo.png" alt="" />
            </div>
            <div className='col-span-10 inline-block items-center ml-2'>
              <h1>Chat Bot Furia GG</h1>
              <p className='text-sm text-green-600'>ONLINE</p>
            </div>
            <div className='col-span-1 cursor-pointer' onClick={() => {setJanelaVisivel(false); document.body.style.overflow = 'auto';setsucesso('');seterror('')}}>
              <img src="/x-lg.svg" alt="" className='h-10' />
            </div>
          </div>
          {error.length > 0 ? (<p className='text-red-500 text-center text-md'>{error}</p>) : (<p></p>)}
          {sucesso != ''? (<p className='text-green-500 text-center text-md'>{sucesso}</p>) : (<p></p>)}
          <hr />
          <div id="Mensagens" className='h-[75%] md:h-130 w-full mt-3 overflow-y-auto'>
            {respostaIa.length > 0 && respostaIa.some(item => item.mensagem.trim() !== '') &&
              respostaIa
                .filter(item => item.mensagem.trim() !== '' && item.resposta.trim() !== '')
                .map((valor, index) => (
                  <div key={index} className="w-full flex flex-col gap-1">
                    <div className="flex justify-end">
                      <h1 className="bg-black text-white mensagemEnviada transition-all duration-300 ease-out transform opacity-0 scale-95 animate-fadeInRight">
                        {valor.mensagem}
                      </h1>
                    </div>
                    <div className="flex justify-start">
                      <h1 className="bg-black text-white mensagemRecebida transition-all duration-300 ease-out transform opacity-0 scale-95 animate-fadeInLeft">
                        {formatarTextoCompleto(valor.resposta)}
                      </h1>
                    </div>
                  </div>
                ))
            }

          </div>
          <hr />
          <div className='grid grid-cols-12 flex intems-center  '>
            <div className='col-span-9 md:col-span-10 '>
              <input id="InputMensagem" type="text" placeholder='Digite Sua Mensagem' className='w-70 md:w-150 h-10 bg-white rounded-lg mt-2 p-1 border' value={mensagemUser} onChange={e => setmensagemUser(e.currentTarget.value)} />
            </div>
            <div className='col-span-3 md:col-span-2 flex ml-10 justify-center'>
              <button className=' hover:bg-blue-500 rounded-lg md:p-2 mt-1 ml-3 transition duration-300 cursor-pointer' onClick={EnviaMensagem} disabled={isLoading}><img src="/send-fill.svg" alt="" className='h-7' /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat