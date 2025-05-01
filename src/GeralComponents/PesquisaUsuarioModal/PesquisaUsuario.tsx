import React from 'react'
import { EnviaDadosUser } from './Funcionalidades/enviaDadosUser'
import { PesquisaEstado } from './Funcionalidades/pesquisaEstado';

function PesquisaUsuario() {

    const {
        janelaFeedback, setjanelaFeedback,
        feedBackUser, setfeedBackUser,
        isLoading, setIsLoading,
        Error, setError,
        sucesso, setsucesso,
        LimpaDados, EnviaBackEnd, RecebeToken,
        viewToken, setviewToken,
    } = EnviaDadosUser();

    const {
        setEstado, valor,
    } = PesquisaEstado();

    return (
        <>
            {/*-----------------------------------------------------------------------------------------Modal Confirma Token----------------------------------------------------*/}
            {viewToken &&
                <div className={`fixed w-full h-full bg-black/80 z-50 top-0 transition-all duration-300 ease-in-out `}>
                    <div className='border-lg overflow-y-auto md:overflow-y-hidden fixed top-1/2 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg bg-white w-full md:w-100 h-100 md:w-190 z-50 mt-0 md:mt-0' >
                        <div className='h-10 '>
                            <div className='float-right cursor-pointer' onClick={() => setviewToken(false)}>
                                <img src="/x-lg.svg" alt="" className='h-10' />
                            </div>
                            <div className='flex justify-center h-10 ml-10' >
                                <img src="/Furia_Esports_logo.png" alt="" />
                            </div>
                            <h1 className='text-center '>Confirmação de Email Furia</h1>
                            <hr />
                        </div>
                        <br />
                        <br />
                        <div className='text-center mt-10'>
                            <h1>
                                Foi Enviado um Token de Confirmação para o Email:
                            </h1>
                            <p className='text-blue-500 text-center'>
                                {feedBackUser.email}
                            </p>
                            <input type="text" value={feedBackUser.tokenEmail} onChange={(e) => setfeedBackUser({ ...feedBackUser, tokenEmail: e.currentTarget.value })} className='border rounded-lg p-2  mx-auto mt-3 w-70' placeholder='Digite seu Token' />
                            <button className='rounded-lg bg-black text-white p-2 mt-7 block mx-auto w-90 pointer-cursor hover:bg-blue-800 transition easy-in-out duration-300' onClick={() => {
                                EnviaBackEnd()
                                setEstado('');
                            }}
                                disabled={isLoading} >{isLoading ? 'Enviando Token Aguarde...' : 'Enviar'}</button>
                        </div>

                    </div>
                </div>

            }

            <h1 className='text-2xl md:text-3xl pl-10 md:pl-20 py-4 text-start'> Feedback Furioso </h1>
            <div className='text-center text-white bg-black h-130 p-10 flex intems-center' data-aos="fade-up">
                <div className='w-80 md:w-130 m-auto'>

                    <h1 className='text-lg md:text-2xl'>
                        Para nós o seu Feedback é muito importante
                        Então para nos ajudar com melhorias Clique no Botão Abaixo e insira
                    </h1>
                    <p className='text-md md:text-lg my-3'>
                        Por exemplo
                    </p>

                    <ul className="list-disc pl-5 text-start text-md md:text-lg">
                        <li>O que deseja ver na FURIA?</li>
                        <li>O que podemos melhorar?</li>
                        <li>Ou até mesmo perguntas sobre seu time do coração</li>
                    </ul>

                    <h1 className='my-5 md:text-lg text-md'>
                        Aqui Você que manda <strong>#SomosTodosFuria</strong>
                    </h1>

                    <button className='bg-white text-black text-lg rounded-lg p-3 mt-3 hover:bg-blue-500 transition easy-in-out duration-300 cursor-pointer' onClick={() => {
                        setjanelaFeedback(true)
                        document.body.style.overflow = 'hidden';
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                        Enviar Pesquisa
                    </button>
                </div>

            </div>

            {/*-----------------------------------------------------------------------------------------Modal FeedBack----------------------------------------------------*/}

            <div className={`fixed w-full h-full bg-black/80 z-40 top-0 transition-all duration-300 ease-in-out 
              ${janelaFeedback ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <div className='fixed md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 bg-white p-5 rounded overflow-y-auto shadow-lg bg-white w-full md:w-100 h-full md:w-190 md:h-190 z-40 mt-0 md:mt-0' >
                    <div className='grid grid-cols-12'>
                        <div className='col-span-11'>
                            <h1 className='text-center mb-2 ml-14 md:ml-20'><strong>PESQUISA DE USUARIO </strong></h1>
                        </div>
                        <div className='col-span-1 cursor-pointer ' onClick={() => {
                            setjanelaFeedback(false); document.body.style.overflow = 'auto';
                            setsucesso('');
                            setError('');
                            setfeedBackUser({
                                nome: '',
                                email: '',
                                estado: '',
                                redeSocial: '',
                                apelido: '',
                                interesseCompFuria: false,
                                compsPreferidos: [''],
                                membroFavorito: '',
                                interesseCatalogo: false,
                                modeloInteresse: '',
                                estiloSugestao: '',
                                mensagem: '',
                                aceite: false,
                                tokenEmail: '',
                                id: 0,
                                idade: 0
                            })
                        }}>
                            <img src="/x-lg.svg" alt="" className='h-10 mb-2' />
                        </div>
                    </div>
                    {Error != '' ? <p className='text-red-500 text-center text-md'>{Error}</p> : ''}
                    {sucesso != '' ? <p className='text-green-500 text-center text-md'>{sucesso}</p> : ''}
                    <hr />
                    <div className='overflow-y-auto '>
                        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-cols-3">
                            <div className="ml-5">
                                <p className="mt-5">Insira Seu Nome*</p>
                                <input
                                    type="text"
                                    value={feedBackUser.nome}
                                    onChange={(e) => setfeedBackUser({ ...feedBackUser, nome: e.currentTarget.value })}
                                    className="border rounded-lg p-2 mx-auto w-full"
                                />
                            </div>
                            <div className="ml-5">
                                <p className="mt-5">Insira Seu Email*</p>
                                <input
                                    type="text"
                                    value={feedBackUser.email}
                                    onChange={(e) => setfeedBackUser({ ...feedBackUser, email: e.currentTarget.value })}
                                    className="border rounded-lg p-2 mx-auto w-full"
                                />
                            </div>
                            <div className="ml-5">
                                <p className="mt-5">Qual Estado você mora?*</p>
                                <input
                                    type="text"
                                    className="border rounded-lg p-2 mx-auto w-full"
                                    value={feedBackUser.estado}
                                    onChange={(e) => {
                                        setfeedBackUser({ ...feedBackUser, estado: e.currentTarget.value });
                                        setEstado(e.currentTarget.value)
                                    }}
                                    maxLength={2}
                                />
                                {valor && (
                                    <p className="text-black font-semibold text-center">{valor}</p>
                                )}
                            </div>
                        </div>
                        <div className='w-full flex flex-wrap justify-start'>
                            <div className='ml-5 w-full'>
                                <div className='grid grid-cols-12 gap-4'>
                                    <div className='col-span-12 md:col-span-4'>
                                        <p className='mt-10'>Qual Sua Idade?*</p>
                                        <input
                                            type="number"
                                            value={feedBackUser.idade}
                                            onChange={(e) => setfeedBackUser({ ...feedBackUser, idade: e.currentTarget.value })}
                                            className='border rounded-lg p-2 w-full'
                                            maxLength={3}
                                        />
                                    </div>

                                    <div className='col-span-12 md:col-span-4'>
                                        <p className='mt-5'>Qual Sua Rede Social mais Furiosa?*</p>
                                        <select
                                            value={feedBackUser.redeSocial}
                                            onChange={(e) => setfeedBackUser({ ...feedBackUser, redeSocial: e.currentTarget.value })}
                                            className='border rounded-lg p-2 w-full'
                                        >
                                            <option value="">Selecione uma rede social</option>
                                            <option value="Instagram">Instagram</option>
                                            <option value="Twitter">Twitter</option>
                                            <option value="TikTok">TikTok</option>
                                            <option value="Facebook">Facebook</option>
                                            <option value="YouTube">YouTube</option>
                                            <option value="Twitch">Twitch</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Discord">Discord</option>
                                            <option value="Reddit">Reddit</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>

                                    <div className='col-span-12 md:col-span-4'>
                                        <p className='mt-5'>Qual seu Usuário da Rede Social?*</p>
                                        <input
                                            type="text"
                                            value={feedBackUser.apelido}
                                            onChange={(e) => setfeedBackUser({ ...feedBackUser, apelido: e.currentTarget.value })}
                                            className='border rounded-lg p-2 w-full'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='text-center'>
                            <p className='mt-5'>Sente Interesse em competições?</p>
                            <div className='flex justify-center items-center'>
                                <input
                                    className='mt-3 bg-black'
                                    type='radio'
                                    checked={feedBackUser.interesseCompFuria === true}
                                    onChange={() => setfeedBackUser({ ...feedBackUser, interesseCompFuria: true })}
                                />
                                <span className='mt-3 ml-2'> Sim</span>

                                <input
                                    className='mt-3 ml-5 bg-black'
                                    type='radio'
                                    checked={feedBackUser.interesseCompFuria === false}
                                    onChange={() => setfeedBackUser({ ...feedBackUser, interesseCompFuria: false })}
                                />
                                <span className='mt-3 ml-2'> Não</span>
                            </div>
                        </div>

                        {feedBackUser.interesseCompFuria && (
                            <div>
                                <p className='mt-5 ml-5'>Quais seus Comps Preferidos?</p>
                                <div className='flex flex-wrap items-center justify-start'>
                                    {['CS2', 'PUBG', 'LOL', 'R6', 'Valorant', 'RocketLeague', 'Apex', 'PUBG Mobile', 'Free Fire', 'Fifa', 'Kings League', 'Furia Redram', 'Outros'].map((comp) => (
                                        <div key={comp}>
                                            <input
                                                className='mt-3 ml-5 bg-black'
                                                type='checkbox'
                                                checked={feedBackUser.compsPreferidos.includes(comp)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setfeedBackUser({
                                                            ...feedBackUser,
                                                            compsPreferidos: [...feedBackUser.compsPreferidos, comp]
                                                        });
                                                    } else {
                                                        setfeedBackUser({
                                                            ...feedBackUser,
                                                            compsPreferidos: feedBackUser.compsPreferidos.filter(item => item !== comp)
                                                        });
                                                    }
                                                }}
                                            />
                                            <span className='mt-3 ml-2'>{comp}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className='mt-5'>Qual membro da equipe Furia é o seu Favorito?</p>
                                <input
                                    type="text"
                                    value={feedBackUser.membroFavorito}
                                    onChange={(e) => setfeedBackUser({ ...feedBackUser, membroFavorito: e.target.value })}
                                    className='border rounded-lg p-2 ml-auto w-full'
                                />
                            </div>
                        )}
                        <div className='text-center'>
                            <p className='mt-5'>Curte nosso catalogo de roupas furia?</p>
                            <div className='flex justify-center items-center'>
                                <input
                                    className='mt-3 bg-black'
                                    type='radio'
                                    checked={feedBackUser.interesseCatalogo === true}
                                    onChange={() => setfeedBackUser({ ...feedBackUser, interesseCatalogo: true })}
                                />
                                <span className='mt-3 ml-2'> Sim</span>

                                <input
                                    className='mt-3 ml-5 bg-black'
                                    type='radio'
                                    checked={feedBackUser.interesseCatalogo === false}
                                    onChange={() => setfeedBackUser({ ...feedBackUser, interesseCatalogo: false })}
                                />
                                <span className='mt-3 ml-2'> Não</span>
                            </div>
                        </div>

                        {feedBackUser.interesseCatalogo && (
                            <>
                                <div>
                                    <p className='mt-5'>Qual modelo mais te interessa?</p>
                                    <input
                                        type="text"
                                        value={feedBackUser.modeloInteresse}
                                        onChange={(e) => setfeedBackUser({ ...feedBackUser, modeloInteresse: e.target.value })}
                                        className='border rounded-lg p-2 ml-auto w-full'
                                    />
                                </div>
                                <div>
                                    <p className='mt-5'>Tem algum estilo que gostaria de ver na FURIA? Por quê?</p>
                                    <textarea
                                        value={feedBackUser.estiloSugestao}
                                        onChange={(e) => setfeedBackUser({ ...feedBackUser, estiloSugestao: e.target.value })}
                                        className='block border rounded-lg p-2 mx-auto w-full h-20'
                                    />
                                </div>
                            </>
                        )}


                        <p className='mt-5'>Insira Sua Mensagem para Nossa Equipe Furia*</p>
                        <textarea className='block border rounded-lg p-2 mx-auto w-full h-40' value={feedBackUser.mensagem} onChange={(e) => setfeedBackUser({ ...feedBackUser, mensagem: e.currentTarget.value })} />
                        <input
                            className='mt-5 bg-black'
                            type='checkbox'
                            checked={feedBackUser.aceite}
                            onChange={(e) => setfeedBackUser({ ...feedBackUser, aceite: e.target.checked })}
                        /><span className='mt-5 ml-1'>Gostaria de Receber Anuncios Promocionais Furia ?</span>
                        <button className='rounded-lg bg-black text-white p-2 mt-7 block mx-auto w-full pointer-cursor hover:bg-blue-800 transition easy-in-out duration-300' onClick={() => {
                            LimpaDados();
                            setEstado('');
                        }}
                            disabled={isLoading} >{isLoading ? 'Preparando Dados....' : 'Enviar'}</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PesquisaUsuario
