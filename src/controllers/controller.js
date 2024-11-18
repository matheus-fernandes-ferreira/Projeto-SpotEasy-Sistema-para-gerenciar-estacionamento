document.addEventListener("DOMContentLoaded", async () => {
    // URLs da API
    const apiUrl = 'http://localhost:3005/veiculos';
    const estacionamentoUrl = 'http://localhost:3005/estacionamento/configuracao';

    // Função para carregar os veículos
    try {
        const response = await axios.get(apiUrl);
        const veiculos = response.data;
        const veiculosContainer = document.getElementById('veiculos');
        veiculosContainer.className = 'veiculos-container';

        // Gera o conteúdo HTML dinâmico dos veículos
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

    // Função para carregar as configurações do estacionamento
    const loadConfigurations = async () => {
        try {
            const response = await axios.get(estacionamentoUrl);

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
                    // Caso não haja dados configurados
                    document.getElementById("total-vagas").textContent = "";
                    document.getElementById("vagas-livres").textContent = "";
                    document.getElementById("vagas-ocupadas").textContent = "";
                    document.getElementById("taxaocupacao").textContent = "";
                }
            } else {
                alert("Nenhuma configuração encontrada.");
            }
        } catch (error) {
            console.error("Erro ao carregar configurações:", error);
            alert("Erro ao carregar configurações. Tente novamente mais tarde.");
        }
    };

    // Carregar as configurações ao iniciar
    loadConfigurations();

    // Função para salvar configurações
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
        const configuracaoPayload = {
            totalVagas,
            vagasLivres: totalVagas,  // Inicialmente todas as vagas são livres
            vagasOcupadas: 0,         // Nenhuma vaga ocupada ainda
            vagasMotos,
            vagasCarros,
            vagasMicro
        };

        // Enviar as configurações para a API
        try {
            const response = await axios.post(estacionamentoUrl, configuracaoPayload);
            if (response.status === 201) {
                alert('Configurações do estacionamento salvas com sucesso!');
                loadConfigurations(); // Atualiza as configurações exibidas
            } else {
                alert('Erro ao salvar configurações.');
            }
        } catch (error) {
            console.error("Erro ao salvar configurações:", error);
            alert("Erro ao salvar configurações. Tente novamente mais tarde.");
        }
    });

    // Função para excluir configurações
    document.getElementById("btn-excluirConfiguracoes").addEventListener("click", async () => {
        try {
            const response = await axios.delete(estacionamentoUrl);
            if (response.status === 200) {
                alert('Configurações excluídas com sucesso!');
                loadConfigurations(); // Atualiza as configurações exibidas
            } else {
                alert('Erro ao excluir configurações.');
            }
        } catch (error) {
            console.error("Erro ao excluir configurações:", error);
            alert("Erro ao excluir configurações. Tente novamente mais tarde.");
        }
    });

    // Função para criar vagas (simples exemplo de criação de mapa de vagas)
    document.getElementById("btn-criarMapa").addEventListener("click", () => {
        alert("Mapa de vagas ainda não implementado.");
    });

    // ************************** CHECK-IN & CADASTRO *************************************
    document.getElementById("btn-salvar").addEventListener("click", async (event) => {
        event.preventDefault();

        // Obtendo os valores dos campos do formulário
        const placa = document.getElementById("placa").value;
        const modelo = document.getElementById("modelo").value;
        const cor = document.getElementById("cor").value;
        const tipo = document.getElementById("tipo").value;

        // O número da vaga será sempre 1 (pode ser ajustado conforme a lógica do seu sistema)
        const numeroVaga = 1;

        // Captura a data e hora atuais
        const dataEntrada = new Date().toISOString(); // data no formato ISO 8601
        const horaEntrada = new Date().toLocaleTimeString(); // hora no formato HH:MM:SS

        // Validando os campos
        if (!placa || !modelo || !cor || !tipo) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Enviar os dados para cadastrar o veículo
        try {
            const responseVeiculo = await axios.post('http://localhost:3005/veiculos', {
                placa, modelo, cor, tipo
            });

            if (responseVeiculo.status === 201) {
                // Após cadastrar o veículo, registrar a entrada no check-in
                const responseCheckin = await axios.post('http://localhost:3005/checkins', {
                    placa,
                    numeroVaga,
                    dataEntrada,
                    horaEntrada,
                    status: 'ocupado'
                });

                if (responseCheckin.status === 201) {
                    alert('Veículo cadastrado e check-in realizado com sucesso!');
                    loadConfigurations(); // Atualiza as configurações exibidas
                } else {
                    alert('Erro ao registrar o check-in do veículo.');
                }
            } else {
                alert('Erro ao cadastrar o veículo.');
            }
        } catch (error) {
            console.error("Erro ao salvar veículo ou realizar o check-in:", error);
            alert("Erro ao salvar veículo ou realizar o check-in. Tente novamente mais tarde.");
        }
    });
});



//====================== T A B E L A ======================

// Função para carregar os dados dos veículos na tabela
document.addEventListener("DOMContentLoaded", async () => {
    const apiUrl = 'http://localhost:3005/veiculos';  // Ajuste para a URL correta do backend

    // Função para carregar os veículos na tabela
    async function carregarVeiculos() {
        try {
            // Requisição à API para obter os veículos
            const resposta = await axios.get(apiUrl);
            const veiculos = resposta.data;

            // Obtendo a referência da tabela
            const tabelaVeiculos = document.getElementById('tabelaVeiculos');
            tabelaVeiculos.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

            // Adicionando a linha de cabeçalho (se necessário)
            const cabecalho = document.createElement('tr');
            cabecalho.innerHTML = `
                
                <th>Placa</th>
                <th>Modelo</th>
                <th>Cor</th>
                <th>Tipo</th>
                <th>Ações</th>
            `;
            tabelaVeiculos.appendChild(cabecalho);

            // Adicionando os dados dos veículos
            veiculos.forEach(veiculo => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    
                    <td>${veiculo.placa}</td>
                    <td>${veiculo.modelo}</td>
                    <td>${veiculo.cor}</td>
                    <td>${veiculo.tipo}</td>
                    <td>
                        <button onclick="editarVeiculo(${veiculo.id})">Editar</button>
                        <button onclick="deletarVeiculo(${veiculo.id})">Deletar</button>
                    </td>
                `;
                tabelaVeiculos.appendChild(linha);
            });
        } catch (error) {
            console.error('Erro ao carregar os veículos:', error);
        }
    }

    // Função para editar um veículo (exemplo simples, você pode expandir conforme necessário)
    function editarVeiculo(id) {
        alert(`Editar veículo com ID: ${id}`);
        // Aqui você pode adicionar lógica para abrir um formulário de edição ou redirecionar para outra página
    }

    // Função para deletar um veículo
    async function deletarVeiculo(id) {
        try {
            await axios.delete(`http://localhost:3005/veiculos/${id}`);  // Ajuste a URL conforme necessário
            alert(`Veículo com ID: ${id} foi deletado`);
            carregarVeiculos(); // Recarrega os dados após a exclusão
        } catch (error) {
            console.error('Erro ao deletar o veículo:', error);
            alert('Erro ao tentar deletar o veículo');
        }
    }

    // Chama a função para carregar os veículos quando a página for carregada
    carregarVeiculos();
});