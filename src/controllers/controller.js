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

    // Enviar os dados para o servidor
    const response = await fetch('http://localhost:3005/veiculos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            placa, modelo, cor, tipo, numeroVaga
        })
    });

    const data = await response.json();
    console.log(data);
    
    if (data.success) {
        alert('Veículo cadastrado com sucesso!');
        
        //Limpar o formulário após o cadastro
        document.getElementById("formulario-veiculos").reset();
    } else {
        alert('Erro ao cadastrar o veículo.');
    }
});