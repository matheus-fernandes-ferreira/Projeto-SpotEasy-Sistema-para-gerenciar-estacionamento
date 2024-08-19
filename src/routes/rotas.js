const express = require('express');

const { rotaCheckin, checkin}  = require('../controllers/controller');

// const { rotaCadastrarOrientacoes, rotaListarOrientacoes, rotaParaSucesso, cadastrarOrientacao, listarOrientacoes, listarOrientacao, deletarOrientacao } = require('../controllers/orientacoesController');

const router = express.Router();



// Rota para páginas HTML
router.get('/checkin', rotaCheckin);
router.post('/checkin', checkin);


// router.get('/listar-orientacoes', rotaListarOrientacoes);
// router.get('/sucesso', rotaParaSucesso);

// // Rota para submissão do formulário com upload de arquivo
// router.post('/submit', upload.single('imagem'), cadastrarOrientacao);

// // Rotas para operações CRUD de 'orientacoes'
// router.get('/orientacoes/', listarOrientacoes);
// router.get('/orientacao/:id', listarOrientacao);
// router.delete('/orientacao/:id', deletarOrientacao);

// module.exports = router;
