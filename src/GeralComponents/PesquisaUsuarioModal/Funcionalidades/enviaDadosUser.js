import React from 'react'
import axios from 'axios';
import { useState } from 'react';

export function enviaDadosUser() {

    const [janelaFeedback, setjanelaFeedback] = useState(false)

    const [viewToken, setviewToken] = useState(false);

    const [feedBackUser, setfeedBackUser] = useState({
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
    const [isLoading, setIsLoading] = useState(false);
    const [Error, setError] = useState('')
    const [sucesso, setsucesso] = useState('')

    function LimpaDados() {
        setError('');
        setIsLoading(true);
        setsucesso('Analisando Dados...');

        const regexValidacao = /^[a-zA-Z0-9À-ÿ\s.,!?()'-@]{1,}$/;
        const regexLink = /(https?:\/\/[^\s]+)/g;

        const {
            nome, apelido, redeSocial, mensagem, email, aceite,
            interesseCompFuria, compsPreferidos, membroFavorito,
            interesseCatalogo, modeloInteresse, estiloSugestao, estado, idade
        } = feedBackUser;

        if (!nome || !apelido || !redeSocial || !mensagem || !email || !estado) {
            setsucesso('');
            setIsLoading(false);
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        const idadeNum = Number(idade);

        if (
            !idade ||          
            !/^\d+$/.test(idade) ||     
            idade.length > 3 ||          
            idadeNum < 3 || idadeNum > 120 
        ) {
            setsucesso('');
            setIsLoading(false);
            setError("Por favor, insira uma idade válida entre 3 e 120 anos.");
            return;
        }

        if (regexLink.test(nome) || regexLink.test(apelido) || regexLink.test(redeSocial) || regexLink.test(mensagem) || regexLink.test(email) || regexLink.test(modeloInteresse) || regexLink.test(estiloSugestao) || regexLink.test(membroFavorito)) {
            setsucesso('');
            setIsLoading(false);
            setError('Links não são permitidos.');
            return;
        }

        if (!regexValidacao.test(nome) || !regexValidacao.test(apelido) || !regexValidacao.test(redeSocial) || !regexValidacao.test(mensagem) || !regexValidacao.test(email) || !regexValidacao.test(estado)) {
            setsucesso('');
            setIsLoading(false);
            setError('Texto inválido. Utilize apenas caracteres permitidos.');
            return;
        }

        const compsPreferidosSanitized = interesseCompFuria ? compsPreferidos : [];
        const membroFavoritoSanitized = interesseCompFuria ? membroFavorito : '';
        const modeloInteresseSanitized = interesseCatalogo ? modeloInteresse : '';
        const estiloSugestaoSanitized = interesseCatalogo ? estiloSugestao : '';
        const estadoSanitized = estado && estado.length === 2 ? estado.toUpperCase() : '';

        // Atualiza o feedback com os dados sanitizados
        setfeedBackUser({
            nome: nome.trim(),
            apelido: apelido.trim(),
            redeSocial: redeSocial.trim(),
            mensagem: mensagem.trim(),
            email: email.trim(),
            aceite: aceite,
            interesseCompFuria: interesseCompFuria,
            compsPreferidos: compsPreferidosSanitized,
            membroFavorito: membroFavoritoSanitized,
            interesseCatalogo: interesseCatalogo,
            modeloInteresse: modeloInteresseSanitized,
            estiloSugestao: estiloSugestaoSanitized,
            estado: estadoSanitized,
            tokenEmail: '',
            idade
        });

        setIsLoading(false);

        // Envia o token baseado no email diretamente
        RecebeToken(email.trim());
    }


    function RecebeToken(email) {

        setIsLoading(true);
        setError('');
        setsucesso('Enviando Token...')
        email = email.trim().toLowerCase();
        if (email.lenght == 1) {
            setsucesso('')
            setIsLoading(false)
            return setError('Digite seu Email!!')
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setIsLoading(false);
            setsucesso('')
            console.error('Email inválido!');
            return setError('Por favor, insira um email válido.');

        }

        axios.post('https://localhost:5000/enviaToken', {
            email: email
        })
            .then(function (response) {
                setError('');
                setfeedBackUser({ ...feedBackUser, id: response.data.Sucesso })
                setviewToken(true);
                setsucesso('')
                setIsLoading(false)
            })
            .catch(function (error) {
                if (error.response) {
                    setsucesso('')
                    setError('Erro no Envio do Token')
                    setIsLoading(false)
                } else {
                    setsucesso('')
                    setError('Erro no Envio do Token')
                    setIsLoading(false)
                }
            });
    }



    function EnviaBackEnd() {
        // Envio de dados via axios
        setIsLoading(true);
        setsucesso('Carregando...');
        axios.post('https://localhost:5000/feedback', feedBackUser)
            .then(response => {
                setError('');
                setsucesso('Feedback enviado com sucesso! Obrigado.');
                setfeedBackUser({
                    nome: '',
                    apelido: '',
                    redeSocial: '',
                    mensagem: '',
                    email: '',
                    aceite: false,
                    interesseCompFuria: false,
                    compsPreferidos: [''],
                    membroFavorito: '',
                    interesseCatalogo: false,
                    modeloInteresse: '',
                    estiloSugestao: '',
                    estado: '',
                    tokenEmail: '',
                    id: 0,
                    idade: 0
                });
                setviewToken(false);
                setTimeout(() => {
                    setError('Aguarde alguns segundos para enviar novamente.');
                    setsucesso('');
                }, 5000);

                setTimeout(() => {
                    setIsLoading(false);
                    setsucesso('');
                    setError('');
                }, 30000);
            })
            .catch(error => {
                setviewToken(false);
                setIsLoading(false);
                setsucesso('');
                sessionStorage.clear();
                if (error.response) {
                    if (error.response.status >= 400 && error.response.status < 500) {
                        const erroMensagem = error.response.data?.error || 'Erro de validação, tente novamente.';
                        setError(erroMensagem);
                    } else if (error.response.status >= 500) {
                        setError('Erro inesperado, tente novamente.');
                    } else {
                        setError('Erro ao enviar feedback, tente novamente.');
                    }
                } else {
                    // Se não houver resposta (erro de rede, timeout, etc.)
                    setError('Erro de conexão. Tente Novamente.');
                }
            });
    }

    return {
        janelaFeedback, setjanelaFeedback,
        feedBackUser, setfeedBackUser,
        isLoading, setIsLoading,
        Error, setError,
        sucesso, setsucesso,
        LimpaDados, EnviaBackEnd, RecebeToken,
        viewToken, setviewToken,

    }
}
