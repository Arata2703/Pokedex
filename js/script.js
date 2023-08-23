const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')

const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => { //Esse async faz com que a função seja assíncrona, o que é necessário para que seja utilizado o await
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //Esse await faz com que a função espere o retorno do fetch para então continuar a ler o código

    if (APIResponse.status == 200) {
        const data = await APIResponse.json(); 
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading ...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        searchPokemon = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
        input.value = '';
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found';
        pokemonNumber.innerHTML = '';
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

}); //No caso, estamos declarando a função dentro do campo para parâmetro, mas é possível declarar previamente a função para então passá-la como parâmetro

buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});

buttonNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);    
});

renderPokemon(searchPokemon);