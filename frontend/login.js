let inputEmail = document.getElementById('email');
let inputSenha = document.getElementById('senha');
let form = document.getElementById('login');

form.addEventListener('submit', async (event) => {
  event.stopPropagation();
  event.preventDefault();

  let payload = {
    email: inputEmail.value,
    senha: inputSenha.value,
  };

  let resposta = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (resposta.ok) {
    location.href = 'home.html';
  } else if (resposta.status == 401) {
    let dados = await resposta.json();
    alert(dados.mensagem);
  } else {
    alert('Ops! Algo deu errado!');
  }
});
