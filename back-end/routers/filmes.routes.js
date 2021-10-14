const express = require('express');
const router = express.Router();

const catalogo = [
    {
        id: Date.now(),
        titulo: 'Gente Grande',
        imagem: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/2946a377f3609164ee7fccb7c0d741fa5b0f09a994bb33e0cbd5b93095ed523f._RI_V_TTW_.jpg',
        genero: 'Comédia',
        nota: 8,
        assistido: true,
        descricao: 'Passados trinta anos, os cinco amigos se reencontram para curtir um fim de semana juntos com as respectivas famílias...'
    }
]

router.get('/', (req, res) => {
    res.send(catalogo)
});

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const index = catalogo.findIndex(filme => filme.id == idParam);
    const filme = catalogo[index];
    res.send(filme);
});

router.put('/:id', (req, res) => {
    const editFilme = req.body;
    const id = req.params.id;
    let FilmePreCad = catalogo.find((filme) => filme.id == id);

    FilmePreCad.titulo = editFilme.titulo;
    FilmePreCad.imagem = editFilme.imagem;
    FilmePreCad.genero = editFilme.genero;
    FilmePreCad.nota = editFilme.nota;
    FilmePreCad.assistido = editFilme.assistido;
    FilmePreCad.descricao = editFilme.descricao;

     res.send({
     message: `Filme ${FilmePreCad.id} atualizado com sucesso`,
     data: FilmePreCad
    })
})
    


router.post('/add', (req, res) => {
    const filme = req.body;
    filme.id = Date.now();
    catalogo.push(filme);
    res.status(201).send({
        message: 'Filme adicionado ao Catálogo da Blueflix com sucesso!',
        data: filme
    });
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = catalogo.findIndex((filme) => filme.id == id);
    catalogo.splice(index, 1);

    res.send({
        message: 'Filme excluído!',
    })
})


module.exports = router;