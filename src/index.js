const express = require('express');
const rotas = require('./routes/rotas');
const path = require('path');
const app = express();

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.json());

// Usar as rotas do formulário
// app.use('/', orientacoesRoutes);

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Servidor: http://localhost:3000/');
});


