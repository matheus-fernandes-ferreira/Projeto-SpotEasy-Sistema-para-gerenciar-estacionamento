const pg = require('pg')


const client = new pg.Client ({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'BemVindo!',
    database: 'SpotEasy_DB'
})

module.exports = client;


const db = require('')




// const {Pool, Client} = require('pg')
// const conectionString = 'postgressql://postgres:BemVindo!@localhost:5432/SpotEasy_DB'

// const client = new Client({
//     conectionString:conectionString
// })

// client.connect()

// client.query('SELECT * FROM Veiculo', (err, res) => {
//     console.log(err, res)
//     client.end()

// })
