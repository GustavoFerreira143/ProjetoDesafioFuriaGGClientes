import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

function ModalAoVivo() {

    const [aovivo, setAoVivo] = useState(false)

    async function enviarRequisicaoAoVivo() {
        try {

            const response = await axios.post('https://localhost:5000/estaAoVivo');

            if (response.status === 200) {
                return setAoVivo(true)
            }
            return setAoVivo(false)
        } catch (error) {
            return setAoVivo(false)
        }
    }
    useEffect(() => {
        enviarRequisicaoAoVivo()
    }),[]
    

    return (
        <>
            {aovivo ?
                <div className='fixed w-full h-full bg-black/80 z-30'>
                    <div className='bg-white p-5 border rounded shadow-lg bg-white w-130 h-55 z-30 mx-auto mt-10' >
                        <h1 className='text-red-500 text-center text-lg'>SEU TIME ESTÁ AO VIVO!!!</h1>
                        <hr />
                        <p className='text-md text-center mt-7'>Para Acompanhar Seus time do Coração Basta</p>
                        <a href='https://www.twitch.tv/kingsleague_br' className='text-blue-500 text-center block'>CLICAR AQUI<br />
                            https://www.twitch.tv/kingsleague_br</a>
                        <button className='w-full bg-black text-white rounded-lg block text-center mx-auto mt-2 h-10 transition easy-in-out duration-300 hover:bg-blue-500' onClick={ e => setAoVivo(false)}>Fechar</button>
                    </div>
                </div>
                :
                ""
            }
        </>
    )
}

export default ModalAoVivo