import './LandPage.css'
import PesquisaUsuario from '../../GeralComponents/PesquisaUsuarioModal/PesquisaUsuario'
import { useRef, useEffect, useState } from 'react'
import axios from 'axios';


function Landpage() {

  const noticiasRef = useRef(null);
  const [noticias, setNoticias] = useState(false)
  const [noticiasRecebidas, setNoticiasRecebidas] = useState([])


  const [mostrarModal, setMostrarModal] = useState(false);
  const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);

  async function RecebeNoticias() {
    try {
      const response = await axios.get('https://web-production-7ea7.up.railway.app/coletaNoticias', {
        withCredentials: true
      });

      if (response.status === 200 && Array.isArray(response.data.noticias)) {
        setNoticiasRecebidas(response.data.noticias);
        setNoticias(true);
      } else {
        setNoticias(false);
      }
    } catch (error) {
      setNoticias(false);
    }
  }

  useEffect(() => {

    RecebeNoticias()
  }, [])


  useEffect(() => {
    const container = noticiasRef.current;
    if (!container) return;

    let scrollDirection = 1;
    let isUserInteracting = false;
    let interactionTimeout = null;
    let animationFrame = null;

    const maxScrollLeft = () => container.scrollWidth - container.clientWidth;

    const autoScroll = () => {
      if (!isUserInteracting) {
        container.scrollLeft += scrollDirection * 1; // velocidade ajustável

        if (container.scrollLeft >= maxScrollLeft() - 1) {
          scrollDirection = -1;
        } else if (container.scrollLeft <= 1) {
          scrollDirection = 1;
        }
      }

      animationFrame = requestAnimationFrame(autoScroll);
    };

    const handleUserInteraction = () => {
      isUserInteracting = true;
      if (interactionTimeout) clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 50); // retoma scroll após 2s sem interação
    };

    container.addEventListener('mousedown', handleUserInteraction);
    container.addEventListener('touchstart', handleUserInteraction);
    container.addEventListener('scroll', handleUserInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener('mousedown', handleUserInteraction);
      container.removeEventListener('touchstart', handleUserInteraction);
      container.removeEventListener('scroll', handleUserInteraction);
      if (interactionTimeout) clearTimeout(interactionTimeout);
    };
  }, []);


  function parseMensagemComLinks(mensagem) {
    if (!mensagem) return "Sem Texto Anexado";

    const regex = /(https?:\/\/[^\s]+)/g;
    const mensagemComLinks = mensagem.replace(regex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 underline">${url}</a>`;
    });

    return mensagemComLinks;
  }


  return (
    <>
      {mostrarModal && noticiaSelecionada && (
        <div
          className="fixed w-full h-full bg-black/80 z-40 top-0">
          <div className='overflow-y-auto md:overflow-y-hidden fixed md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2  animate-fadeIn
                  bg-white p-5 rounded shadow-lg w-full md:w-95 h-full md:w-140 md:h-170 z-30 mt-0 md:mt-0 
                  transition-all duration-300 ease-in-out'>
            <div className='grid grid-cols-12'>
              <div className='col-span-11'>
                <h1 className='text-center mb-2 ml-14 md:ml-20'><strong>Notícias</strong></h1>
              </div>
              <div className='col-span-1 cursor-pointer' onClick={() => setMostrarModal(false)}>
                <img src="/x-lg.svg" alt="Fechar" className='h-10 mb-2' />
              </div>
            </div>
            <hr />
            <div className='mt-4'>
              <img
                src={noticiaSelecionada?.img}
                alt="Imagem da notícia"
                className='w-full h-110 rounded'
              />
              <p className='text-black text-center px-2 md:px-4 w-full '>
                <span dangerouslySetInnerHTML={{
                  __html: parseMensagemComLinks(noticiaSelecionada?.texto)
                }} />
              </p>
            </div>
          </div>
        </div>

      )}

      <div id="CorpoLand">
        <div className="relative w-full h-screen">
          <div className='absolute top-0 left-0 w-full h-full z-0'>
            <video className='w-full h-full object-cover ' playsInline autoPlay loop muted>
              <source src='/Video_FuriaFundo.mp4'></source>
            </video>
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

        <div className="w-full h-240 md:h-310" >
          <h1 className='text-2xl md:text-3xl pl-10 md:pl-20 py-4 mt-5 text-start'>
            Noticias Furia
          </h1>

          <div
            className="overflow-x-auto whitespace-nowrap scroll-smooth px-4"
            id="NoticiasFuria"
            ref={noticiasRef}
          >

            {!noticias ? [
              { img: '/Noticias/NoticiaFuria.jpg', texto: 'Treinos da Furia tem inicio em 24/04/2025 https://www.furia.gg' },
              { img: '/Noticias/CalendarioDeJogosFuria.jpg', texto: 'Calendario de Jogos Kings League já disponivel para mais informações acesse https://kingsleague.pro/pt/times/50-furia-fc' },
              { img: '/Noticias/NoticiaFuria2.jpg', texto: 'A furiagg anunciou a ida de skullzcs ao banco de reservas. yek1ndar entra no time como stand-in.' },
              { img: '/Noticias/FuriaKingsLeague.jpg', texto: 'Com duas vitórias, a equipe da furiagg iniciou a sua participação na kingsleague_br https://www.furia.gg com a liderança geral da competição.' },
              {
                img: '/Noticias/FuriaAdidas.jpg',
                texto: 'Furiagg anuncia patrocínio de adidasbrasil e nova jersey para Conferir basta ir no site https://www.furia.gg .',
              }
            ].map((noticia, i) => {
              const textoPlano = typeof noticia.texto === 'string' ? noticia.texto : '';
              const textoComLinks = parseMensagemComLinks(textoPlano); 

              const textoCortado = textoPlano.length > 90 ? textoPlano.slice(0, 90) + '...' : textoComLinks;
              const excedeLimite = textoPlano.length > 90;

              return (
                <div key={i} className="inline-block lg:w-[25%] h-110 w-[100%] md:w-[45%] md:h-150 bg-black text-white text-center mx-2 rounded-lg shadow-lg">
                  <img src={noticia.img} className='w-full h-[80%] rounded-lg object-cover' />
                  <p className='mt-4 md:mt-6 px-4 h-[20%] text-sm md:text-md overflow-hidden text-wrap'>
                    <span dangerouslySetInnerHTML={{ __html: textoCortado }} />
                    {excedeLimite && (
                      <button
                        className="text-blue-400 ml-2 underline cursor-pointer"
                        onClick={() => {
                          setNoticiaSelecionada({
                            img: noticia.img,
                            texto: textoPlano,
                          });
                          setMostrarModal(true);
                        }}
                      >
                        Ver Completo
                      </button>
                    )}
                  </p>
                </div>
              );
            })
              :
              noticiasRecebidas.map((noticia, i) => {
                const textoPlano = typeof noticia.mensagem === 'string' ? noticia.mensagem : '';
                const textoComLinks = parseMensagemComLinks(textoPlano); 

                const textoCortado = textoPlano.length > 90 ? textoPlano.slice(0, 90) + '...' : textoComLinks;
                const excedeLimite = textoPlano.length > 90;

                return (
                  <div key={i} className="inline-block lg:w-[25%] h-110 w-[100%] md:w-[45%] md:h-150 bg-black text-white text-center mx-2 rounded-lg shadow-lg">
                    <img src={noticia.imagem} className='w-full h-[80%] rounded-lg object-cover' />
                    <p className='mt-4 md:mt-6 px-4 h-[20%] text-sm md:text-md overflow-hidden text-wrap'>
                      <span dangerouslySetInnerHTML={{ __html: textoCortado }} /> 
                      {excedeLimite && (
                        <button
                          className="text-blue-400 ml-2 underline cursor-pointer"
                          onClick={() => {
                            setNoticiaSelecionada({
                              img: noticia.imagem,
                              texto: textoPlano,
                            });
                            setMostrarModal(true);
                          }}
                        >
                          Ver Completo
                        </button>
                      )}
                    </p>
                  </div>
                );
              })}
          </div>

          <PesquisaUsuario />

        </div >

        <div className='flex justify-center items-center mt-50' >
          <img src="/Patrocinadores/adidas.jpg" alt="" className='w-12 md:w-20 m-2 md:m-5' />
          <img src="/Patrocinadores/cs.jpg" alt="" className='w-12 md:w-20 m-2 md:m-5' />
          <img src="/Patrocinadores/lenovo.jpg" alt="" className='w-12 md:w-20 m-2 md:m-5' />
          <img src="/Patrocinadores/ps.jpg" alt="" className='w-12 md:w-20 m-2 md:m-5' />
          <img src="/Patrocinadores/redbull.jpg" alt="" className='w-12 md:w-20 m-2 md:m-5' />
          <img src="/Patrocinadores/hellmanns.jpg" alt="" className='w-12 md:w-20 m-2 md:m-5' />
        </div>

      </div >
    </>
  )
}

export default Landpage