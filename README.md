![GITOAK](https://github.com/user-attachments/assets/0ea5c2b9-7838-4e17-9b4d-5e610865e5c3)


<span id="topo">
<h1 align="center"> FATEC SJC - 3º Semestre ADS - OAK RH </h1>
<h3>➯ Explicação do Projeto  </h3>
<h4>O desafio do terceiro semestre consiste no desenvolvimento de uma Dashboard de Feedback e Pesquisa de Clima e Cultura, denominada "OAKRH", em parceria com a empresa Youtan. Este sistema tem como objetivo facilitar o processo de coleta e visualização de feedbacks e autoavaliações, permitindo que a equipe de RH acompanhe o desenvolvimento de seus colaboradores e identifique áreas de melhoria. A aplicação permitirá a criação de pesquisas personalizadas que envolvem categorias como Habilidades Técnicas, Comportamento e Satisfação, proporcionando insights sobre o clima organizacional e a performance individual e coletiva.</h4>  
  
<br>
<br> 
  
 <h2> ➯ Backlog do Produto </h2> 

| Rank     | Prioridade |  US   | Estimativa | Sprint | Requisito do Parceiro | Critério de aceitação |
| :----: | :----: | :----: | :----: | :----: | :----: | :----: |
| #01    | Alta |EU, enquanto admin, quero gerenciar usuários e classificá-los como Líder, Liderado ou ambos, para definir níveis de acesso na realização do login. | 30 Horas | 1  | (RF1)  | O Admin consegue cadastrar e classificar usuários, definindo os níveis de acesso (Líder, Liderado, ambos).| 
| #02    | Alta |EU, enquanto cliente, quero fazer login no site utilizando os perfis de Admin, Líder ou Liderado.| 15 Horas |  1  | (RF1)  |O cliente consegue logar usando perfis diferenciados com permissões adequadas.|
| #03    | Alta |EU, enquanto admin, quero cadastrar novas equipes e gerenciá-las.| 20 Horas |  1  | (RF1) |O Admin pode criar e gerenciar equipes no sistema.|
| #04    | Alta |EU, enquanto admin, quero cadastrar formulários com perguntas de avaliação com diferentes formatos (texto longo, escolha única, múltipla escolha) e diferentes tipos de categorias como Hard Skill, Soft Skill, Expectativas, Satisfação, entre outros. | 30 Horas |  2  | (RF2) | O Admin consegue cadastrar formulários de avaliação com diferentes tipos de perguntas e categorias.|
| #05    | Média |EU, enquanto cliente, quero visualizar todas as respostas de feedback das pesquisas de clima e cultura. | 20 Horas | 2  | (RF3)  |O cliente visualiza os resultados das respostas fornecidas nas pesquisas de clima e cultura. |
| #06    | Média |EU, enquanto Admin, quero associar perguntas a avaliações específicas de autoavaliação, liderança ou liderado.| 25 Horas | 2 | (RF2)  | O Admin pode vincular perguntas a avaliações específicas (Autoavaliação, Liderança ou Liderado). |
| #07    | Média |EU, enquanto cliente, quero usar a 'OAK-RH' para gerenciar membros da empresa, visualizando dashboards com feedbacks e pesquisa de clima e cultura. | 24 Horas | 3 | (RF1)  |O cliente consegue visualizar e gerenciar membros via dashboards que mostram feedback e clima e cultura. |
| #08    | Média |EU, enquanto Admin, quero aplicar filtros de data nos Dashboards de Líderes para analisar a evolução de times e indivíduos.| 15 Horas | 3 |  (RNF3)  | O Admin pode visualizar a evolução das equipes ao aplicar filtros de data. |
| #09    | Média |EU, enquanto cliente, quero exportar informações dos Dashboards em formato PDF para análise posterior.| 20 Horas | 4 | (RF3)  |O cliente consegue exportar as informações do Dashboard em formato PDF. | 
| #10    | Média |EU, enquanto cliente, quero ver relatórios que compararem avaliações anteriores com as atuais| 30 Horas | 4 | (RF3)  |O cliente consegue visualizar comparações entre resultados antigos e novos de forma clara.|

<br>
<br>
 <h2>  ➯ Requisitos Funcionais</h2>

| Nº Requisito   | Requisito do Parceiro |
| :----: | :----: |
| RF1  |   Desenvolver níveis de acesso diferentes: <br> <br> ● Admin: Acesso a todas as informações inseridas. Cadastro de novos usuários eclassificação dos mesmos como Líder, Liderado ou Líder e Liderado. Cadastro de pesquisas de Autoavaliação, Avaliação de Liderança e Avaliação de Liderado. <br> <br> ● Cadastro de categorias para as perguntas, que servirão para definir o grupo que a pergunta se enquadra (como Hard Skill,Soft Skill, Expectativas, Satisfação, entre outros...) e organizar os Dashboards; <br> <br> ● Líderes: Acesso às próprias informações e informações de liderados. Caso o líder tenha um superior, também poderá responder a pesquisa de Avaliação de Liderança, além de responder as pesquisas de Autoavaliação e Avaliação de Liderado; <br> <br> ● Liderados: Acesso às próprias informações. Acesso para responder a pesquisa de Autoavaliação. |
| RF2  | Sobre as pesquisas: <br> <br>● O sistema deve permitir que o Admin cadastre perguntas nos formatos: Textolongo; Escolha Única (texto e número); Múltipla Escolha. <br> <br> ● O Admin pode escolher se a pergunta deve aparecer na pesquisa de Autoavaliação, Avaliação de Liderança ou Avaliação de Liderado. <br> <br> ● O sistema terá um limite de inserção de 20 perguntas por Pesquisa, sendo 5 de cada formato, sendo possível inserir até 10 opções nos formatos de escolhamúltipla e única. <br> <br> ● O Admin pode escolher em qual categoria a pergunta se enquadra. |
| RF3  | Sobre os Dashboards: <br> <br> ● O Dashboard Pessoal deve se basear nas respostas dadas às perguntas de Autoavaliação, com as informações separadas de acordo com as categorias definidas pelo Admin.Todo usuário terá acesso ao próprio Dashboard Pessoal; <br> <br> ● O Dashboard dos Liderados, será apresentado para seus respectivos líderes e perfil Admin. Estes devem trazer as informações tanto de respostas fornecidas pelo liderado durante a Autoavaliação, quanto de respostas dadas pelo líder na Avaliação de Liderado, sobrepostas para comparação; <br> <br> ● O Dashboard Geral ficará disponível apenas para o perfil Admin, que terá acesso ao Dashboard com as informações que o usuário preencheu em sua Autoavaliação, Dashboard com as informações que o seu líder preencheu em Avaliação de Liderado e também o Dashboard com as informações que o liderado preencheu em Avaliação de Líder, sobrepostas para comparação; <br> <br> ● Todos os Dashboards devem apresentar filtros de data para que a pessoa possa escolher visualizar sua evolução ao longo do tempo ou apenas as informações preenchidas em um determinado período; <br> <br> ● É interessante que o usuário possa fazer o download de um arquivo PDF com as informações de seu Dashboard. |

<br>
<br>

 <h2> ➯ Requisitos Não Funcionais</h2>

| Nº Requisito   | Requisito do Parceiro |
| :----: | :----: |
| RFN1 | Documentação API – Application Programming Interface |
| RFN2 | Modelagem de Banco de Dados ou Arquivo de dados |
| RFN3 | Interface responsiva e amigável para facilitar o acesso e a utilização do dashboard em diferentes dispositivos e tamanhos de tela. |

<br>
<br>
<br>
<br>

## ➯ MVP
<span id="mvp">

![MVP_OAK_Readme](https://github.com/user-attachments/assets/e4ac3981-d25b-42c9-92a0-57debd974c03)


## Protótipo
<span id="prototipo">



## ➯ Backlog das Sprints

### Sprint 1 - Metodologia, tecnologias , protótipo , cadastro ,  login , interface e banco de dados .

| ITEM   | STATUS |
| :----: | :----: |
|Criar repositório no GitHub| :white_check_mark: |
|Backlog do produto| :white_check_mark: |
|Backlog da sprint| :white_check_mark: |
|Desenvolvimento de Protótipo no Figma| :white_check_mark: |
|Cadastro e Login de Usuários e o seus níveis de acesso|  |
|Cadastro de equipes e seu gerenciamento| |
|Criação de Telas do site usando React| |
|Configuração do banco de dados para o cadastro de usuários e equipes | |
|Estudo do Node.js| |
|Estudo do React| |
|Estudo do JavaScript| :white_check_mark: |
|Estudo do TypeScript| |
|Estudo do PostgreSQL|:white_check_mark: |


### Sprint 2 - 


### Sprint 3 -

### Sprint 4 -

## 🛠️ Tecnologias

As seguintes ferramentas, linguagens, bibliotecas e tecnologias foram usadas na construção do projeto:


 
* <p>
  <img align="left" title="figma-logo" height="30px" src="https://user-images.githubusercontent.com/76211125/227502784-c94d5e2d-2e39-449b-ba85-053b9106b979.png"/>
   Figma - Prototipação
 </p>

* <p>
   <img align="left" title="github-dark" height="30px" src="https://user-images.githubusercontent.com/76211125/227561942-1503fb74-eb8e-41d1-936e-bf22bc2d70eb.png#gh-dark-mode-only"/>
   <img align="left" title="github-light" height="30px" src="https://user-images.githubusercontent.com/76211125/227561896-a90cea71-7431-4908-ac8d-71fc02603eeb.png#gh-light-mode-only"/>
   GitHub - Versionamento
 </p>

* <p>
   <img align="left" title="vscode" height="30px" src="https://github.com/tandpfun/skill-icons/raw/main/icons/Idea-Dark.svg"/>
   Vscode - IDE
 </p>

* <p>
   <img align="left" title="vscode" height="30px" src="https://github.com/Phoenix-Team-Fatec/API-3/blob/master/src/src/assets/postgresql.png"/>
  PostgreSQL - Banco de dados
 </p>
 
* <p>
   <img align="left" title="vscode" height="30px" src="https://github.com/Phoenix-Team-Fatec/API-3/blob/master/src/src/assets/nodejs%20icon.png"/>
  Node.js - Ambiente de execução de JavaScript
 </p>

 * <p>
   <img align="left" title="vscode" height="30px" src="https://github.com/Phoenix-Team-Fatec/API-3/blob/master/src/src/assets/js%20icon.jpeg"/> 
   JavaScript - Linguagem de programação interpretada de alto nível
 </p>

 * <p>
   <img align="left" title="vscode" height="30px" src="https://github.com/Phoenix-Team-Fatec/API-3/blob/master/src/src/assets/React%20icon.jpeg"/> 
   React - Biblioteca de código aberto para interfaces gráficas
 </p>
 
 * <p>
   <img align="left" title="vscode" height="30px" src="https://github.com/Phoenix-Team-Fatec/API-3/blob/master/src/src/assets/TypeScript%20icon.png"/> 
   TypeScript - Linguagem de programação de código aberto
 </p>


<span id="equipe">

## :busts_in_silhouette: Equipe

|    Função     | Nome                     |                               LinkedIn                                |                     GitHub                     |
| :----------:  | :----------------------- | :-------------------------------------------------------------------: | :--------------------------------------------: |
|  Scrum Master   | Guilherme Sato              |[<img height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/LinkedIn.svg">](https://www.linkedin.com/in/guilherme-sato-42b609292/)|      [<img align="center" height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Github-Dark.svg"/>](https://github.com/thenewjapzzz)     |
|   Product Owner     | Gustavo Villela           |[<img height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/LinkedIn.svg">](https://www.linkedin.com/in/gustavo-villela-a9314b268/)|      [<img align="center" height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Github-Dark.svg"/>](https://github.com/TaldoGus)       | 
|  Dev Team     | Samuel Alkmin                 |[<img height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/LinkedIn.svg">](https://www.linkedin.com/in/samuel-alkmin-machado-52743a292/)|      [<img align="center" height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Github-Dark.svg"/>](https://github.com/samekmd)        |
| Dev Team    | Matheus Andrade                 |[<img height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/LinkedIn.svg">](https://www.linkedin.com/in/matheus-andrade-b1a65b1ba/)|      [<img align="center" height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Github-Dark.svg"/>](https://github.com/MatheusAndrade1999)      | 
| Dev Team  | Hoton Oliveira                   |[<img height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/LinkedIn.svg">](https://www.linkedin.com/in/hoton-oliveira/)                                                   |         [<img align="center" height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Github-Dark.svg"/>](https://github.com/hfoliveira90)     |
| Dev Team | Vinicius Peretta                 |[<img height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/LinkedIn.svg">](https://www.linkedin.com/in/vinicius-peretta-5a2436227/)|      [<img align="center" height="30px" src="https://github.com/tandpfun/skill-icons/blob/main/icons/Github-Dark.svg"/>](https://github.com/Peretta)        |

 

→ [Voltar ao topo](#topo)

 
