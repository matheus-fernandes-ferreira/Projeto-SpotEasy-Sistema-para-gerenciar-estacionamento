console.log('script para classes start');

class Veiculo {
    constructor(placa, modelo, cor, tipo) {
        this.placa = placa;
        this.modelo = modelo;
        this.cor = cor;
        this.tipo = tipo;
    }
}

class Checkin {
    constructor(veiculo, vaga, dataEntrada, horaEntrada) {
        this.veiculo = veiculo;
        this.vaga = vaga;
        this.dataEntrada = dataEntrada;
        this.horaEntrada = horaEntrada;
    }
}

class Checkout extends Checkin {
    constructor(checkin, dataSaida, horaSaida, tarifa) {
        super(checkin.veiculo, checkin.vaga, checkin.dataEntrada, checkin.horaEntrada);
        this.dataSaida = dataSaida;
        this.horaSaida = horaSaida;
        this.tarifa = tarifa;
    }

    calcularPermanencia() {
        const entrada = new Date(`${this.dataEntrada}T${this.horaEntrada}`);
        const saida = new Date(`${this.dataSaida}T${this.horaSaida}`);
        const diferencaEmMilisegundos = saida - entrada;
        const horas = Math.ceil(diferencaEmMilisegundos / (1000 * 60 * 60));

        console.log(`essa foi hora ${horas}`);

        return horas;

    }


    calcularTarifa(valorPorHora) {
        const horas = this.calcularPermanencia();
        return horas * valorPorHora;
    }
}

class Vaga {
    constructor(id, tipo, disp) {
        this.id = id;
        this.tipo = tipo;
        this.disp = disp;
    }

    ocupar() {
        this.disp = 'ocupada';
    }

    liberar() {
        this.disp = 'livre';
    }
}

let vagas = [];

function criarMapa() {
    const vagasMotos = parseInt(document.getElementById("vagasMotos").value);
    const vagasCarros = parseInt(document.getElementById("vagasCarros").value);
    const vagasMicro = parseInt(document.getElementById("vagasMicro").value);
    const mapa = document.getElementById("mapa");

    if (!mapa) {
        console.error('Elemento com id "mapa" não encontrado');
        return;
    }

    mapa.innerHTML = "";

    const tiposVagas = [
        { id: 'A', tipo: "moto", quantidade: vagasMotos },
        { id: 'B', tipo: "carro", quantidade: vagasCarros },
        { id: 'C', tipo: "micro", quantidade: vagasMicro },
    ];

    vagas = [];
    let contadorVaga = 1;

    tiposVagas.forEach((tipo) => {
        const grupo = document.createElement("div");
        grupo.classList.add("grupo-vagas", tipo.tipo);
        grupo.textContent = `Vagas para ${tipo.tipo}`;

        for (let i = 0; i < tipo.quantidade; i++) {
            const novaVaga = new Vaga(contadorVaga + tipo.id, tipo.tipo, 'livre');
            vagas.push(novaVaga);
            contadorVaga++;

            const vagaElement = document.createElement("div");
            vagaElement.classList.add("vaga");
            vagaElement.textContent = novaVaga.id;
            grupo.appendChild(vagaElement);
        }

        mapa.appendChild(grupo);
    });

    atualizarDashboard();
    salvarDados(); // Salva as informações de vagas após criar o mapa
}

//adiciona os valores no dash



function salvarDados() {
    const vagasMotos = parseInt(document.getElementById("vagasMotos").value);
    const vagasCarros = parseInt(document.getElementById("vagasCarros").value);
    const vagasMicro = parseInt(document.getElementById("vagasMicro").value);

    const dadosVagas = { vagasMotos, vagasCarros, vagasMicro };

    localStorage.setItem("dadosVagas", JSON.stringify(dadosVagas));
    localStorage.setItem("vagas", JSON.stringify(vagas)); // Salva o estado atual das vagas
}

function carregarDados() {
    const dadosString = localStorage.getItem("dadosVagas");
    const vagasString = localStorage.getItem("vagas");

    if (dadosString) {
        const dados = JSON.parse(dadosString);
        document.getElementById("vagasMotos").value = dados.vagasMotos;
        document.getElementById("vagasCarros").value = dados.vagasCarros;
        document.getElementById("vagasMicro").value = dados.vagasMicro;
    }

    if (vagasString) {
        vagas = JSON.parse(vagasString);
        criarMapa(); // Recria o mapa com as vagas salvas
    }
}

function atualizarDashboard() {
    const totalVagas = vagas.length;
    const vagasOcupadas = vagas.filter(vaga => vaga.disp === 'ocupada').length;
    const vagasLivres = totalVagas - vagasOcupadas;
    const ocupacao = (vagasOcupadas / totalVagas) * 100;

    document.getElementById('total-vagas').innerHTML = `Total de vagas: ${totalVagas}`;
    document.getElementById('vagas-ocupadas').innerHTML = `Vagas ocupadas: ${vagasOcupadas}`;
    document.getElementById('vagas-livres').innerHTML = `Vagas livres: ${vagasLivres}`;
    
    if ('taxaocupacao') {
        document.getElementById('taxaocupacao').innerHTML = `Taxa de ocupacao: ${ocupacao.toFixed(2)}%`;
    } else {
        document.getElementById('taxaocupacao').innerHTML = '';

    }
    document.getElementById('texto-ocupacao').textContent = `${ocupacao.toFixed(2)}%`;
}

function encontrarVagaDisponivel(tipoVeiculo) {
    return vagas.find(vaga => vaga.tipo === tipoVeiculo && vaga.disp === 'livre');
}

function salvarTabela() {
    const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
    const linhas = tabela.getElementsByTagName('tr');
    const dadosTabela = Array.from(linhas).map(linha => {
        const celulas = linha.getElementsByTagName('td');
        return {
            placa: celulas[0].textContent,
            modelo: celulas[1].textContent,
            cor: celulas[2].textContent,
            tipo: celulas[3].textContent,
            dataEntrada: celulas[4].textContent,
            horaEntrada: celulas[5].textContent,
            vaga: celulas[6].textContent
        };
    });

    localStorage.setItem('tabelaVeiculos', JSON.stringify(dadosTabela));
}

function carregarTabela() {
    const dadosString = localStorage.getItem('tabelaVeiculos');
    if (dadosString) {
        const dadosTabela = JSON.parse(dadosString);
        const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
        tabela.innerHTML = '';

        dadosTabela.forEach(dadosVeiculo => {
            const novaLinha = tabela.insertRow();

            novaLinha.insertCell().textContent = dadosVeiculo.placa;
            novaLinha.insertCell().textContent = dadosVeiculo.modelo;
            novaLinha.insertCell().textContent = dadosVeiculo.cor;
            novaLinha.insertCell().textContent = dadosVeiculo.tipo;
            novaLinha.insertCell().textContent = dadosVeiculo.dataEntrada;
            novaLinha.insertCell().textContent = dadosVeiculo.horaEntrada;
            novaLinha.insertCell().textContent = dadosVeiculo.vaga;

            // Adiciona a coluna de ações
            novaLinha.appendChild(criarColunaAcoes());
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    carregarTabela();
    atualizarDashboard();

    const btnSalvar = document.getElementById('btn-salvar');
    const btnCriarMapa = document.getElementById('btn-criarMapa');

    if (btnSalvar) {
        btnSalvar.addEventListener('click', (event) => {
            event.preventDefault();

            const placa = document.getElementById('placa').value;
            const modelo = document.getElementById('modelo').value;
            const cor = document.getElementById('cor').value;
            const tipo = document.getElementById('tipo').value;

            const dataAtual = new Date();
            const dataEntrada = dataAtual.toLocaleDateString('pt-BR');
            const horaEntrada = dataAtual.toLocaleTimeString('pt-BR');

            const novaVaga = encontrarVagaDisponivel(tipo);

            if (!novaVaga) {
                alert("Nenhuma vaga disponível para este tipo de veículo.");
                return;
            }

            novaVaga.ocupar();

            const novoVeiculo = new Veiculo(placa, modelo, cor, tipo);
            const novoCheckin = new Checkin(novoVeiculo, novaVaga.id, dataEntrada, horaEntrada);

            const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
            const novaLinha = tabela.insertRow();

            novaLinha.insertCell().textContent = novoCheckin.veiculo.placa;
            novaLinha.insertCell().textContent = novoCheckin.veiculo.modelo;
            novaLinha.insertCell().textContent = novoCheckin.veiculo.cor;
            novaLinha.insertCell().textContent = novoCheckin.veiculo.tipo;
            novaLinha.insertCell().textContent = novoCheckin.dataEntrada;
            novaLinha.insertCell().textContent = novoCheckin.horaEntrada;
            novaLinha.insertCell().textContent = novoCheckin.vaga;

            // Adiciona a coluna de ações
            novaLinha.appendChild(criarColunaAcoes());

            // Atualiza o dashboard
            atualizarDashboard();

            // Salva a tabela no localStorage
            salvarTabela();
        });
    } else {
        console.error('Elemento com id "btn-salvar" não encontrado');
    }

    if (btnCriarMapa) {
        btnCriarMapa.addEventListener('click', (event) => {
            event.preventDefault();
            criarMapa(); // Cria o mapa e salva os dados
        });
    } else {
        console.error('Elemento com id "btn-criarMapa" não encontrado');
    }
});

console.log('script para classes end');




function limparDados() {
    // Limpa o localStorage
    localStorage.removeItem('dadosVagas');
    localStorage.removeItem('vagas');
    localStorage.removeItem('tabelaVeiculos');

    // Limpa a tabela de veículos
    const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
    if (tabela) {
        tabela.innerHTML = '';
    }

    // Limpa o mapa (opcional, se quiser remover as vagas)
    const mapa = document.getElementById('mapa');
    if (mapa) {
        mapa.innerHTML = '';
    }

    // Atualiza o dashboard
    atualizarDashboard();
}

// Adiciona o manipulador de eventos ao botão com a classe 'btn-trash'
document.addEventListener('DOMContentLoaded', () => {
    const btnLimpar = document.getElementById('limpar');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', (event) => {
            event.preventDefault();
            limparDados();
        });
    } else {
        console.error('Elemento com a classe "btn-trash" não encontrado');
    }
});


function criarColunaAcoes() {
    const colunaAcoes = document.createElement('td');
    const btnCheckout = document.createElement('button');

    btnCheckout.textContent = 'Checkout';
    btnCheckout.classList.add('btn-checkout');
    btnCheckout.addEventListener('click', function () {
        realizarCheckout(this);
    });

    colunaAcoes.appendChild(btnCheckout);
    return colunaAcoes;
}




function realizarCheckout(botao) {
    const linha = botao.closest('tr');
    const celulas = linha.getElementsByTagName('td');

    const placa = celulas[0].textContent;
    const modelo = celulas[1].textContent;
    const cor = celulas[2].textContent;
    const tipo = celulas[3].textContent;
    const dataEntrada = celulas[4].textContent;
    const horaEntrada = celulas[5].textContent;
    const vaga = celulas[6].textContent;

    const dataSaida = new Date().toLocaleDateString('pt-BR');
    const horaSaida = new Date().toLocaleTimeString('pt-BR');

    // Cria uma instância de Checkout e calcula a tarifa
    const veiculo = new Veiculo(placa, modelo, cor, tipo);
    const checkin = new Checkin(veiculo, vaga, dataEntrada, horaEntrada);
    const checkout = new Checkout(checkin, dataSaida, horaSaida);

    const tarifa = checkout.calcularTarifa(5); // Supondo que o valor por hora seja 5

    alert(`Checkout realizado!\n\nPlaca: ${placa}\nModelo: ${modelo}\nCor: ${cor}\nTipo: ${tipo}\nVaga: ${vaga}\nTarifa: R$ ${tarifa.toFixed(2)}`);

    // Libera a vaga
    const vagaOcupada = vagas.find(v => v.id === vaga);
    if (vagaOcupada) {
        vagaOcupada.liberar();
    }

    // Remove o veículo da tabela
    linha.remove();

    // Atualiza o dashboard
    atualizarDashboard();

    adicionarAoHistorico(checkout);

    // Salva a tabela no localStorage
    salvarTabela();
}


// const botaoEnviar = document.getElementById('databe');
// botaoEnviar.addEventListener('click', ()=> {
//     enviarDadosParaSheetDB()
// });

function adicionarAoHistorico(checkout) {
    const tabelaHistorico = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];

    const novaLinha = tabelaHistorico.insertRow();

    novaLinha.insertCell().textContent = checkout.veiculo.placa;
    novaLinha.insertCell().textContent = checkout.veiculo.modelo;
    novaLinha.insertCell().textContent = checkout.veiculo.cor;
    novaLinha.insertCell().textContent = checkout.veiculo.tipo;
    novaLinha.insertCell().textContent = checkout.dataEntrada;
    novaLinha.insertCell().textContent = checkout.horaEntrada;
    novaLinha.insertCell().textContent = checkout.vaga;
    novaLinha.insertCell().textContent = checkout.dataSaida;
    novaLinha.insertCell().textContent = checkout.horaSaida;
    novaLinha.insertCell().textContent = checkout.calcularPermanencia();
    novaLinha.insertCell().textContent = checkout.calcularTarifa(5);
}



function enviarDadosParaSheetDB() {
    // Seleciona os dados da tabela de histórico (ajuste os seletores conforme sua estrutura HTML)
    const tabelaHistorico = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];
    const linhas = tabelaHistorico.getElementsByTagName('tr');

    // Cria um array para armazenar os dados a serem enviados
    const dadosParaEnvio = [];
    linhas.forEach(linha => {
        const celulas = linha.getElementsByTagName('td');
        const dadosLinha = {
            placa: celulas[0].textContent,
            modelo: celulas[1].textContent,
            cor: celulas[2].textContent,
            tipo: celulas[3].textContent,
            tipo: celulas[4].textContent,
            data: celulas[5].textContent,
            hora: celulas[6].textContent,
            vaga: celulas[7].textContent,
            dataSaida: celulas[8].textContent,
            horaSaida: celulas[9].textContent,
            permanencia: celulas[10].textContent,
            tarifa: celulas[11].textContent,

        };
        dadosParaEnvio.push(dadosLinha);
    });

    // Converte os dados para formato JSON
    const dadosJson = JSON.stringify(dadosParaEnvio);

    // URL da sua planilha SheetDB com a chave de API
    const url = 'https://sheetdb.io/api/v1/0gxpczb7i9b15'; // Substitua por seus valores

    // Faz a requisição POST para o SheetDB
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: dadosJson
    })
        .then(response => response.json())
        .then(data => {
            console.log('Dados enviados com sucesso:', data);
            // Adicione aqui qualquer ação após o envio dos dados (ex: mostrar mensagem de sucesso)
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            // Adicione aqui o tratamento de erros (ex: mostrar mensagem de erro ao usuário)
        });
}






// *************************************FUNCIONAL****************************************************************
// console.log('script para classes start');

// class Veiculo {
//     constructor(placa, modelo, cor, tipo) {
//         this.placa = placa;
//         this.modelo = modelo;
//         this.cor = cor;
//         this.tipo = tipo;
//     }
// }

// const vaga = '1H'

// class Checkin {
//     constructor(veiculo, vaga, dataEmtrada, HoraEntrada) {
//         this.veiculo = veiculo;
//         this.vaga = vaga;
//         this.dataEmtrada;
//         this.horaEntrada;
//     }
// }

// class Checkout extends Checkin {
//     constructor(checkin, dataSaida, horaSaida, tarifa) {
//         super(checkin.veiculo, checkin.vaga);
//         this.dataSaida = dataSaida;
//         this.horaSaida = horaSaida;
//         this.tarifa = tarifa;
//     }

//     calcularPermanencia() {
//         // Calcula a diferença entre as datas em milissegundos
//         const diferencaEmMilisegundos = new Date(this.dataSaida) - new Date(this.dataEntrada);
//         // Converte para horas e arredonda para cima
//         const horas = Math.ceil(diferencaEmMilisegundos / (1000 * 60 * 60));
//         return horas;
//     }

//     calcularTarifa(valorPorHora) {
//         const horas = this.calcularPermanencia();
//         return horas * valorPorHora;
//     }
// }

// class Vaga {
//     constructor(id, tipo, disp) {
//         this.id = id;
//         this.tipo = tipo;
//         this.disp = disp;
//     }
// }

// let vagas = [];

// function criarMapa() {
//     const vagasMotos = parseInt(document.getElementById("vagasMotos").value);
//     const vagasCarros = parseInt(document.getElementById("vagasCarros").value);
//     const vagasMicro = parseInt(document.getElementById("vagasMicro").value);
//     const mapa = document.getElementById("mapa");

//     mapa.innerHTML = "";

//     // Tipos de vagas e seus respectivos elementos HTML
//     const tiposVagas = [
//         { id: 'A', tipo: "moto", quantidade: vagasMotos, elemento: "div" },
//         { id: 'B', tipo: "carro", quantidade: vagasCarros, elemento: "div" },
//         { id: 'C', tipo: "micro", quantidade: vagasMicro, elemento: "div" },
//     ];

//     // Criar vetores para armazenar as vagas por tipo
//     const vetorVagasMotos = [];
//     const vetorVagasCarros = [];
//     const vetorVagasMicro = [];

//     var vagas = [];
//     let contadorVaga = 1;

//     tiposVagas.forEach((tipo) => {
//         const grupo = document.createElement("div");
//         grupo.classList.add("grupo-vagas", tipo.tipo);
//         grupo.textContent = `Vagas para ${tipo.tipo}`;

//         for (let i = 0; i < tipo.quantidade; i++) {
//             const novaVaga = new Vaga(contadorVaga + tipo.id, tipo.tipo, 'livre');

//             // Adicionar a vaga ao vetor correspondente
//             if (tipo.tipo === "moto") {
//                 vetorVagasMotos.push(novaVaga);
//             } else if (tipo.tipo === "carro") {
//                 vetorVagasCarros.push(novaVaga);
//             } else {
//                 vetorVagasMicro.push(novaVaga);
//             }
//             // Adicionar a vaga ao vetor correspondente

//             vagas.push(novaVaga);
//             contadorVaga++;

//             // Criar o elemento HTML para a vaga
//             const vagaElement = document.createElement(tipo.elemento);
//             vagaElement.classList.add("vaga");
//             vagaElement.textContent = novaVaga.id;
//             grupo.appendChild(vagaElement);

//         }
//         //adiciona os valores no dash
//         const infoMoto = document.getElementById('info-moto')
//         const infoCarro = document.getElementById('info-carro')
//         const infoMicro = document.getElementById('info-micro')

//         infoMoto.textContent = vagasMotos;
//         infoCarro.textContent = vagasCarros;
//         infoMicro.textContent = vagasMicro

//         let total = Number(vagasMotos) + Number(vagasCarros) + Number(vagasMicro);
//         console.log(vagasCarros);

//         let totalVagas = document.getElementById('total-vagas')
//         totalVagas.innerHTML = `Total de vagas: ${total}`;

//         let ocupadas = 0;
//         let vagasOcupadas = document.getElementById('vagas-ocupadas')
//         vagasOcupadas.innerHTML = `Vagas ocupadas: ${ocupadas}`;

//         let livres = total - ocupadas
//         let vagasLivres = document.getElementById('vagas-livres')
//         vagasLivres.innerHTML = `Vagas livres: ${livres}`;

//         let ocupacao = (ocupadas / total) * 100;
//         let tacxOcupacao = document.getElementById('taxaocupacao');
//         let painelTaxaOcupacao = document.getElementById('texto-ocupacao')
//         tacxOcupacao.innerHTML = `Taxa de ocupacao: ${ocupacao}%`;
//         painelTaxaOcupacao.textContent = `${ocupacao}%`

//         mapa.appendChild(grupo);

//     });
//     // Exibir os vetores no console

//     return {
//         vagas,
//         vagasMotos: vetorVagasMotos,
//         vagasCarros: vetorVagasCarros,
//         vagasMicro: vetorVagasMicro
//     };
// }



// // Função para salvar os dados no localStorage
// function salvarDados() {
//     const vagasMotos = parseInt(document.getElementById("vagasMotos").value);
//     const vagasCarros = parseInt(document.getElementById("vagasCarros").value);
//     const vagasMicro = parseInt(document.getElementById("vagasMicro").value);

//     // Criar um objeto com os dados
//     dadosVagas = {
//         vagasMotos,
//         vagasCarros,
//         vagasMicro
//     };

//     // Converter para JSON e salvar no localStorage
//     localStorage.setItem("dadosVagas", JSON.stringify(dadosVagas));
// }


// // Função para carregar os dados do localStorage
// function carregarDados() {
//     const dadosString = localStorage.getItem("dadosVagas");
//     if (dadosString) {
//         const dados = JSON.parse(dadosString);
//         document.getElementById("vagasMotos").value = dados.vagasMotos;
//         document.getElementById("vagasCarros").value = dados.vagasCarros;
//         document.getElementById("vagasMicro").value = dados.vagasMicro;

//         // Chamar a função criarMapa para gerar o mapa com os dados carregados
//         const todasAsVagas = criarMapa();
//     }
// }

// window.onload = carregarDados;

// document.getElementById("btnCriarMapa").addEventListener("click", () => {
//     criarMapa();
//     salvarDados();
// });



// // ===============================================================

// document.getElementById('btn-salvar').addEventListener('click', (event) => {
//     event.preventDefault(); // Impede o envio padrão do formulário

//     // Capturar os dados do formulário
//     const placa = document.getElementById('placa').value;
//     const modelo = document.getElementById('modelo').value;
//     const cor = document.getElementById('cor').value;

//     const tipo = document.getElementById('tipo').value;
//     console.log(tipo);

//     const dataAtual = new Date();
//     const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//     const dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
//     const horaFormatada = dataAtual.toLocaleTimeString('pt-BR');

//     const dataEntrada = dataFormatada
//     const horaEntrada = horaFormatada

//     // Array para armazenar os dados dos veículos
//     let dadosVeiculos = [];

//     // Criar um novo veículo
//     const novoVeiculo = new Veiculo(placa, modelo, cor, tipo);
//     console.log(novoVeiculo);

//     dadosVeiculos.push(novoVeiculo);

//     // Buscar uma vaga disponível
//     // try {

//     // Criar um novo check-in
//     const novoCheckin = new Checkin(novoVeiculo, vaga);

//     // Adicionar o check-in à tabela
//     const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
//     const novaLinha = tabela.insertRow();

//     const celulaPlaca = novaLinha.insertCell();
//     const celulaModelo = novaLinha.insertCell();
//     const celulaCor = novaLinha.insertCell();
//     const celulaTipo = novaLinha.insertCell();
//     const celulaData = novaLinha.insertCell();
//     const celulaHora = novaLinha.insertCell();
//     const celulVaga = novaLinha.insertCell();
//     const celulaAcoes = novaLinha.insertCell();


//     celulaPlaca.textContent = novoCheckin.veiculo.placa;
//     celulaModelo.textContent = novoCheckin.veiculo.modelo;
//     celulaCor.textContent = novoCheckin.veiculo.cor;
//     celulaTipo.textContent = novoCheckin.veiculo.tipo;
//     celulaData.textContent = dataEntrada;
//     celulaHora.textContent = horaEntrada;
//     celulVaga.textContent = novoCheckin.veiculo.vaga;

//     // Criar botão de checkout
//     const botaoCheckout = document.createElement('button');
//     botaoCheckout.textContent = 'Checkout';
//     botaoCheckout.classList.add('btn', 'btn-checkout');

//     // Adicionar evento de clique ao botão de checkout
//     botaoCheckout.addEventListener('click', () => {
//         const dataSaida = new Date().toLocaleDateString('pt-BR', options);
//         const horaSaida = new Date().toLocaleTimeString('pt-BR');
//         const tarifa = 10; // Valor por hora
//         const checkout = new Checkout(novoCheckin, dataSaida, horaSaida);
//         const valorFinal = checkout.calcularTarifa(tarifa);

//         alert(`Checkout realizado! Tarifa: R$${valorFinal.toFixed(2)}`);

//         // Remover linha da tabela após checkout
//         tabela.deleteRow(novaLinha.rowIndex);

//         // Atualizar vagas e dashboard
//         // Aqui você pode adicionar código para atualizar as vagas livres/ocupadas
//     });


//     celulaAcoes.appendChild(botaoCheckout);





//     salvarTabela();
// });

// function salvarTabela() {
//     const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
//     const linhas = tabela.getElementsByTagName('tr');
//     const dadosTabela = [];

//     for (let i = 0; i < linhas.length; i++) {
//         const celulas = linhas[i].getElementsByTagName('td');
//         const dadosVeiculo = {
//             placa: celulas[0].textContent,
//             modelo: celulas[1].textContent,
//             cor: celulas[2].textContent,
//             tipo: celulas[3].textContent,
//             dataEntrada: celulas[4].textContent,
//             horaEntrada: celulas[5].textContent,
//             vaga: celulas[6].textContent,
//             checkout: celulas[7].textContent
//         };
//         dadosTabela.push(dadosVeiculo);
//     }

//     localStorage.setItem('tabelaVeiculos', JSON.stringify(dadosTabela));
// }

// function carregarTabela() {
//     const dadosString = localStorage.getItem('tabelaVeiculos');
//     if (dadosString) {
//         const dadosTabela = JSON.parse(dadosString);
//         const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
//         tabela.innerHTML = ''; // Limpa a tabela antes de carregar os dados

//         dadosTabela.forEach(dadosVeiculo => {
//             const novaLinha = tabela.insertRow();

//             const celulaPlaca = novaLinha.insertCell();
//             const celulaModelo = novaLinha.insertCell();
//             const celulaCor = novaLinha.insertCell();
//             const celulaTipo = novaLinha.insertCell();
//             const celulaData = novaLinha.insertCell();
//             const celulaHora = novaLinha.insertCell();
//             const celulVaga = novaLinha.insertCell();
//             const celulaAcoes = novaLinha.insertCell();

//             celulaPlaca.textContent = dadosVeiculo.placa;
//             celulaModelo.textContent = dadosVeiculo.modelo;
//             celulaCor.textContent = dadosVeiculo.cor;
//             celulaTipo.textContent = dadosVeiculo.tipo;
//             celulaData.textContent = dadosVeiculo.dataEntrada;
//             celulaHora.textContent = dadosVeiculo.horaEntrada;
//             celulVaga.textContent = dadosVeiculo.vaga;
//         });
//     }
// }

// window.onload = function () {
//     carregarTabela();
// };


// document.querySelector("#tabelaVeiculos").addEventListener("click", function (event) {
//     if (event.target.classList.contains("btn-checkout")) {
//         const linha = event.target.closest("tr");

//         // Pegando os dados da linha
//         const dadosVeiculo = {
//             placa: linha.cells[0].textContent,
//             modelo: linha.cells[1].textContent,
//             cor: linha.cells[2].textContent,
//             tipo: linha.cells[3].textContent,
//             dataEntrada: linha.cells[4].textContent,
//             horaEntrada: linha.cells[5].textContent,
//             vaga: linha.cells[6].textContent
//         };

//         // Data e hora de saída
//         const dataSaida = new Date().toLocaleDateString('pt-BR');
//         const horaSaida = new Date().toLocaleTimeString('pt-BR');
//         const tarifaPorHora = 10; // Defina o valor por hora aqui

//         // Criar uma instância da classe Checkout
//         const veiculo = new Veiculo(dadosVeiculo.placa, dadosVeiculo.modelo, dadosVeiculo.cor, dadosVeiculo.tipo);
//         const checkin = new Checkin(veiculo, dadosVeiculo.vaga, dadosVeiculo.dataEntrada, dadosVeiculo.horaEntrada);
//         const checkout = new Checkout(checkin, dataSaida, horaSaida);

//         // Calcular tarifa
//         const valorFinal = checkout.calcularTarifa(tarifaPorHora);

//         // Adicionar ao histórico
//         const dadosHistorico = {
//             placa: dadosVeiculo.placa,
//             modelo: dadosVeiculo.modelo,
//             cor: dadosVeiculo.cor,
//             tipo: dadosVeiculo.tipo,
//             dataEntrada: dadosVeiculo.dataEntrada,
//             horaEntrada: dadosVeiculo.horaEntrada,
//             vaga: dadosVeiculo.vaga,
//             dataSaida: dataSaida,
//             horaSaida: horaSaida,
//             tarifa: `R$${valorFinal.toFixed(2)}`
//         };
//         adicionarAoHistorico(dadosHistorico);

//         // Remover a linha da tabela de veículos
//         linha.remove();
//     }
// });

// // Função para adicionar uma linha ao histórico
// function adicionarAoHistorico(dados) {
//     const tabelaHistorico = document.querySelector("#container-tab-historico tbody");
//     const novaLinha = document.createElement("tr");

//     Object.values(dados).forEach(valor => {
//         const coluna = document.createElement("td");
//         coluna.textContent = valor;
//         novaLinha.appendChild(coluna);
//     });

//     tabelaHistorico.appendChild(novaLinha);
// }



