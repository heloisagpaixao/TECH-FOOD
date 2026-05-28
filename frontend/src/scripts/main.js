document.addEventListener("DOMContentLoaded", function () {
  renderizarCardapio();
  inicializarHoverCards();
  inicializarVitrine();
});

async function renderizarCardapio() {
  const grid = document.querySelector("#grid-cardapio");

  if (!grid) return;

  grid.innerHTML = "<p class='loading'> Carregando cardápio... <p>";

  try {
    const produtos = await buscarProdutos();

    grid.innerHTML = "";
    produtos.forEach(function (produto) {
      const card = document.createElement("article");
      card.classList.add("card");
      card.setAttribute("data-id", produto.id);

      card.innerHTML = // AQUI teria uma tag img (não tem pq vai ser uma responsabilidade do banco/back)
        `<h3> ${produto.nome}</h3>` +
        `<p class='desc'> ${produto.descricao} </p>` +
        `<div class='quantidade-box'>` +
        `<button class='btn-qtd btn-menos'> - </button>` +
        `<span class='qtd-valor'> 1 </span>` +
        `<button class='btn-qtd btn-mais'> + </button>` +
        `</div>` +
        `<span class='preco' data-preco='${produto.preco}>'` +
        `R$ ${parseFloat(produto.preco).toFixed(2).replace(".", ",")}` +
        `</span>` +
        `<button class='btn-pedido'> Pedir agora! </button>`;

      grid.appendChild(card);
    });
  } catch (erro) {
    grid.innerHTML = `<p class='loading erro'> Erro ao carregar o cardápio.
    Verifique se o servidor está rodando. </p>`;
  }
} // fim do renderizarCardapio()

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

      const produtoId = Number(card.getAttribute("data-id"));
      const quantidade = Number(card.querySelector("qtd-valor").textContent);

      // acionar função de salvarPedido()
      salvarPedido({ nome: nomePrato, preco: preco, qtd: quantidade });
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

function salvarPedido(produtoId, quantidade, botao) {
  const card = botao.parentElement;
  const nome = card.querySelector("h3").textContent;
  const preco = parseFloat(
    card.querySelector(".preco").getAttribute("data-preco"),
  );
  const subtotal = preco * quantidade;

  const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");
  lista.push({
    produto_id: produtoId,
    quantidade,
    nome,
    preco,
    subtotal,
  });
  localStorage.setItem("techfood_pedidos", JSON.stringify(lista));

  // Efeito visual quando clicado "Pedir Agora"
  clicado.textContent = "✔️ Adicionado!";
  clicado.style.backgroundColor = "#27ae60";
  clicado.disable = true;

  atualizarContadorPedidos();

  // Voltar para as configurações originais do CSS depois de um tempo pré-definido.
  setTimeout(() => {
    clicado.textContent = "Pedir Agora";
    clicado.style.backgroundColor = "";
    clicado.disable = false;
  }, 1500); // 1 segundo e meio!!!
}

function atualizarContadorPedidos() {
  const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");
  const total = lista.reduce(function (acc, p) { return acc + p.quantidade; }, 0);

  const linkMenu = document.querySelector("#menu a[href='pedidos.html']");
  if (!linkMenu) return;

  let badge = linkMenu.querySelector(".badge-menu");
  if (!badge) {
    linkMenu.insertAdjacentHTML("beforeend", "<span class='badge-menu'>0</span>");
    badge = linkMenu.querySelector(".badge-menu");
  }

  badge.textContent = total;
  linkMenu.classList.add("menu-ativo");
}
