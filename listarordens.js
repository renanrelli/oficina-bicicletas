let corpoTabela = document.getElementById('corpo-tabela');

async function buscarOrdens () {
  let resposta = await fetch('http://localhost:3000/ordens');
  let ordens = await resposta.json();

  for (let ordem of ordens) {
    let tr = document.createElement('tr');
    let tdCliente = document.createElement('td');
    let tdStatus = document.createElement('td');
    let tdData_recebimento = document.createElement('td');
    let tdData_entrega = document.createElement('td');
    let tdDescricao = document.createElement('td');
    let tdValor= document.createElement('td');
    let tdAcoes = document.createElement('td');

    tdCliente.innerText = ordem.cliente;
    tdStatus.innerText = ordem.status;
    tdData_recebimento.innerText = ordem.data_recebimento;
    tdData_entrega.innerText = ordem.data_entrega;
    tdDescricao.innerText = ordem.descricao;
    tdValor.innerText = ordem.valor;
    tdAcoes.innerHTML = `
      <a href="cadastroitens.html?id=${ordem.id}">Editar</a>
      <button onclick="excluir(${ordem.id})">Excluir</button>
    `;

    tr.appendChild(tdCliente);
    tr.appendChild(tdStatus);
    tr.appendChild(tdData_recebimento);
    tr.appendChild(tdData_entrega);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdValor);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);
  }
}

async function excluir (id) {
  try {
    await fetch(`http://localhost:3000/ordens/${id}`, { method: 'DELETE' });
    window.location.reload();
  } catch (error) {
    console.error('Erro ao excluir item:', error);
  }

  window.location.reload();
}

buscarItens();