document.addEventListener("DOMContentLoaded", function () {
  inicializarHoverCards();
  inicializarVitrine();
});

function inicializarHoverCards() {
  // 02. INTERATIVIDADE NOS CARDS (Feedback visual)
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });
}

function inicializarVitrine() {
  // 03. DELEGAÇÃO DE EVENTOS (DOM Avançado - Aula 7)
  const main = document.querySelector("main");

  if (!main) return;

  main.addEventListener("click", (event) => {
    // TODOS os eventos de clique dentro da main
    const clicado = event.target;

    // 3.1. DIFERENCIANDO os eventos de clique - QUANTIDADE DE ITENS
    if (clicado.classList.contains("btn-menos")) {
      const box = clicado.parentElement; // qualquer botão de menos da página vai executar, INDEPENDENTE de quem for o pai
      const spanQtd = box.querySelector(".qtd-valor");
      const valorAtual = Number(spanQtd.textContent);

      spanQtd.textContent = Math.max(1, valorAtual - 1); // MÍNIMO 1, diminuir a contagem do valor atual
      atualizarPrecoCard(box);
      return;
    }

    if (clicado.classList.contains("btn-mais")) {
      const box = clicado.parentElement; // qualquer botão de menos da página vai executar, INDEPENDENTE de quem for o pai
      const spanQtd = box.querySelector(".qtd-valor");
      spanQtd.textContent = Number(spanQtd.textContent) + 1; // aumentar a contagem -> NÃO precisa de validação
      atualizarPrecoCard(box);
      return;
    }

    // 3.2. AÇÃO DO BOTÃO DE PEDIDO
    if (clicado.classList.contains("btn-pedido")) {
      event.preventDefault();

      const card = clicado.parentElement;
      const nomePrato = card.querySelector("h3").textContent;
      const quantidade = Number(card.querySelector(".qtd-valor").textContent);
      const preco = parseFloat(card.querySelector(".preco").getAttribute("data-preco"));

      // Efeito visual quando clicado "Pedir Agora"
      clicado.textContent = "✔️ Adicionado!";
      clicado.style.backgroundColor = "#27ae60";
      clicado.disable = true;

      // Voltar para as configurações originais do CSS depois de um tempo pré-definido.
      setTimeout(() => {
        clicado.textContent = "Pedir Agora";
        clicado.style.backgroundColor = "";
        clicado.disable = false;
      }, 1500); // 1 segundo e meio!!!

      const badgeExistente = card.querySelector(".badge-adicionado");
      if (badgeExistente) badgeExistente.remove();
      card.insertAdjacentHTML(
        "beforeend",
        "<span class='badge-adicionado'>✔️ No resumo</span>",
      );

      setTimeout(function () {
        const badge = card.querySelector(".badge-adicionado");
        if (badge) badge.remove();
      }, 2000);

      // resetar a quantidade de itens - NOVO
      const box = card.querySelector(".quantidade-box");
      if (box) {
        box.querySelector(".qtd-valor").textContent = "1";
        atualizarPrecoCard(box);
      }

      // acionar função de salvarPedido()
      salvarPedido({ nome: nomePrato, preco: preco, qtd: quantidade });

      atualizarContadorPedidos();
    }
  }); // acabou o main ouvinte de clique.
}

function atualizarPrecoCard(box) {
  const card = box.parentElement;
  const spanPreco = card.querySelector(".preco");
  const precoUnitario = parseFloat(spanPreco.getAttribute("data-preco"));
  const quantidade = Number(box.querySelector(".qtd-valor").textContent);

  const total = precoUnitario * quantidade;
  spanPreco.textContent = "R$" + total.toFixed(2).replace(".", ",");
  spanPreco.style.color = total > 150 ? "#c0392b" : "#e67e22";
}

function salvarPedido(pedido) {
  // leu →
  const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");

  // modificou →
  pedido.subtotal = pedido.preco * pedido.qtd;
  lista.push(pedido);

  // salvou
  localStorage.setItem("techfood_pedidos", JSON.stringify(lista));
}

function atualizarContadorPedidos() {}
