//============FUNÇÃO PARA NAVEGAR ENTRE AS "PAGINAS"
// Selecionar todos os itens do menu e as seções
const menuItems = document.querySelectorAll('.nav-group-item');
const sections = document.querySelectorAll('.main-content');

// Função para mostrar a seção correspondente e esconder as outras
function showSection(sectionId) {
  sections.forEach(section => {

    section.style.display = 'none';
  });

  const selectedSection = document.getElementById(sectionId);
  selectedSection.style.display = 'block';
}

// Adicionar um evento de clique a cada item do menu
menuItems.forEach(item => {
  item.addEventListener('click', () => {

    const sectionId = item.id.replace('nav-', ''); // Remover o prefixo "nav-" do ID

    showSection(sectionId);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  // Obtém as referências aos elementos das abas e dos containers
  const tabs = document.querySelectorAll(".tab-item.nav-link");
  const containerAtual = document.getElementById("container-tab");
  const containerHistorico = document.getElementById("container-tab-historico");

  // Define função para alternar a exibição dos containers
  function toggleTabs(tabIndex) {
      // Remove a classe "active" de todas as abas
      tabs.forEach(tab => tab.classList.remove("active"));

      // Adiciona a classe "active" à aba clicada
      tabs[tabIndex].classList.add("active");

      // Alterna a exibição dos containers com base na aba clicada
      if (tabIndex === 0) {
          containerAtual.style.display = "block";
          containerHistorico.style.display = "none";
      } else if (tabIndex === 1) {
          containerAtual.style.display = "none";
          containerHistorico.style.display = "block";
      }
  }

  // Adiciona os ouvintes de eventos de clique para as abas
  tabs.forEach((tab, index) => {
      tab.addEventListener("click", function () {
          toggleTabs(index);
      });
  });

  // Exibe a aba "Atual" por padrão ao carregar a página
  toggleTabs(0);
});


//============FIM FUNÇÃO PARA NAVEGAR ENTRE AS "PAGINAS"

//============FUNÇÃO PARA CRIAR E PREENCHER A TABELA DE REGISTROS

// // Selecionando os elementos
// const formulario = document.getElementById('formulario-veiculos');
// const tabela = document.getElementById('tabelaVeiculos');
// const btnSalvar = document.getElementById('btn-salvar');

// btnSalvar.addEventListener('click', () => {
//   // Capturar os dados do formulário
//   const placa = document.getElementById('placa').value;
//   const modelo = document.getElementById('modelo').value;
//   const tipoVeiculo = document.getElementById('tipoVeiculo').value; // Assumindo que o tipo do veículo é capturado aqui

//   // Alocar uma vaga
//   var vagaAlocada = alocarVaga(tipoVeiculo);

//   if (vagaAlocada) {
//     // Criar a linha na tabela com a vaga alocada
//     criarLinhaTabela({
//       placa,
//       modelo,
//       tipo: tipoVeiculo,
//       vaga: vagaAlocada,
//       // ... outros dados


//     });
//   } else {
//     alert('Não há vagas disponíveis para este tipo de veículo.');
//   } preencherTabelaVeiculos(); // Atualizar a tabela após salvar
// });




// // Função para adicionar uma nova linha à tabela
// function criarLinhaTabela(veiculo) {

//   const novaLinha = tabela.insertRow();

//   novaLinha.insertCell().textContent = veiculo.placa;
//   novaLinha.insertCell().textContent = veiculo.modelo;
//   novaLinha.insertCell().textContent = veiculo.cor;
//   novaLinha.insertCell().textContent = veiculo.tipo;
//   novaLinha.insertCell().textContent = veiculo.data_entrada;
//   novaLinha.insertCell().textContent = veiculo.hora_entrada;
//   novaLinha.insertCell().textContent = veiculo.vaga;

// }




// function preencherTabelaVeiculos() {
//   const tabelaVeiculos = document.getElementById('tabelaVeiculos');
//   const tbody = tabelaVeiculos.querySelector('tbody');

//   // Limpa o conteúdo da tabela
//   tbody.innerHTML = '';

//   axios.get('https://sheetdb.io/api/v1/0gxpczb7i9b15')
//     .then(response => {
//       const dadosVeiculos = response.data;

//       dadosVeiculos.forEach(veiculo => {
//         criarLinhaTabela(veiculo);
//       });
//     })
//     .catch(error => {
//       console.error('Erro ao buscar dados da planilha:', error);
//     });
// }

// // Chamar a função preencherTabelaVeiculos sempre que precisar atualizar a tabela
// // Por exemplo, ao carregar a página, após adicionar um novo veículo, etc.



// // Event listener para o botão salvar
// btnSalvar.addEventListener('click', (event) => {
//   event.preventDefault(); // Impede o envio padrão do formulário



//   // Limpando os campos do formulário (opcional)
//   formulario.reset();
// });


// const btnLimparStarage = document.getElementById('inicio')
// btnLimparStarage.addEventListener('click', () => {
//   limparLocalStorage()
// })

// function limparLocalStorage() {
//   // Verifica se o localStorage está disponível
//   if (typeof (Storage) !== "undefined") {
//     // Limpa todos os itens do localStorage
//     localStorage.clear();
//     console.log("Local storage limpo com sucesso!");
//   } else {
//     console.error("O seu navegador não suporta localStorage.");
//   }
// }

// const paginaCheckin = document.getElementById('nav-checkin')
// paginaCheckin.addEventListener('click', () => {
//   preencherTabelaVeiculos();

// })



// // **************************************************************************
// // **************************************************************************
// // **************************************************************************


// console.log('script mapa');

// class Vaga {
//   constructor(id, tipo, disp) {
//     this.id = id;
//     this.tipo = tipo;
//     this.disp = disp;
//   }
// }

// function criarMapa() {
//   const vagasMotos = parseInt(document.getElementById("vagasMotos").value);
//   const vagasCarros = parseInt(document.getElementById("vagasCarros").value);
//   const vagasMicro = parseInt(document.getElementById("vagasMicro").value);
//   const mapa = document.getElementById("mapa");

//   mapa.innerHTML = "";

//   // Tipos de vagas e seus respectivos elementos HTML
//   const tiposVagas = [
//     { id: 'A', tipo: "moto", quantidade: vagasMotos, elemento: "div" },
//     { id: 'B', tipo: "carro", quantidade: vagasCarros, elemento: "div" },
//     { id: 'C', tipo: "micro", quantidade: vagasMicro, elemento: "div" },
//   ];

//   // Criar vetores para armazenar as vagas por tipo
//   const vetorVagasMotos = [];
//   const vetorVagasCarros = [];
//   const vetorVagasMicro = [];

//   var vagas = [];
//   let contadorVaga = 1;

//   tiposVagas.forEach((tipo) => {
//     const grupo = document.createElement("div");
//     grupo.classList.add("grupo-vagas", tipo.tipo);
//     grupo.textContent = `Vagas para ${tipo.tipo}`;

//     for (let i = 0; i < tipo.quantidade; i++) {
//       const novaVaga = new Vaga(contadorVaga + tipo.id, tipo.tipo, 'livre');

//       // Adicionar a vaga ao vetor correspondente
//       if (tipo.tipo === "moto") {
//         vetorVagasMotos.push(novaVaga);
//       } else if (tipo.tipo === "carro") {
//         vetorVagasCarros.push(novaVaga);
//       } else {
//         vetorVagasMicro.push(novaVaga);
//       }
//       // Adicionar a vaga ao vetor correspondente

//       vagas.push(novaVaga);
//       contadorVaga++;

//             // Criar o elemento HTML para a vaga
//       const vagaElement = document.createElement(tipo.elemento);
//       vagaElement.classList.add("vaga");
//       vagaElement.textContent = novaVaga.id;
//       grupo.appendChild(vagaElement);

//     }
//     //adiciona os valores no dash
//     const infoMoto = document.getElementById('info-moto')
//     const infoCarro = document.getElementById('info-carro')
//     const infoMicro = document.getElementById('info-micro')

//     infoMoto.textContent = vagasMotos;
//     infoCarro.textContent = vagasCarros;
//     infoMicro.textContent = vagasMicro

//     let total = Number(vagasMotos) + Number(vagasCarros) + Number(vagasMicro);
//     console.log(vagasCarros);

//     let totalVagas = document.getElementById('total-vagas')
//     totalVagas.innerHTML = `Total de vagas: ${total}`;

//     let ocupadas = 0;
//     let vagasOcupadas = document.getElementById('vagas-ocupadas')
//     vagasOcupadas.innerHTML = `Vagas ocupadas: ${ocupadas}`;

//     let livres = total - ocupadas
//     let vagasLivres = document.getElementById('vagas-livres')
//     vagasLivres.innerHTML = `Vagas livres: ${livres}`;

//     let ocupacao = (ocupadas / total) * 100;
//     let tacxOcupacao = document.getElementById('taxaocupacao');
//     let painelTaxaOcupacao = document.getElementById('texto-ocupacao')
//     tacxOcupacao.innerHTML = `Taxa de ocupacao: ${ocupacao}%`;
//     painelTaxaOcupacao.textContent = `${ocupacao}%`

//     mapa.appendChild(grupo);

//   });
//   // Exibir os vetores no console

//   return {
//     vagasMotos: vetorVagasMotos,
//     vagasCarros: vetorVagasCarros,
//     vagasMicro: vetorVagasMicro
// };
//   // return vagas; // Retornar o array de vagas
//   // console.log(vagas);

// }

// function salvarDados() {
//   const vagasMotos = parseInt(document.getElementById("vagasMotos").value);
//   const vagasCarros = parseInt(document.getElementById("vagasCarros").value);
//   const vagasMicro = parseInt(document.getElementById("vagasMicro").value);

//   // Criar um objeto com os dados
//   dadosVagas = {
//     vagasMotos,
//     vagasCarros,
//     vagasMicro
//   };

//   // Converter para JSON e salvar no localStorage
//   localStorage.setItem("dadosVagas", JSON.stringify(dadosVagas));
// }

// function carregarDados() {
//   const dadosString = localStorage.getItem("dadosVagas");
//   if (dadosString) {
//     const dados = JSON.parse(dadosString);
//     document.getElementById("vagasMotos").value = dados.vagasMotos;
//     document.getElementById("vagasCarros").value = dados.vagasCarros;
//     document.getElementById("vagasMicro").value = dados.vagasMicro;

//     // Chamar a função criarMapa para gerar o mapa com os dados carregados
//     const todasAsVagas = criarMapa();
//   }
// }

// // Chamar a função carregarDados ao carregar a página
// window.onload = carregarDados;

// // Assumindo que você tem um botão com o ID "btnCriarMapa"
// document.getElementById("btnCriarMapa").addEventListener("click", () => {
//   criarMapa();
//   salvarDados();
// });
