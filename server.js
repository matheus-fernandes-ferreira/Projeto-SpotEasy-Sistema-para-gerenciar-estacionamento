import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

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
        res.status(400).json({ error: "Erro ao criar veículo." });
    }
});

// Listar veículos
app.get('/veiculos', async (req, res) => {
    try {
        const veiculos = await prisma.veiculo.findMany({
            include: { checkins: true },
        });
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(400).json({ error: "Erro ao listar veículos." });
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
        res.status(400).json({ error: "Erro ao atualizar veículo." });
    }
});

// Deletar veículo
app.delete('/veiculos/:id', async (req, res) => {
    try {
        await prisma.veiculo.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Veículo deletado com sucesso." });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar veículo." });
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
        res.status(400).json({ error: "Erro ao salvar configurações do estacionamento." });
    }
});


// Listar estacionamentos
app.get('/estacionamento/configuracao', async (req, res) => {
    try {
        const estacionamentos = await prisma.estacionamento.findMany();
        res.status(200).json(estacionamentos);
    } catch (error) {
        res.status(400).json({ error: "Erro ao listar estacionamentos." });
    }
});

// Atualizar estacionamento
app.put('/estacionamento/configuracao/:id', async (req, res) => {
    try {
        const estacionamento = await prisma.estacionamento.update({
            where: { id: parseInt(req.params.id) }, // O ID será passado pela URL
            data: {
                totalVagas: req.body.totalVagas,
                vagasPorTipo: req.body.vagasPorTipo,
            },
        });
        res.status(200).json(estacionamento);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar configurações do estacionamento." });
    }
});

// Deletar estacionamento
app.delete('/estacionamento/configuracao/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const estacionamento = await prisma.estacionamento.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "Estacionamento deletado com sucesso." });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar estacionamento." });
    }
});

// ===================== VAGA =====================

// Criar vaga
app.post('/vagas', async (req, res) => {
    try {
        const vaga = await prisma.vaga.create({
            data: {
                numero: req.body.numero,
                tipo: req.body.tipo,
                status: req.body.status,
                estacionamentoId: req.body.estacionamentoId,
            },
        });
        res.status(201).json(vaga);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar vaga." });
    }
});

// Listar vagas
app.get('/vagas', async (req, res) => {
    try {
        const vagas = await prisma.vaga.findMany({
            include: { estacionamento: true },
        });
        res.status(200).json(vagas);
    } catch (error) {
        res.status(400).json({ error: "Erro ao listar vagas." });
    }
});

// Atualizar vaga
app.put('/vagas/:id', async (req, res) => {
    try {
        const vaga = await prisma.vaga.update({
            where: { id: req.params.id },
            data: {
                numero: req.body.numero,
                tipo: req.body.tipo,
                status: req.body.status,
            },
        });
        res.status(200).json(vaga);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar vaga." });
    }
});

// Deletar vaga
app.delete('/vagas/:id', async (req, res) => {
    try {
        await prisma.vaga.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Vaga deletada com sucesso." });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar vaga." });
    }
});

// ===================== CHECKIN =====================

// Criar check-in
app.post('/checkins', async (req, res) => {
    try {
        const checkin = await prisma.checkin.create({
            data: {
                veiculoId: req.body.veiculoId,
                vagaId: req.body.vagaId,
                dataEntrada: new Date(req.body.dataEntrada),
                horaEntrada: new Date(req.body.horaEntrada),
            },
        });
        res.status(201).json(checkin);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar check-in." });
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
        res.status(400).json({ error: "Erro ao listar check-ins." });
    }
});

// Atualizar check-in
app.put('/checkins/:id', async (req, res) => {
    try {
        const checkin = await prisma.checkin.update({
            where: { id: req.params.id },
            data: {
                dataSaida: req.body.dataSaida ? new Date(req.body.dataSaida) : null,
                horaSaida: req.body.horaSaida ? new Date(req.body.horaSaida) : null,
            },
        });
        res.status(200).json(checkin);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar check-in." });
    }
});

// Deletar check-in
app.delete('/checkins/:id', async (req, res) => {
    try {
        await prisma.checkin.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Check-in deletado com sucesso." });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar check-in." });
    }
});

app.listen(3005, () => {
    console.log("Servidor rodando na porta 3005.");
});



//https://www.youtube.com/watch?v=PyrMT0GA3sE
//https://www.youtube.com/watch?v=_gHr2Pe5LCY
//extensão Thunder client para testar as rotas