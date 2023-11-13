let authorization = localStorage.getItem("authorization");

if (!authorization) {
  window.location.href = "login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let inputNome = document.getElementById("nome");
let inputEmail = document.getElementById("email");
let inputSenha = document.getElementById("senha");
let form = document.getElementById("formulario");

async function buscarDados() {
  let resposta = await fetch("http://localhost:3333/usuarios/" + id, {
    headers: {
      "Content-type": "application/json",
      Acccept: "appplication/json",
      Authorization: authorization,
    },
  });
  if (resposta.ok) {
    let usuario = await resposta.json();
    inputNome.value = usuario.nome;
    inputEmail.value = usuario.email;
    inputSenha.value = usuario.senha;
  } else if (resposta.status === 422) {
    let e = await resposta.json();
    alert(e.error);
  } else {
    alert("Ops! Algo deu errado!");
  }
}

if (id) {
  buscarDados();
}

form.addEventListener("submit", async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let nome = inputNome.value;
  let email = inputEmail.value;
  let senha = inputSenha.value;

  let payload = {
    nome,
    email,
    senha,
  };

  let url = "http://localhost:3333/usuarios";
  let method = "POST";
  if (id) {
    url += "/" + id;
    method = "PUT";
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: authorization,
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    window.location.href = "cadastrousuarios.html";
  } else {
    alert("Ops! Algo deu errado!");
  }
});
