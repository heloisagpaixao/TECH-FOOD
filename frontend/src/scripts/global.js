document.addEventListener(
  "DOMContentLoaded",
  // As funções só serão executadas quando as páginas forem carregadas.
  // Garante que aquele arquivo realmente exista.

  function () {
    solicitarNomeCliente();
    exibirNomeCliente();
    exibirBoasVindas();
    exibirDataFooter();
    fecharMenuAoNavegar();
  },
);

// Cliente digita nome no POPUP e envia para o SESSIONSTRAGE
function solicitarNomeCliente() {
  if (sessionStorage.getItem("techfood_cliente")) return;
  const modal = document.querySelector("#modal-boas-vindas");

  if (modal) modal.style.display = "flex";

  const btnConfirmar = document.querySelector("#btn-confirmar-nome");
  const inputNome = document.querySelector("#input-nome-cliente");

  if (!btnConfirmar || !inputNome) return
  btnConfirmar.addEventListener("click", function() {
    const nome = inputNome.value.trim()
  
    if (!nome){
      inputNome.focus()
      return 
    }
  
    sessionStorage.setItem("techfood_cliente", nome)
    modal.style.display = "none"

    exibirNomeCliente()
  })

  inputNome.addEventListener("keydown", function(e){
    if(e.key === "Enter") btnConfirmar.click()
  })

}

// Pega o valor do SESSIONSTORAGE e exibe em CABEÇALHO
function exibirNomeCliente() {
  const nome = sessionStorage.getItem("techfood_cliente")
  const elemento = document.querySelector("#boas-vindas")

  if(!elemento) return 


}

// Aula 8: saudação por horário com precisão de minutos (hora + minutos/60).
function exibirBoasVindas() {
  if (sessionStorage.getItem("techfood_cliente")) return;

  const agora = new Date();
  const hora = agora.getHours();
  const minutos = agora.getMinutes()
  const horaExata = hora + minutos / 60;

  let saudacao;
  if (horaExata >= 5 && horaExata < 12) {
    saudacao = "☀️ Bom dia! Qual o seu pedido?";
  } else if (horaExata >= 12 && horaExata < 18) {
    saudacao = "🌤️ Boa tarde! Confira nosso cardápio.";
  } else {
    saudacao = "🌙 Boa noite! Ainda dá tempo de pedir.";
  }

  elemento.textContent = nome
  ? `${saudacao}, ${nome}! O que vai pedir hoje?`
  : `${saudacao}! Qual o seu pedido?`

  const elemSaudacao = document.querySelector("#boas-vindas");
  if (elemSaudacao) elemSaudacao.textContent = saudacao;
}

// Aula 8: exibe a data atual no rodapé de todas as páginas. Sem mudanças.
function exibirDataFooter() {
  const elemFooter = document.querySelector("#data-hora-footer");
  if (!elemFooter) return;

  const agora = new Date();
  elemFooter.textContent = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Aula 8: fecha o menu hambúrguer no mobile ao clicar em link. Sem mudanças.
function fecharMenuAoNavegar() {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (!isMobile) return;

  const linksMenu = document.querySelectorAll("#menu a");
  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      const checkbox = document.querySelector("#bt_menu");
      if (checkbox) checkbox.checked = false;
    });
  });
}
