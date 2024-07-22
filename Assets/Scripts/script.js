console.log('iniciou script');



const numeroVagas = 10

function criarMapa(numeroVagas) {
    const mapa = document.querySelector('.mapa')
    console.log(mapa);
    for (let index = 0; index < numeroVagas; index++) {
        console.log('entrou');
        const vaga = document.createElement('div')
        vaga.setAttribute('class', 'vaga')
        mapa.appendChild(vaga)

    }



}

criarMapa(numeroVagas)

// const mapa = document.querySelector('.mapa')
// console.log(mapa);
// const vaga = document.createElement('div')
// vaga.setAttribute('class', 'vaga')

// mapa.appendChild(vaga)