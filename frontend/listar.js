let corpoTabela = document.getElementById("corpo-tabela");
let authorization = localStorage.getItem("authorization");

if (!authorization) {
  window.location.href = "login.html";
}

async function buscarUsuarios() {
  let resposta = await fetch("http://localhost:3333/usuarios", {
    headers: {
      "Content-type": "application/json",
      Accept: "appplication/json",
      Authorization: authorization,
    },
  });
  let usuarios = await resposta.json();

  for (let usuario of usuarios) {
    let tr = document.createElement("tr");
    let tdNome = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdSenha = document.createElement("td");
    let tdAcoes = document.createElement("td");

    tdNome.innerText = usuario.nome;
    tdEmail.innerText = usuario.email;
    tdSenha.innerText = usuario.senha;
    tdAcoes.innerHTML = `
      <a href="cadastrousuarios.html?id=${usuario.id}">Editar</a>
      <button onclick="excluir(${usuario.id})">Excluir</button>
    `;

    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir(id) {
  try {
    await fetch(`http://localhost:3333/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "appplication/json",
        Authorization: authorization,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }

  window.location.reload();
}

buscarUsuarios();
