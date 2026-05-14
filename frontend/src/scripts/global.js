document.addEventListener(
  "DOMContentLoaded",
  // As funções só serão executadas quando as páginas forem carregadas.
  // Garante que aquele arquivo realmente exista.

  function () {
    exibirBoasVindas();
  },
);

function exibirBoasVindas() {
  // 01. SAUDAÇÃO DINÂMICA (Base Aula 5)
  const saudacao = document.querySelector("#boas-vindas");
  const hora = new Date().getHours();
  if (saudacao) {
    saudacao.textContent =
      hora < 12
        ? "Bom dia! Qual o seu pedido?"
        : "Boa tarde! Confira nosso cardápio.";
  }
}
