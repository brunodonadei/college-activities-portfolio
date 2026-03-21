function criarCard(id, titulo = "", descricao = "", coluna = ".column") {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = id;

  card.innerHTML = `
  <button class="card-delete">
      <img src="images/trash.png" width="14" height="14" alt="Excluir" />
    </button>
  <div class="card-content">
    <label class="card-label">Título</label>
    <input class="card-input" type="text" placeholder="Digite o título..." value="${titulo}" />
    <label class="card-label">Descrição</label>
    <textarea class="card-textarea" placeholder="Digite a descrição...">${descricao}</textarea>
  </div>
`;

  card
    .querySelector(".card-input")
    .addEventListener("input", salvarNoLocalStorage);
  card
    .querySelector(".card-textarea")
    .addEventListener("input", salvarNoLocalStorage);

  card.querySelector(".card-delete").addEventListener("click", () => {
    card.remove();
    salvarNoLocalStorage();
  });

  document.querySelector(coluna).appendChild(card);
  return card;
}

function salvarNoLocalStorage() {
  const cards = [];
  const column = document.querySelector(".column");

  column.querySelectorAll(".card").forEach((card) => {
    cards.push({
      id: card.id,
      titulo: card.querySelector(".card-input").value,
      descricao: card.querySelector(".card-textarea").value,
    });
  });

  localStorage.setItem("cards", JSON.stringify(cards));
}

function carregarDoLocalStorage() {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards.forEach((c) => criarCard(c.id, c.titulo, c.descricao));
}

function limparLocalStorage() {
  localStorage.clear();
  document.querySelector("#lista").innerHTML = "";
}

function removerCard() {}

document.querySelector("#btn-adicionar").addEventListener("click", () => {
  criarCard(crypto.randomUUID());
  salvarNoLocalStorage();
});

document.querySelector("#btn-limpar").addEventListener("click", () => {
  limparLocalStorage();
});

carregarDoLocalStorage();
