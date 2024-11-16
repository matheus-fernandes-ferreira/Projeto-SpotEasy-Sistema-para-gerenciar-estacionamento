import express from "express";
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// Criar veículo
app.post('/veiculos', async (req, res) => {
    await prisma.veiculo.create({
        data: {
            placa: req.body.placa,
            modelo: req.body.modelo,
            cor: req.body.cor,
            tipo: req.body.tipo
        }
    });
    res.status(201).json(req.body);
});

// Listar os veículos
app.get('/veiculos', async (req, res) => {
    let vehicle = []
    if (req.query) {
        vehicle = await prisma.veiculo.findMany({
            where:{
                placa: req.query.placa,
                modelo: req.query.modelo,
                cor: req.query.cor,
                tipo: req.query.tipo,
            }
        })
    }else{
        vehicle = await prisma.veiculo.findMany();

    }
    console.log('servidor funcionando');

    res.status(200).json(vehicle);
});

// Editar veículo
app.put('/veiculos/:id', async (req, res) => {
    await prisma.veiculo.update({
        where: {
            id: req.params.id
        },
        data: {
            placa: req.body.placa,
            modelo: req.body.modelo,
            cor: req.body.cor,
            tipo: req.body.tipo
        }
    });
    res.status(201).json(req.body);
});

// Deletar veículo
app.delete('/veiculos/:id', async (req, res) => {
    await prisma.veiculo.delete({
        where: {
            id: req.params.id
        },
    });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
});


// =========================== ESTACIONAMENTO ===================================

// Criar estacionamento
app.post('/estacionamento', async (req, res) => {
    const { veiculoId, data_entrada, hora_entrada, numero_vaga, status } = req.body;

    try {
        const estacionamento = await prisma.estacionamento.create({
            data: {
                veiculoId,
                data_entrada: new Date(data_entrada),  // Convertendo para Date
                hora_entrada,
                numero_vaga,
                status
            }
        });
        res.status(201).json(estacionamento);
    } catch (error) {
        res.status(400).json({ error: "Erro ao criar estacionamento" });
    }
});

// Listar estacionamentos
app.get('/estacionamento', async (req, res) => {
    try {
        const estacionamentos = await prisma.estacionamento.findMany({
            include: {
                veiculo: true // Inclui as informações do veículo relacionado
            }
        });
        res.status(200).json(estacionamentos);
    } catch (error) {
        res.status(400).json({ error: "Erro ao listar estacionamentos" });
    }
});

// Editar estacionamento
app.put('/estacionamento/:id', async (req, res) => {
    const { data_saida, hora_saida, status } = req.body;

    try {
        const estacionamento = await prisma.estacionamento.update({
            where: {
                id: req.params.id
            },
            data: {
                data_saida: data_saida ? new Date(data_saida) : null,  // Caso data_saida seja fornecida, converte para Date
                hora_saida,
                status
            }
        });
        res.status(200).json(estacionamento);
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar estacionamento" });
    }
});

// Deletar estacionamento
app.delete('/estacionamento/:id', async (req, res) => {
    try {
        await prisma.estacionamento.delete({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json({ message: "Estacionamento deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: "Erro ao deletar estacionamento" });
    }
});



app.listen(3005, () => {
    console.log("Server running on port 3005");
});



//https://www.youtube.com/watch?v=PyrMT0GA3sE
//https://www.youtube.com/watch?v=_gHr2Pe5LCY
//extensão Thunder client para testar as rotas