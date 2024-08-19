// const { dialog, app } = require('electron');
// const fs = require('fs');


function exportarParaCSV() {
    const tabela = document.getElementById('tabelaVeiculos');
    const linhas = tabela.querySelectorAll('tr');
    let csvContent = "";

    // Adicionar a linha de cabeçalho (opcional)
    linhas[0].querySelectorAll('th').forEach(th => {
        csvContent += th.textContent + ",";
    });
    csvContent = csvContent.slice(0, -1) + "\n";

    // Adicionar as linhas de dados
    linhas.forEach((linha, index) => {
        if (index > 0) { // Ignorar a primeira linha (cabeçalho)
            let linhaCSV = "";
            linha.querySelectorAll('td').forEach(td => {
                linhaCSV += `"${td.textContent.replace(/"/g, '""')}",`; // Escapar aspas duplas
            });
            csvContent += linhaCSV.slice(0, -1) + "\n";
        }
    });

    // Criar um link para download
    const link = document.createElement('a');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download
        = 'dados_veiculos.csv';
    link.click();
    URL.revokeObjectURL(url);

//========================funcionar para electron
    // // Obter o diretório de documentos do usuário
    // const documentos = app.getPath('documents');

    // // Mostrar um diálogo para o usuário escolher o nome do arquivo
    // dialog.showSaveDialog({
    //     defaultPath: path.join(documentos, 'dados_veiculos.csv'),
    //     filters: [{ name: 'CSV', extensions: ['csv'] }]
    // }).then(result => {
    //     if (result.canceled) return;

    //     const filePath = result.filePath;

    //     fs.writeFile(filePath, csvContent, (err) => {
    //         if (err) {
    //             console.error('Erro ao salvar o arquivo:', err);
    //         } else {
    //             console.log('Arquivo CSV salvo com sucesso!');
    //         }
    //     });
    // });
}

  

// Adicionar um event listener ao botão de exportar
const btnExportar = document.getElementById('exportar-csv');
btnExportar.addEventListener('click', exportarParaCSV);