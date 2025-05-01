import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

export function PesquisaEstado() {

    const [estado, setEstado] = useState('');
    const [valor, setvalor] = useState('');

    useEffect( () =>{
        BuscaEstado()
    }),[estado];


    async function BuscaEstado()
    {
        if(estado.length == 2)
        {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/ibge/uf/v1/${estado.toUpperCase()}`);
            return setvalor(`${response.data.sigla} - ${response.data.nome}`)
          } catch (error) {
            return setvalor('');
          }
        }
        else
        {
            setvalor('');
        }
    }

  return {BuscaEstado, estado, setEstado, valor}
}
