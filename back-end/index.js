const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const filmesRouter = require('./routers/filmes.routes');
app.use('/filmes', filmesRouter);

app.get('/', (req, res) => {
    res.send('Blueflix');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
})