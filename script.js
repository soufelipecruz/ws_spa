const apiKey = 'c284b22bd448dfec3623590ee32e373a'; 
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

document.getElementById('botao_buscar').addEventListener('click', () => {
    const filme = document.getElementById('Input').value;
    if (filme) {
        fetchMovies(filme);
    }
});

async function fetchMovies(query) {
    try {
        const response = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

function displayMovies(movies) {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = ''; 
    if (movies.length === 0) {
        container.innerHTML = '<p>Nenhum filme encontrado.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p>${movie.release_date ? movie.release_date.split('-')[0] : 'Sem data'}</p>
        `;
        container.appendChild(movieElement);
    });
}
