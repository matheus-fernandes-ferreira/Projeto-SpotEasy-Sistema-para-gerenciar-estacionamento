// console.log('iniciou DB');

// btnSalvar = document.getElementById('btn-salvar')

// btnSalvar.addEventListener('click', () => {
//     const form = document.getElementById('formulario-veiculos');
//     const tabela = document.getElementById('tabelaVeiculos');
//     const tbody = tabela.querySelector('tbody');

//     // Obtendo os valores dos campos
//     const placa = document.getElementById('placa').value;
//     const modelo = document.getElementById('modelo').value;
//     const cor = document.getElementById('cor').value;
//     const tipo = document.getElementById('tipo').value;

//     // Obtendo a data e hora atuais
//     const dataAtual = new Date();
//     const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
//     const dataFormatada = dataAtual.toLocaleDateString('pt-BR', options);
//     const horaFormatada = dataAtual.toLocaleTimeString('pt-BR');
//     const vaga = '1f'

//     axios.post('https://sheetdb.io/api/v1/0gxpczb7i9b15', {
//         "data": {
//             "placa": placa,
//             "modelo": modelo,
//             "cor": cor,
//             "tipo": tipo,
//             "data_entrada": dataFormatada,
//             "hora_entrada": horaFormatada,
//             "vaga": vaga
//         }
//     })

//     console.log('ok');
// })






// // class Entrada {
// //     constructor(placa, modelo, cor, tipo, dataEntrada, horaEntrada, vaga, dataSaida, horaSaSaida, tempoPermanencia, tarifa) {
// //         this.placa = placa;
// //         this.modeo = modelo;
// //         this.cor = cor;
// //         this.tipo = tipo;
// //         this.dataEntrada = dataEmtrada;
// //         this.horaEntrada = horaEntrada;
// //         this.vaga = vaga;
// //         this.dataSaida = dataSaida;
// //         this.horaSaSaida = horaSaSaida;
// //         this.tempoPermanencia = tempoPermanencia;
// //         this.tarifa = tarifa;
// //     }
// // }
