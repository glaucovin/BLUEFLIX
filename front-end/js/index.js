const urlApi = 'http://localhost:3000/filmes';
const movie = document.getElementById('movie');
let edicao = false;
let idEdicao = 0;

const getFilmes = async () => {
    const response = await fetch(urlApi);
    const dados = await response.json();
    console.log(dados);

    dados.map((filme) => {
        movie.insertAdjacentHTML('beforeend', `
        <li>
        <a href="" class="card">
          <img src="${filme.imagem}" class="card__image" alt="" />
          <div class="card__overlay">
            <div class="card__header">
              <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
              <div class="card__header-text">
                <h3 class="card__title-${filme.assistido}">${filme.titulo}</h3>            
                <span class="card__status">${filme.genero}</span>
              <span class="card__tagline">${filme.nota}</span>   
              </div>
            </div>
            <button id="edit" class="plus" onclick="editarFilme('${filme._id}')">Editar</button> 
            <button id="del" class="btn btn-danger" onclick="deleteFilme('${filme._id}')">Excluir</button>
            <p class="card__description">
              ${filme.descricao}</p>
          </div>
        </a>      
      </li>
        `)
    })
}
getFilmes();

const postFilmes = async (evento) => {
    evento.preventDefault();

    let titulo = document.getElementById('nomefilme');
    let imagem = document.getElementById('urlImagem');
    let genero = document.getElementById('genero');
    let nota = document.getElementById('nota');
    let assistido = document.getElementById('assistido');
    let descricao = document.getElementById('descricao');


    
    const filme = {
        
        titulo: titulo.value,
        imagem: imagem.value,
        genero: genero.value,
        nota: nota.value,
        assistido: assistido.value,
        descricao: descricao.value
    }
    
    if(!edicao) {
        const request = new Request(`${urlApi}/add`, {
            method: 'POST',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    
    
    const response = await fetch(request);
    const result = await response.json();
    
    if(result) {
        getFilmes();
    }

    } else {
        const request = new Request(`${urlApi}/${idEdicao}`, {
            method: 'PUT',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })

    const response = await fetch(request);
    const result = await response.json();
    if(result) {
        edicao = false;
        getFilmes();
        }
    }

    titulo.value = '';
    imagem.value = '';
    genero.value = '';
    nota.value = '';
    assistido.value = '';
    descricao.value = '';

    movie.innerHTML = '';
}





const getFilmeById = async (id) => {
    const response = await fetch(`${urlApi}/${id}`);
    return filme = response.json();
}

const editarFilme = async (id) => {
    edicao = true;
    idEdicao = id;

    const filme = await getFilmeById(id);

    let tituloEl = document.getElementById('nomeFilme');
    let imagemEl = document.getElementById('urlImagem');
    let generoEl = document.getElementById('genero');
    let notaEl = document.getElementById('nota');
    let assistidoEl = document.getElementById('assistido');
    let descricaoEl = document.getElementById('descricao');

    tituloEl.value = filme.titulo;
    imagemEl.value = filme.imagem;
    generoEl.value = filme.genero;
    notaEl.value = filme.nota;
    assistidoEl.value = filme.assistido;
    descricaoEl.value = filme.descricao

}



const deleteFilme = async (id) => {
    const request = new Request(`${urlApi}/${id}`, {
        method: 'DELETE',
    })
    const response = await fetch(request);
    const data = await response.json();
    console.log(data.message);

    movie.innerHTML = '';
    getFilmes();
}