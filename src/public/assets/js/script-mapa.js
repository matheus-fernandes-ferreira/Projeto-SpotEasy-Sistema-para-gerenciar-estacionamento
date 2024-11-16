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

// function salvarTabela() {
//     const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
//     const linhas = tabela.getElementsByTagName('tr');
//     const dadosTabela = Array.from(linhas).map(linha => {
//         const celulas = linha.getElementsByTagName('td');
//         return {
//             placa: celulas[0].textContent,
//             modelo: celulas[1].textContent,
//             cor: celulas[2].textContent,
//             tipo: celulas[3].textContent,
//             dataEntrada: celulas[4].textContent,
//             horaEntrada: celulas[5].textContent,
//             vaga: celulas[6].textContent
//         };
//     });

//     localStorage.setItem('tabelaVeiculos', JSON.stringify(dadosTabela));
// }

// function carregarTabela() {
//     const dadosString = localStorage.getItem('tabelaVeiculos');
//     if (dadosString) {
//         const dadosTabela = JSON.parse(dadosString);
//         const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
//         tabela.innerHTML = '';

//         dadosTabela.forEach(dadosVeiculo => {
//             const novaLinha = tabela.insertRow();

//             novaLinha.insertCell().textContent = dadosVeiculo.placa;
//             novaLinha.insertCell().textContent = dadosVeiculo.modelo;
//             novaLinha.insertCell().textContent = dadosVeiculo.cor;
//             novaLinha.insertCell().textContent = dadosVeiculo.tipo;
//             novaLinha.insertCell().textContent = dadosVeiculo.dataEntrada;
//             novaLinha.insertCell().textContent = dadosVeiculo.horaEntrada;
//             novaLinha.insertCell().textContent = dadosVeiculo.vaga;

//             // Adiciona a coluna de ações
//             novaLinha.appendChild(criarColunaAcoes());
//         });
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     carregarDados();
//     carregarTabela();
//     atualizarDashboard();

//     const btnSalvar = document.getElementById('btn-salvar');
//     const btnCriarMapa = document.getElementById('btn-criarMapa');

//     if (btnSalvar) {
//         btnSalvar.addEventListener('click', (event) => {
//             event.preventDefault();

//             const placa = document.getElementById('placa').value;
//             const modelo = document.getElementById('modelo').value;
//             const cor = document.getElementById('cor').value;
//             const tipo = document.getElementById('tipo').value;

//             const dataAtual = new Date();
//             const dataEntrada = dataAtual.toLocaleDateString('pt-BR');
//             const horaEntrada = dataAtual.toLocaleTimeString('pt-BR');

//             const novaVaga = encontrarVagaDisponivel(tipo);

//             if (!novaVaga) {
//                 alert("Nenhuma vaga disponível para este tipo de veículo.");
//                 return;
//             }

//             novaVaga.ocupar();

//             const novoVeiculo = new Veiculo(placa, modelo, cor, tipo);
//             const novoCheckin = new Checkin(novoVeiculo, novaVaga.id, dataEntrada, horaEntrada);

//             const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
//             const novaLinha = tabela.insertRow();

//             novaLinha.insertCell().textContent = novoCheckin.veiculo.placa;
//             novaLinha.insertCell().textContent = novoCheckin.veiculo.modelo;
//             novaLinha.insertCell().textContent = novoCheckin.veiculo.cor;
//             novaLinha.insertCell().textContent = novoCheckin.veiculo.tipo;
//             novaLinha.insertCell().textContent = novoCheckin.dataEntrada;
//             novaLinha.insertCell().textContent = novoCheckin.horaEntrada;
//             novaLinha.insertCell().textContent = novoCheckin.vaga;

//             // Adiciona a coluna de ações
//             novaLinha.appendChild(criarColunaAcoes());

//             // Atualiza o dashboard
//             atualizarDashboard();

//             // Salva a tabela no localStorage
//             salvarTabela();
//         });
//     } else {
//         console.error('Elemento com id "btn-salvar" não encontrado');
//     }

//     if (btnCriarMapa) {
//         btnCriarMapa.addEventListener('click', (event) => {
//             event.preventDefault();
//             criarMapa(); // Cria o mapa e salva os dados
//         });
//     } else {
//         console.error('Elemento com id "btn-criarMapa" não encontrado');
//     }
// });

// console.log('script para classes end');




// function limparDados() {
//     // Limpa o localStorage
//     localStorage.removeItem('dadosVagas');
//     localStorage.removeItem('vagas');
//     localStorage.removeItem('tabelaVeiculos');

//     // Limpa a tabela de veículos
//     const tabela = document.getElementById('tabelaVeiculos').getElementsByTagName('tbody')[0];
//     if (tabela) {
//         tabela.innerHTML = '';
//     }

//     // Limpa o mapa (opcional, se quiser remover as vagas)
//     const mapa = document.getElementById('mapa');
//     if (mapa) {
//         mapa.innerHTML = '';
//     }

//     // Atualiza o dashboard
//     atualizarDashboard();
// }

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




// function realizarCheckout(botao) {
//     const linha = botao.closest('tr');
//     const celulas = linha.getElementsByTagName('td');

//     const placa = celulas[0].textContent;
//     const modelo = celulas[1].textContent;
//     const cor = celulas[2].textContent;
//     const tipo = celulas[3].textContent;
//     const dataEntrada = celulas[4].textContent;
//     const horaEntrada = celulas[5].textContent;
//     const vaga = celulas[6].textContent;

//     const dataSaida = new Date().toLocaleDateString('pt-BR');
//     const horaSaida = new Date().toLocaleTimeString('pt-BR');

//     // Cria uma instância de Checkout e calcula a tarifa
//     const veiculo = new Veiculo(placa, modelo, cor, tipo);
//     const checkin = new Checkin(veiculo, vaga, dataEntrada, horaEntrada);
//     const checkout = new Checkout(checkin, dataSaida, horaSaida);

//     const tarifa = checkout.calcularTarifa(5); // Supondo que o valor por hora seja 5

//     alert(`Checkout realizado!\n\nPlaca: ${placa}\nModelo: ${modelo}\nCor: ${cor}\nTipo: ${tipo}\nVaga: ${vaga}\nTarifa: R$ ${tarifa.toFixed(2)}`);

//     // Libera a vaga
//     const vagaOcupada = vagas.find(v => v.id === vaga);
//     if (vagaOcupada) {
//         vagaOcupada.liberar();
//     }

//     // Remove o veículo da tabela
//     linha.remove();

//     // Atualiza o dashboard
//     atualizarDashboard();

//     adicionarAoHistorico(checkout);

//     // Salva a tabela no localStorage
//     salvarTabela();
// }


// const botaoEnviar = document.getElementById('databe');
// botaoEnviar.addEventListener('click', ()=> {
//     enviarDadosParaSheetDB()
// });

// function adicionarAoHistorico(checkout) {
//     const tabelaHistorico = document.getElementById('tabela-historico').getElementsByTagName('tbody')[0];

//     const novaLinha = tabelaHistorico.insertRow();

//     novaLinha.insertCell().textContent = checkout.veiculo.placa;
//     novaLinha.insertCell().textContent = checkout.veiculo.modelo;
//     novaLinha.insertCell().textContent = checkout.veiculo.cor;
//     novaLinha.insertCell().textContent = checkout.veiculo.tipo;
//     novaLinha.insertCell().textContent = checkout.dataEntrada;
//     novaLinha.insertCell().textContent = checkout.horaEntrada;
//     novaLinha.insertCell().textContent = checkout.vaga;
//     novaLinha.insertCell().textContent = checkout.dataSaida;
//     novaLinha.insertCell().textContent = checkout.horaSaida;
//     novaLinha.insertCell().textContent = checkout.calcularPermanencia();
//     novaLinha.insertCell().textContent = checkout.calcularTarifa(5);
// }







