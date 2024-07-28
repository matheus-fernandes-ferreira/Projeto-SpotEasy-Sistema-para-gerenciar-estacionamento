const db = require('./connectionBD')

async function dropTables (){
    await db.connect()
    await db.query('DROP TABLE cliente')
    await db.query('DROP TABLE veiculo')
    await db.query('DROP TABLE entrada')
    await db.query('DROP TABLE vaga')
    await db.query('DROP TABLE saida')
    await db.query('DROP TABLE pagamento')
    await db.end()
    console.log('Tabelas removidas');
}

dropTables()