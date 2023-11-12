const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputNome = document.getElementById('nome');
let inputValor = document.getElementById('valor');
let form = document.getElementById('formulario');


if (id) {
  buscarDados();
}

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let nome = inputNome.value;
  let valor = inputValor.value;

  let payload = {
    nome,
    valor,
  }

  let url = 'http://localhost:3000/itens';
  let method = 'POST';
  if (id) {
    url += '/' + id;
    method = 'PUT';
  }

  let resposta = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (resposta.ok) {
    window.location.href = 'cadastroitens.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});
