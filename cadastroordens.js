let corpoTabela = document.getElementById('corpo-tabela');
let nomeSelect = document.getElementById('nome');

PopularSelectClientes();

async function PopularSelectClientes() {
  try {
    let response = await fetch('http://localhost:3000/clientes');
    let clientes = await response.json();


    nomeSelect.innerHTML = ''; 
    for (let cliente of clientes) {
      let option = document.createElement('option');
      option.value = cliente.id;
      option.text = cliente.nome;
      nomeSelect.appendChild(option);
    }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let inputCliente = document.getElementById('cliente');
let inputStatus = document.getElementById('status');
let inputData_recebimento = document.getElementById('data_recebimento');
let inputData_entrega = document.getElementById('data_entrega');
let inputDescricao = document.getElementById('descricao');
let inputValor = document.getElementById('valor');
let form = document.getElementById('formulario');


if (id) {
  buscarDados();
}

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let cliente = inputCliente.value;
  let status = inputStatus.value;
  let data_recebimento = inputData_recebimento.value;
  let data_entrega = inputData_entrega.value;
  let descricao = inputDescricao.value;
  let valor = inputValor.value;

  let payload = {
    cliente,
    status,
    data_recebimento,
    data_entrega,
    descricao,
    valor,
  }

  let url = 'http://localhost:3000/ordens';
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
    window.location.href = 'cadastroordens.html'
  } else {
    alert('Ops! Algo deu errado!');
  }
});

