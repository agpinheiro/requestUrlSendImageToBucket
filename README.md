# Exemplo de Requisição para Obter URL Pré-Assinada e Enviar para Bucket de Armazenamento

Este repositório contém um exemplo simples de como solicitar uma URL pré-assinada do backend e enviar diretamente um arquivo para um bucket de armazenamento usando DigitalOcean Spaces.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 10 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) para gerenciamento de pacotes

## Configuração do Projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente necessárias. 

## Executando o Exemplo

Execute o seguinte comando para iniciar o exemplo:

```bash
npm dev
# ou
yarn dev
```

No html de exemplo você enviará uma requisição para o backend, obtendo uma URL pré-assinada para upload. Em seguida, fará o upload de um arquivo para o bucket do DigitalOcean Spaces usando a URL pré-assinada.

________________________________________________________________