document.addEventListener("DOMContentLoaded", async () => {
    try {
        // URL da API 
        const apiUrl = 'http://localhost:3005/veiculos';

        // Faz a solicitação para obter os dados
        const response = await axios.get(apiUrl);

        // Obtém a lista de veículos
        const veiculos = response.data;

        // Seleciona o elemento onde os veículos serão exibidos
        const veiculosContainer = document.getElementById('veiculos');
        veiculosContainer.className = 'veiculos-container'; // Adiciona uma classe para estilos

        // Gera o conteúdo HTML dinâmico
        veiculos.forEach(veiculo => {
            const veiculoCard = document.createElement('div');
            veiculoCard.className = 'veiculo-card';

            veiculoCard.innerHTML = `
                <h3 class="veiculo-titulo">${veiculo.modelo} <span>(${veiculo.placa})</span></h3>
                <p><strong>Cor:</strong> ${veiculo.cor}</p>
                <p><strong>Tipo:</strong> ${veiculo.tipo}</p>
            `;

            veiculosContainer.appendChild(veiculoCard);
        });
    } catch (error) {
        console.error("Erro ao buscar os veículos:", error);
    }
});



// *********************** CONFIGURAÇÕES DO ESTACIONAMENTO ********************************

//Criando os dados  das configurações digitadas pelo usuario
document.addEventListener("DOMContentLoaded", async () => {
    // Função para carregar as configurações do estacionamento
    const loadConfigurations = async () => {
        try {
            const response = await axios.get("http://localhost:3005/estacionamento/configuracao");

            if (response.status === 200 && response.data) {
                const data = response.data;

                // Verifica se as informações estão presentes
                if (data.totalVagas && data.vagasLivres !== undefined && data.vagasOcupadas !== undefined) {
                    // Preenchendo as labels com os dados obtidos
                    document.getElementById("total-vagas").textContent = `Total de Vagas: ${data.totalVagas}`;
                    document.getElementById("vagas-livres").textContent = `Vagas Livres: ${data.vagasLivres}`;
                    document.getElementById("vagas-ocupadas").textContent = `Vagas Ocupadas: ${data.vagasOcupadas}`;
                    document.getElementById("taxaocupacao").textContent = `Taxa de Ocupação: ${(data.vagasOcupadas / data.totalVagas * 100).toFixed(2)}%`;
                } else {
                    // Caso não haja dados configurados, esconde as labels ou deixa vazias
                    document.getElementById("total-vagas").textContent = "";
                    document.getElementById("vagas-livres").textContent = "";
                    document.getElementById("vagas-ocupadas").textContent = "";
                    document.getElementById("taxaocupacao").textContent = "";
                }
            } else {
                // Caso o status da resposta não seja 200 ou a resposta seja vazia
                alert("Nenhuma configuração encontrada.");
            }
        } catch (error) {
            console.error("Erro ao carregar configurações:", error);
            alert("Erro ao carregar configurações. Tente novamente mais tarde.");
        }
    };

    // Carregar as configurações ao iniciar
    loadConfigurations();

    // Configuração do evento de clique no botão de salvar
    document.getElementById("btn-salvarConfiguracoes").addEventListener("click", async (event) => {
        event.preventDefault();

        // Capturando os valores dos campos
        const vagasMotos = parseInt(document.getElementById("vagasMotos").value) || 0;
        const vagasCarros = parseInt(document.getElementById("vagasCarros").value) || 0;
        const vagasMicro = parseInt(document.getElementById("vagasMicro").value) || 0;

        // Validando os dados
        if (vagasMotos < 0 || vagasCarros < 0 || vagasMicro < 0) {
            alert("Verifique os valores inseridos.");
            return;
        }

        const totalVagas = vagasMotos + vagasCarros + vagasMicro;
        if (totalVagas < 1) {
            alert("O número total de vagas deve ser maior que 0.");
            return;
        }

        // Criando o payload para envio
        const payload = {
            totalVagas,
            vagasPorTipo: {
                motos: vagasMotos,
                carros: vagasCarros,
                micro: vagasMicro,
            },
        };

        try {
            const response = await axios.post("http://localhost:3005/estacionamento/configuracao", payload);

            // Verificando a resposta do backend
            if (response.status === 201) {
                alert("Configurações salvas com sucesso!");
                // Após salvar, recarrega as configurações
                loadConfigurations();
            } else {
                throw new Error("Erro ao salvar as configurações.");
            }
        } catch (error) {
            console.error("Erro ao salvar configurações:", error);
            alert("Erro ao salvar configurações. Tente novamente mais tarde.");
        }
    });
});


//Excluindo os dados das configuracoes
document.addEventListener("DOMContentLoaded", () => {
    // Adicionando evento de clique no botão "btn-excluirConfiguracoes"
    document.getElementById("btn-excluirConfiguracoes").addEventListener("click", async (event) => {
        // Prevenir comportamento padrão do botão
        event.preventDefault();

        // Obter o ID do estacionamento que será excluído (por exemplo, de um campo de input ou um atributo de dados)
        const estacionamentoId = '673a120612d00057c4a35b7d'

        if (!estacionamentoId) {
            alert("ID do estacionamento não fornecido.");
            return;
        }

        try {
            // Fazendo a requisição DELETE para o backend
            const response = await axios.delete(`http://localhost:3005/estacionamento/configuracao/${estacionamentoId}`);

            if (response.status === 200) {
                alert("Configurações do estacionamento excluídas com sucesso!");
                // Aqui você pode adicionar lógica para atualizar a página ou limpar os campos
            } else {
                throw new Error("Erro ao excluir configurações.");
            }
        } catch (error) {
            console.error("Erro ao excluir configurações:", error);
            alert("Erro ao excluir as configurações. Tente novamente mais tarde.");
        }
    });
});

// **************************VAGAS*****************************

document.getElementById('btn-criarMapa').addEventListener('click', async function() {
    try {
        // Enviar a requisição para o back-end para criar as vagas
        const response = await axios.post('http://localhost:3005/criarVagas', {
            estacionamentoId: '673b85eb195146f4c1b74043' // Passe o ID do estacionamento aqui
        });

        // Exibir a resposta do back-end
        console.log('Vagas criadas:', response.data);
        alert('Vagas criadas com sucesso!');
    } catch (error) {
        console.error('Erro ao criar vagas:', error);
        alert('Erro ao criar vagas.');
    }
});

// *******************************************************


document.getElementById("btn-salvar").addEventListener("click", async (event) => {
    // Prevenir o comportamento padrão do botão, caso necessário
    event.preventDefault();

    // Obtendo os valores dos campos do formulário
    const placa = document.getElementById("placa").value;
    const modelo = document.getElementById("modelo").value;
    const cor = document.getElementById("cor").value;
    const tipo = document.getElementById("tipo").value;

    // O número da vaga será sempre 1
    const numeroVaga = 1;

    // Captura a data e hora atuais
    const dataEntrada = new Date().toISOString(); // data no formato ISO 8601
    const horaEntrada = new Date().toLocaleTimeString(); // hora no formato HH:MM:SS

    // Enviar os dados para cadastrar o veículo
    const responseVeiculo = await fetch('http://localhost:3005/veiculos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            placa, modelo, cor, tipo
        })
    });


});
