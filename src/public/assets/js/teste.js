// //============FUNÇÃO PARA CRIAR E PREENCHER A TABELA DE REGISTROS

// // Selecionando os elementos
// const formulario = document.getElementById('formulario-veiculos');
// const tabela = document.getElementById('tabelaVeiculos');
// const btnSalvar = document.getElementById('btn-salvar');

// btnSalvar.addEventListener('click', (event) => {
//     event.preventDefault(); // Impede o envio padrão do formulário


//     // Função para adicionar uma nova linha à tabela
//     function adicionarLinha(placa, modelo, cor, tipo, data, hora, vaga) {
//         const novaLinha = tabela.insertRow();
//         // Obtendo os valores dos campos
//         const placa = document.getElementById('placa').value;
//         const modelo = document.getElementById('modelo').value;
//         const cor = document.getElementById('cor').value;
//         const tipo = document.getElementById('tipo').value;

//         // Adicionando a nova linha à tabela
//         adicionarLinha(placa, modelo, cor, tipo), vaga;

//         // Limpando os campos do formulário (opcional)
//         formulario.reset();
//     });


















// //============FUNÇÃO PARA NAVEGAR ENTRE AS "PAGINAS"
// // Selecionar todos os itens do menu e as seções
// const menuItems = document.querySelectorAll('.nav-group-item');
// const sections = document.querySelectorAll('.main-content');

// // Função para mostrar a seção correspondente e esconder as outras
// function showSection(sectionId) {
//     sections.forEach(section => {

//         section.style.display = 'none';
//     });

//     const selectedSection = document.getElementById(sectionId);
//     selectedSection.style.display = 'block';
// }

// // Adicionar um evento de clique a cada item do menu
// menuItems.forEach(item => {
//     item.addEventListener('click', () => {

//         const sectionId = item.id.replace('nav-', ''); // Remover o prefixo "nav-" do ID

//         showSection(sectionId);
//     });
// });
// //============FIM FUNÇÃO PARA NAVEGAR ENTRE AS "PAGINAS"