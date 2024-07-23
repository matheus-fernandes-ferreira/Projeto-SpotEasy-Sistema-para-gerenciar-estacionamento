// console.log('iniciou script');
// const numeroVagas = 10

// function criarMapa(numeroVagas) {
//     const mapa = document.querySelector('.mapa')
//     console.log(mapa);
//     for (let index = 0; index < numeroVagas; index++) {
//         console.log('entrou');
//         const vaga = document.createElement('div')
//         vaga.setAttribute('class', 'vaga')
//         mapa.appendChild(vaga)
//     }
// }
// criarMapa(numeroVagas)

const form = document.getElementById('formulario-registro');
const tabelaCorpo = document.getElementById('tabela-corpo');
const btnSalvar = document.querySelector('.submit')

btnSalvar.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  const proprietario = document.getElementById('proprietario').value;
  const cpf = document.getElementById('cpf').value;
  const telefone = document.getElementById('telefone').value;
  const placa = document.getElementById('placa').value;
  const modelo = document.getElementById('modelo').value;
  const cor = document.getElementById('cor').value;

  const radios = document.querySelectorAll('.radio-input');
  let veiculo = "";
  for (const radio of radios) {
    if (radio.checked) {
      veiculo = radio.value;
      break;
    }
  }

  // Cria uma nova linha da tabela
  const novaLinha = document.createElement('tr');

  // Cria as células da nova linha
  const celulaProprietario = document.createElement('td');
  celulaProprietario.innerText = proprietario;
  novaLinha.appendChild(celulaProprietario);

  const celulaCpf = document.createElement('td');
  celulaCpf.innerText = cpf;
  novaLinha.appendChild(celulaCpf);

  const celulaTelefone = document.createElement('td');
  celulaTelefone.innerText = telefone;
  novaLinha.appendChild(celulaTelefone);

  const celulaPlaca = document.createElement('td');
  celulaPlaca.innerText = placa;
  novaLinha.appendChild(celulaPlaca);

  const celulaModelo = document.createElement('td');
  celulaModelo.innerText = modelo;
  novaLinha.appendChild(celulaModelo);

  const celulaCor = document.createElement('td');
  celulaCor.innerText = cor;
  novaLinha.appendChild(celulaCor);

  const celulaVeiculo = document.createElement('td');
  celulaVeiculo.innerText = veiculo;
  novaLinha.appendChild(celulaVeiculo);

  // Adiciona a nova linha à tabela
  tabelaCorpo.appendChild(novaLinha);
});