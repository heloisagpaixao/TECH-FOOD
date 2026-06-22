# # 🍔 TechFood - Cadastro de Pratos
Sistema web desenvolvido para o gerenciamento e cadastro de pratos de um cardápio digital. O projeto faz parte das atividades práticas do curso **Técnico em Desenvolvimento de Sistemas** do **SENAI "Italo Bologna" (Itu/SP)**.

---

## 🚀 Sobre o Projeto
Esta etapa do projeto consiste na criação da tela de cadastro de novos pratos (`cadastro.html`), permitindo que novos itens sejam adicionados e renderizados dinamicamente na página principal do cardápio.
A aplicação realiza o envio de dados textuais e o **upload real de arquivos de imagem** de forma simultânea.

---

## 🛠️ Tecnologias Utilizadas
* **Front-end:** HTML5, CSS3 (Flexbox) e JavaScript Assíncrono (API Fetch e FormData).
* **Back-end:** Node.js e Express.
* **Upload de Arquivos:** Biblioteca Multer.

---

## 📂 Arquivos do Sistema
* **`cadastro.html`:** Estrutura do formulário de cadastro com inputs validados para Nome, Preço, Descrição e Imagem.
* **`cadastro.css`:** Estilização visual da página, mantendo a identidade visual e a paleta de cores do TechFood.
* **`cadastro.js`:** Lógica do cliente que captura os dados do formulário, gera o objeto `FormData` e envia para o servidor.
* **`server.js`:** Servidor Node.js configurado com o middleware Multer para processar os uploads e servir a pasta de imagens de forma estática.

---

## ⚙️ Como Funciona o Upload
1. O usuário preenche os campos e seleciona uma imagem no computador.
2. O JavaScript intercepta o envio do formulário com `preventDefault()` e monta um objeto `FormData`.
3. A requisição é enviada via **POST** para o endpoint `/produtos`.
4. O servidor recebe o arquivo através do **Multer**, renomeia o arquivo com `Date.now()` (para evitar conflitos de nomes) e o salva na pasta `./uploads/`.
5. O link da imagem é salvo no banco de dados e a pasta se torna pública através do comando `express.static('uploads')`, permitindo a exibição correta no cardápio.

---

## 💻 Como Executar o Projeto
1. Clone este repositório para a máquina local:
```bash
git clone https://github.com/seu-usuario/techfood.git
```
```
2. Entre na pasta do projeto:
   ```bash
   cd techfood
```
3. Instale as dependências necessárias:
```bash
npm install
```
```
4. Inicie o servidor local:
   ```bash
npm start
```
*Ou execute com `node server.js`.*
5. Abra o arquivo `cadastro.html` no navegador ou acesse a URL indicada pelo servidor para testar o sistema.

---

## 🧑‍💻 Autoria
* **Nome:** Heloísa Gabrielly Paixão
* **Turma:** 3º ano B EM - Técnico em Desenvolvimento de Sistemas (SENAI Itu)
* **Data:** 18/06/2026
