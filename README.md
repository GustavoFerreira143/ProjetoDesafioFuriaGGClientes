<h1 align="center">Aqui será Descrito os Problemas a serem Sanados com a aplicação para Empresa Furia e Suas Respectivas Funcionalidades</h1>
<h3>Objetivos da Aplicação Clientes</h3>
<ul>
  <li>
    Aplicação Responsiva, Amigavel e que siga os padrões Furia 
  </li>
  <li>
    Recebimento asyncrono de Informações 
  </li>
  <li>
    Tratamento de Exeções e Bugs.
  </li>
  <li>
    Coleta de FeedBack personalizada dos Fãns.
  </li>
  <li>
    Chat interativo e em tempo real com chat bot furia.
  </li>
</ul>
<h3>Layout da Aplicação</h3>
<p>
  Para esse Projeto foram utilizados rigorosos critérios para criação de layout seguindo ao máximo o padrão da marca furia, referencias mais utilizadas foram do site de catalogo https://www.furia.gg .
</p>
<h3>Ferramentas Utilizadas</h3>
<p>
  Abaixo segue as ferramentas utilizadas para Criar a Aplicação
</p>
<ul>
  <li>
    Sistema Operacional Windows 10
  </li>
  <li>
    NodeJS versão 22.12.0
  </li>
  <li>
    Npm versão 11.0.0
  </li>
  <li>
    IDE Visual Studio Code, juntamente com a Extenção ES7+ React/Redux/React-Native snippets
  </li>
</ul>
<p>Agora segue abaixo Ferramentas para Criação do Código via NodeJS Npm</p>
  <li>
    Vite com Configuração para React + Código JS
  </li>
  <li>
    Integração de TailWindCss ao Projeto
  </li>
  <li>
    React Router Dom
  </li>
  <li>
    Axios para Requisições
  </li>
<h2>Como deve ser Feito para Efetuar a Integração do Código?</h2>
<p>
  Necessario Obrigatóriamente o Dowload de NODEJS e disponibilidade do NPM do node.
</p>
<h3>
  Passo a Passo:
</h3>
<p>
  Efetue o Download do NodeJs em sua Máquina, segue o link de Dowload: https://nodejs.org/pt, após download por Completo Recomendado rodar no terminal da Máquina: node --version e npm --version, assim verificando a disponibilidadde das mesmas na máquina.
</p>
<p>
  Clone o repositório na máquina local, pondendo ser feito Dowload Zip do arquivo ou via git bash utilizando o comando : git clone https://github.com/GustavoFerreira143/ProjetoDesafioFuriaGGClientes.git
</p>
<p>
  Por fim Basta abrir o terminal na pasta criada e rodar o comando npm install, após a finalização deve ser rodado npm run dev e então a aplicação já deverá estar ativa, pois ela puxa o build diretamente do package.json
</p>
<p>
  Caso por ventura tenha alguma falha em dowloads, segue abaixo os respectivos npm install de itens instalados no projeto:
</p>
<ul>
  <li>
    npm install react-router-dom 
</li>
  <li>
    npm install axios 
</li>
  <li>
    npm install tailwindcss @tailwindcss/vite
</li>
</ul>
<h3>IMPORTANTE!!!</h3>
<h4>Há links de requisições pelo código eles funcionam em Conjunto da API presente em https://github.com/GustavoFerreira143/ApiProjetoFuriaGG</h4>
<p>Necessario a configuração do mesmo para correto funcionamento da página, pois sem ele só havera uma landPage e modais sem suas respectivas funcionalidades</p>

<h1>Estrutura de Código</h1>
<p>O código está bem estruturado e espero que de simples compreenssão </p>
<p>Estarei inserindo aqui os Arquivos e seus respectivos conteudos, caso se tenha a necessidade de Algum Debug</p>
<pre>
|/src
|_
| |_App.jsx <- Renderização de Rotas do App de Componentes Gerais, como Chat, NavBar, ModalAoVivo e Footer
| |_index.css <- css da aplicação que no geral contém animações feitas a manualmente para a aplicação
| |_pages
|   |_LandPage
|    |_LandPage.tsx <- Rederização Principal da página que puxa o componente PesquisaUsuario para Inserção de Modal de Feedback organizado, localizado na rota /, contém função para ReceberNoticias que podem ser alteradas por funcionários e useEffect para  animação do componente de noticias        |   
|     |_LandPage.css <- css simples para algumas propriedades da landPage como o NavBar
|  
|__GeralComponents <-Pasta que contém componentes da página que podem ser reutilizados, Chat, Modal, Pesquisa, NavBar e Footer
  |
  |_Chat
  |  |_Chat.css <- simples css somente para algumas animações e balão de mensagens
  |  |_Chat.tsx <- Contém um Icone fixo que se mantém fixo ao final da tela de usuario de forma responsiva, modal responsivo para visulização do chat e lógica para envio de mensagem tratada e recebimento de mensagem de forma personalizada envio de mensagem é feito pela função EnviaMensagem()               
  |_Footer
  |   |_Footer.tsx <- Simples footer responsivo que fica ao final da tela contendo alguns links e rede Social Furia
  |   
  |_ModalAoVivo
  |  |ModalAoVivo.tsx <- Componente que dipara uma função ao servidor ao ser montado para busca de jogos em que a furia está ao vivo, caso esteja exibe um Modal com mensagem de ao Vivo e link para Transmissão
  |  
  |_NavBar
  |    |_Nav.css <- simples Css para controle de animação de exibição 
  |    |_NavBar.tsx <- Contém funções para aparecer e esconder NavBar com base no Scroll de tela e Contém redirects para redes sociais e estatisticas do time Furia
  |
  |_PesquisaUsuarioModal
            |_PesquisaUsuario.tsx <- Componente que exibe na página um elemnto visual para feedback de usuário e 2 modais sendo eles 1 para os inputs de pesquisa e outro para confirmação de senha, as funcionalidades de envio de formulario e sanitização de inputs de usuário se encontram na pasta que abaixo 
            |
            |_Funcionalidades
                    |_enviaDadosUser.tsx <- um componente de funções utilizados para Satização de dados digitados pelo usuário, envio da requisição para recebimento de token e envio do final para cadastro do formulario de usuario, funções abaixo
                        |
                        |_LimpaDados() <- recebe todos os dados do formulario e filtra buscando irregularidades e valores inválidos se ocorre tudo certo ele chama a função RecebeToken e envia o email do usuario no parametro
                        |    
                        |_RecebeToken(email) <- com base no email recebido via parametro envia uma requisição servidor que deve fazer o envio do token para o email do usuario, e armazena o id do token para envio de dados finais
                        |    
                        |_EnviaBackEnd() <- Função que envia todos os dados dados do usuário para a API armazenar no banco e reseta os campos em caso de sucesso ou retorna erro em caso falha.
</pre>


<h1 align="center">Por Fim Aproveite</h1>
