// main.js

// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

// Variável para manter a referência ao processo do servidor
let serverProcess;

// Obtém o diretório atual do arquivo usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para criar a janela principal do Electron
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Carrega o arquivo HTML da aplicação
  mainWindow.loadFile(path.join(__dirname, 'src/public/index.html'));

  // Caso deseje abrir as ferramentas de desenvolvedor (comentado por padrão)
  // mainWindow.webContents.openDevTools();
};

// Função para iniciar o servidor Node.js
const startServer = () => {
  console.log('Iniciando o servidor...');

  // Executa o processo do servidor
  serverProcess = spawn('node', ['server.js'], {
    cwd: path.resolve(), // Define o diretório de trabalho para o servidor
    stdio: 'inherit', // Herda os streams da aplicação principal
  });

  // Escuta eventos de saída ou erros do servidor
  serverProcess.on('exit', (code, signal) => {
    console.log(`Servidor finalizado com código: ${code}, sinal: ${signal}`);
  });

  serverProcess.on('error', (err) => {
    console.error(`Erro no servidor: ${err}`);
  });
};

// Função para encerrar o servidor Node.js
const stopServer = () => {
  if (serverProcess && !serverProcess.killed) {
    console.log('Finalizando o servidor...');
    serverProcess.kill('SIGTERM'); // Envia sinal para finalizar o servidor de forma controlada
  }
};

// Este método será chamado quando o Electron finalizar a inicialização
// e estiver pronto para criar janelas.
app.whenReady().then(() => {
  startServer(); // Inicia o servidor
  createWindow(); // Cria a janela principal

  app.on('activate', () => {
    // No macOS, recria a janela se o ícone do app for clicado e não houver outras janelas abertas
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Finaliza o servidor quando todas as janelas são fechadas, exceto no macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopServer(); // Encerra o servidor
    app.quit(); // Encerra a aplicação Electron
  }
});

// Garante que o servidor seja finalizado antes de sair
app.on('before-quit', () => {
  stopServer();
});
