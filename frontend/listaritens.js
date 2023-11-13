let authorization = localStorage.getItem("authorization");

if (!authorization) {
  window.location.href = "login.html";
}

let corpoTabela = document.getElementById("corpo-tabela");

async function buscarItens() {
  let resposta = await fetch("http://localhost:3333/itens", {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });

  let itens = await resposta.json();
  for (let item of itens) {
    let tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdValor = document.createElement("td");
    let tdAcoes = document.createElement("td");

    tdNome.innerText = item.nome;
    tdValor.innerText = item.valor;
    tdAcoes.innerHTML = `
      <a href="cadastroitens.html?id=${item.id}">Editar</a>
      <button onclick="excluir(${item.id})">Excluir</button>
    `;

    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  try {
    await fetch(`http://localhost:3333/itens/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Acccept: "appplication/json",
        Authorization: authorization,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error("Erro ao excluir item:", error);
  }

  window.location.reload();
}

buscarItens();
