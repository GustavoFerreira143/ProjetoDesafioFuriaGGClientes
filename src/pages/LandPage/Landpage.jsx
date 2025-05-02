import './LandPage.css'
import PesquisaUsuario from '../../GeralComponents/PesquisaUsuarioModal/PesquisaUsuario'
import { useRef, useEffect, useState } from 'react'
import axios from 'axios';


function Landpage() {

  const noticiasRef = useRef(null);
  const [noticias, setNoticias] = useState(false)
  const [noticiasRecebidas, setNoticiasRecebidas] = useState([])


  async function RecebeNoticias() {
    try {
      const response = await axios.get('https://web-production-7ea7.up.railway.app/coletaNoticias', {
        withCredentials: true
      });

      if (response.status === 200 && Array.isArray(response.data.noticias)) {
        setNoticiasRecebidas(response.data.noticias);
        console.log(response.data.noticias)
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

        <div className="w-full h-220 md:h-280" >
          <h1 className='text-2xl md:text-3xl pl-10 md:pl-20 py-4 mt-5 text-start'>
            Noticias Furia
          </h1>

          <div
            className="overflow-x-auto whitespace-nowrap scroll-smooth px-4"
            id="NoticiasFuria"
            ref={noticiasRef}
          >

            {!noticias ? [
              { img: '/Noticias/NoticiaFuria.jpg', texto: 'Treinos da Furia tem inicio em 24/04/2025' },
              { img: '/Noticias/CalendarioDeJogosFuria.jpg', texto: 'Calendario de Jogos Kings League já disponivel' },
              { img: '/Noticias/NoticiaFuria2.jpg', texto: 'A furiagg anunciou a ida de skullzcs ao banco de reservas. yek1ndar entra no time como stand-in.' },
              { img: '/Noticias/FuriaKingsLeague.jpg', texto: 'Com duas vitórias, a equipe da furiagg iniciou a sua participação na kingsleague_br com a liderança geral da competição.' },
              {
                img: '/Noticias/FuriaAdidas.jpg',
                texto: <>Furiagg anuncia patrocínio de adidasbrasil e nova jersey para Conferir basta ir no site <a className='text-blue-500' href='https://www.furia.gg'>https://www.furia.gg</a>.</>,
              }
            ].map((noticia, i) => (
              <div key={i} className="inline-block md:w-180 h-100 md:h-140 bg-black text-white text-center mx-2 rounded-lg shadow-lg">
                <img src={noticia.img} className='w-full h-60 md:h-120 rounded-lg' />
                <p className='mt-4 px-4 h-[6rem] overflow-hidden text-wrap'>
                  {noticia.texto}
                </p>
              </div>
            ))
              :
              noticiasRecebidas.map((noticia, i) => (
                <>
                  <div key={i} className="inline-block md:w-180 h-100 md:h-140 bg-black text-white text-center mx-2 rounded-lg shadow-lg">
                    <img src={noticia.imagem} className='w-full h-60 md:h-120 rounded-lg bg-white' />
                    <p className='mt-4 px-4 h-[6rem] overflow-hidden text-wrap'
                      dangerouslySetInnerHTML={{ __html: parseMensagemComLinks(noticia.mensagem) }}
                    />
                  </div>
                </>
              ))}
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