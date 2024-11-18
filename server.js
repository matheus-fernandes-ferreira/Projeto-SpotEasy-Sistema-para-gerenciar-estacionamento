import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// ===================== VEÍCULO =====================

// Criar veículo
app.post('/veiculos', async (req, res) => {
    try {
        const veiculo = await prisma.veiculo.create({
            data: {
                placa: req.body.placa,
                modelo: req.body.modelo,
                cor: req.body.cor,
                tipo: req.body.tipo,
            },
        });
        res.status(201).json(veiculo);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar veículo.' });
    }
});

// Listar veículos
app.get('/veiculos', async (req, res) => {
    try {
        const veiculos = await prisma.veiculo.findMany({
            include: { checkins: true }, // Inclui os check-ins se necessário
        });
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao listar veículos.' });
    }
});

// Atualizar veículo
app.put('/veiculos/:id', async (req, res) => {
    try {
        const veiculo = await prisma.veiculo.update({
            where: { id: req.params.id },
            data: {
                placa: req.body.placa,
                modelo: req.body.modelo,
                cor: req.body.cor,
                tipo: req.body.tipo,
            },
        });
        res.status(200).json(veiculo);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar veículo.' });
    }
});

// Deletar veículo
app.delete('/veiculos/:id', async (req, res) => {
    try {
        await prisma.veiculo.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: 'Veículo deletado com sucesso.' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao deletar veículo.' });
    }
});

// ===================== ESTACIONAMENTO =====================

// Criar estacionamento
app.post('/estacionamento/configuracao', async (req, res) => {
    try {
        const estacionamento = await prisma.estacionamento.create({
            data: {
                totalVagas: req.body.totalVagas,
                vagasPorTipo: req.body.vagasPorTipo,
            },
        });
        res.status(201).json(estacionamento);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao salvar configurações do estacionamento.' });
    }
});

// Listar estacionamentos
app.get('/estacionamento/configuracao', async (req, res) => {
    try {
        const estacionamentos = await prisma.estacionamento.findMany();
        res.status(200).json(estacionamentos);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao listar estacionamentos.' });
    }
});

// Atualizar estacionamento
app.put('/estacionamento/configuracao/:id', async (req, res) => {
    try {
        const estacionamento = await prisma.estacionamento.update({
            where: { id: req.params.id },
            data: {
                totalVagas: req.body.totalVagas,
                vagasPorTipo: req.body.vagasPorTipo,
            },
        });
        res.status(200).json(estacionamento);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar configurações do estacionamento.' });
    }
});

// Deletar estacionamento
app.delete('/estacionamento/configuracao/:id', async (req, res) => {
    try {
        const estacionamento = await prisma.estacionamento.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: 'Estacionamento deletado com sucesso.' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao deletar estacionamento.' });
    }
});

// ===================== VAGA =====================

// Endpoint para criar as vagas no banco de dados
app.post('/criarVagas', async (req, res) => {
    try {
        // Buscar o estacionamento
        const estacionamento = await prisma.estacionamento.findUnique({
            where: { id: req.body.estacionamentoId },
        });

        if (!estacionamento) {
            return res.status(404).json({ error: 'Estacionamento não encontrado.' });
        }

        const vagasPorTipo = estacionamento.vagasPorTipo;

        // Criação das vagas
        let numeroVaga = 1;
        let vagasCriadas = [];

        // Gerar vagas para cada tipo de veículo
        for (const tipo in vagasPorTipo) {
            const quantidadePorTipo = vagasPorTipo[tipo];

            for (let i = 0; i < quantidadePorTipo; i++) {
                const vaga = await prisma.vaga.create({
                    data: {
                        numero: numeroVaga.toString(),
                        tipo: tipo,
                        status: 'livre',  // Inicializa a vaga como livre
                        estacionamentoId: estacionamento.id,  // A vaga pertence a este estacionamento
                    },
                });
                vagasCriadas.push(vaga);
                numeroVaga++;
            }
        }

        // Retornar as vagas criadas
        res.status(201).json(vagasCriadas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar as vagas.' });
    }
});

// ===================== CHECKIN =====================

// Criar check-in
app.post('/checkins', async (req, res) => {
    try {
        const { tipoVeiculo, veiculoId, dataEntrada, horaEntrada } = req.body;

        // Buscar a primeira vaga livre que seja compatível com o tipo de veículo
        const vaga = await prisma.vaga.findFirst({
            where: {
                status: 'livre',  // A vaga precisa estar livre
                tipo: tipoVeiculo,  // A vaga precisa ser do tipo do veículo
            },
        });

        if (!vaga) {
            return res.status(404).json({ error: 'Não há vagas disponíveis para este tipo de veículo.' });
        }

        // Criar o check-in
        const checkin = await prisma.checkin.create({
            data: {
                veiculoId,
                vagaId: vaga.id,
                dataEntrada: new Date(dataEntrada),
                horaEntrada: new Date(horaEntrada),
            },
        });

        // Atualizar o status da vaga para "ocupada"
        await prisma.vaga.update({
            where: { id: vaga.id },
            data: { status: 'ocupada' },
        });

        res.status(201).json(checkin);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar check-in.' });
    }
});

// Listar check-ins
app.get('/checkins', async (req, res) => {
    try {
        const checkins = await prisma.checkin.findMany({
            include: { veiculo: true },
        });
        res.status(200).json(checkins);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao listar check-ins.' });
    }
});

// Atualizar check-in (check-out)
app.put('/checkins/:id', async (req, res) => {
    try {
        const checkin = await prisma.checkin.update({
            where: { id: req.params.id },
            data: {
                dataSaida: req.body.dataSaida ? new Date(req.body.dataSaida) : null,
                horaSaida: req.body.horaSaida ? new Date(req.body.horaSaida) : null,
            },
        });

        // Atualizar o status da vaga para "livre" após o check-out
        await prisma.vaga.update({
            where: { id: checkin.vagaId },
            data: { status: 'livre' },
        });

        res.status(200).json(checkin);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar check-in.' });
    }
});

// Deletar check-in
app.delete('/checkins/:id', async (req, res) => {
    try {
        const checkin = await prisma.checkin.findUnique({
            where: { id: req.params.id },
        });

        if (checkin) {
            await prisma.vaga.update({
                where: { id: checkin.vagaId },
                data: { status: 'livre' },
            });
        }

        await prisma.checkin.delete({
            where: { id: req.params.id },
        });

        res.status(200).json({ message: 'Check-in deletado com sucesso.' });
    } catch (error) {
        res.status(400).json({ error: 'Erro ao deletar check-in.' });
    }
});

app.listen(3005, () => {
    console.log('Servidor rodando na porta 3005.');
});
