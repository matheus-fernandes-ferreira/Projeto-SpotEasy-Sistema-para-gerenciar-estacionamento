// main.js

// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

let serverProcess; // Para manter a referência ao processo do servidor

// Obtém o diretório atual do arquivo usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'src/public/index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// Função para iniciar o servidor Node.js
const startServer = () => {
  console.log('Iniciando o servidor...');

  serverProcess = exec('node server.js', {
    cwd: path.resolve(), // Define o diretório de trabalho para o servidor
  });

  // Monitora a saída do servidor
  serverProcess.stdout.on('data', (data) => {
    console.log(`[Servidor] ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`[Erro no Servidor] ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Servidor finalizado com código: ${code}`);
  });
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
    if (serverProcess) {
      console.log('Finalizando o servidor...');
      serverProcess.kill(); // Finaliza o processo do servidor
    }
    app.quit();
  }
});

// Você pode incluir o restante do código específico do processo principal aqui.
