/* ==========================================================
   CADASTRO.JS — Lógica da página de Cadastro (cadastro.html)

   ROADMAP DESTE ARQUIVO:
   [ ] Próxima entrega — Validação do formulário e salvar no localStorage
   [ ] Depois          — Edição de prato existente
   [ ] Depois          — Exclusão de prato
   [ ] Futuro          — Substituir localStorage por chamadas à API (back-end)
   ========================================================== */

// ─────────────────────────────────────────────────────────────────────────────
// PRÓXIMA ENTREGA — Descomentar este bloco na aula de Cadastro
// ─────────────────────────────────────────────────────────────────────────────
//
document.addEventListener("DOMContentLoaded", function () {
  configurarFormulario();
  preencherTabela();
});


// ── Salva prato no localStorage e atualiza a tabela ──────────────────────────
function configurarFormulario() {
  const form = document.querySelector("#form-cadastro");
  if (!form) return;

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparErros();

    const nome      = document.querySelector("#input-nome").value.trim();
    const descricao = document.querySelector("#input-desc").value.trim();
    const preco     = document.querySelector("#input-preco").value;
    const categoria = document.querySelector("#input-categoria").value;
    const destaque  = document.querySelector("#input-destaque").checked;
    const dispElem  = document.querySelector("input[name='disponivel']:checked");
    const disponivel = dispElem ? dispElem.value : "sim";

    // ── Validação ────────────────────────────────────────────────────────────
    let temErro = false;

    if (!nome || nome.length < 3) {
      exibirErro("erro-nome", "O nome deve ter pelo menos 3 caracteres.");
      temErro = true;
    }

    if (!descricao) {
      exibirErro("erro-desc", "A descrição é obrigatória.");
      temErro = true;
    }

    const precoNum = parseFloat(preco);
    if (!preco || isNaN(precoNum) || precoNum <= 0) {
      exibirErro("erro-preco", "Informe um preço válido.");
      temErro = true;
    }

    if (!categoria) {
      exibirErro("erro-categoria", "Selecione uma categoria.");
      temErro = true;
    }

    if (temErro) {
      exibirFeedback("Corrija os campos destacados.", "erro-geral");
      return;
    }

    // ── Sem erros: monta o objeto e salva ────────────────────────────────────
    const novoPrato = { nome, descricao, preco: precoNum, categoria, destaque, disponivel };
    salvarPrato(novoPrato);
    preencherTabela();
    exibirFeedback(`✔ "${nome}" cadastrado com sucesso!`, "sucesso");
    form.reset();
  });
}
//
//
// // ── Salva no localStorage ─────────────────────────────────────────────────────
function salvarPrato(prato) {
  const lista = JSON.parse(localStorage.getItem("techfood_pratos") || "[]");
  lista.push(prato);
  localStorage.setItem("techfood_pratos", JSON.stringify(lista));
}


// ── Preenche a tabela com os pratos salvos ────────────────────────────────────
function preencherTabela() {
  const tbody = document.querySelector("#corpo-tabela");
  const dataSpan = document.querySelector("#data-tabela");
  if (!tbody) return;

  const pratos = JSON.parse(localStorage.getItem("techfood_pratos") || "[]");
  tbody.innerHTML = "";

  if (pratos.length === 0) {
    tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;color:#aaa'>Nenhum prato cadastrado.</td></tr>";
    return;
  }

  pratos.forEach(function (p, i) {
    const disp   = p.disponivel === "sim" ? "✔ Sim" : "✖ Não";
    const dest   = p.destaque ? "⭐ Sim" : "Não";
    const catFmt = p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1);
    const precoFmt = `R$ ${parseFloat(p.preco).toFixed(2).replace(".", ",")}`;

    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.nome}</td>
        <td>${catFmt}</td>
        <td>${precoFmt}</td>
        <td>${disp}</td>
        <td>${dest}</td>
      </tr>
    `;
  });

  if (dataSpan) dataSpan.textContent = new Date().toLocaleString("pt-BR");
}


// ── Helpers de validação ──────────────────────────────────────────────────────
function exibirErro(idSpan, mensagem) {
  const span = document.querySelector("#" + idSpan);
  if (span) span.textContent = mensagem;
}

function limparErros() {
  document.querySelectorAll(".msg-erro").forEach(function (s) { s.textContent = ""; });
  const fb = document.querySelector("#feedback-form");
  if (fb) { fb.textContent = ""; fb.className = ""; }
}

function exibirFeedback(mensagem, tipo) {
  const div = document.querySelector("#feedback-form");
  if (!div) return;
  div.textContent = mensagem;
  div.className   = tipo;
  setTimeout(function () { div.textContent = ""; div.className = ""; }, 4000);
}

// ─────────────────────────────────────────────────────────────────────────────
// DEPOIS — Edição de prato (descomentar na aula de Edição)
// ─────────────────────────────────────────────────────────────────────────────
//
function editarPrato(indice) {
  const pratos = JSON.parse(localStorage.getItem("techfood_pratos") || "[]");
  const prato  = pratos[indice];
  if (!prato) return;
//
//   // Preenche o formulário com os dados do prato selecionado
  document.querySelector("#input-nome").value      = prato.nome;
  document.querySelector("#input-desc").value      = prato.descricao;
  document.querySelector("#input-preco").value     = prato.preco;
  document.querySelector("#input-categoria").value = prato.categoria;
  document.querySelector("#input-destaque").checked = prato.destaque;

  // Guarda o índice para sobrescrever na hora de salvar
  document.querySelector("#form-cadastro").setAttribute("data-editando", indice);
  document.querySelector(".btn-cadastrar").textContent = "✏️ Salvar Edição";
}

function excluirPrato(indice) {
  const pratos = JSON.parse(localStorage.getItem("techfood_pratos") || "[]");
  pratos.splice(indice, 1);
  localStorage.setItem("techfood_pratos", JSON.stringify(pratos));
  preencherTabela();
}

// ─────────────────────────────────────────────────────────────────────────────
// FUTURO — Integração com Back-end (substituir localStorage por API)
//
function salvarPrato(prato) {
  fetch("https://api.techfood.com/pratos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prato)
  })
  .then(res => res.json())
  .then(data => { preencherTabela(); })
  .catch(err => console.error("Erro ao salvar:", err));
}
// ─────────────────────────────────────────────────────────────────────────────
