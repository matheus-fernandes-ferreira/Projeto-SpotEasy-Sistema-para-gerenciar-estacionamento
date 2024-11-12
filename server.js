import express from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

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

app.listen(3005, () => {
    console.log("Server running on port 3005");
});



//https://www.youtube.com/watch?v=PyrMT0GA3sE
//extensão Thunder client para testar as rotas