// onst pool = require('../config/connectionBD');
const path = require('path');

// Rota para a página cadastrar entrada de veiculo
const rotaCheckin = (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
};

// Registrar o checkin de um veiculo

async function checkin(req, res) {
    const {placa, modelo, cor, tipo, data, hora  } = req.body;

    if (!placa) {
        return res.status(400).json({ error: 'O campo título é obrigatório.' });
    }

    if (!modelo) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
    }
    if (!cor) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
    }
    if (!tipo) {
        return res.status(400).json({ error: 'O campo descrição é obrigatório.' });
    }
    
    try {
        const resultado = await pool.query(
            'INSERT INTO veiculo (placa, modelo, cor, tipo, data, hora) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [placa, modelo, cor, tipo, data, hora]
        );

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao salvar checkin' });
    }
}






module.exports = {
    rotaCheckin,
    checkin
}