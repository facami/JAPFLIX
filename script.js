let moviesData = [];

document.addEventListener('DOMContentLoaded', () => {
    // Datos de las películas cuando carga la página
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            moviesData = data;
        })
        .catch(error => console.error('Error al obtener los datos:', error));

    // Buscar
    document.getElementById('btnBuscar').addEventListener('click', () => {
        const searchTerm = document.getElementById('inputBuscar').value.toLowerCase();
        const lista = document.getElementById('lista');
        lista.innerHTML = ''; // Limpia los resultados anteriores

        if (searchTerm) {
            const filteredMovies = moviesData.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.genres.join(' ').toLowerCase().includes(searchTerm) ||
                (movie.tagline && movie.tagline.toLowerCase().includes(searchTerm)) ||
                (movie.overview && movie.overview.toLowerCase().includes(searchTerm))
            );

            // Mouestrs los resultados
            filteredMovies.forEach(movie => {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'text-dark');
                li.textContent = `${movie.title} - ${movie.tagline || ''}`;
                li.addEventListener('click', () => showMovieDetails(movie));
                lista.appendChild(li);
            });
        }
    });

    // Detalles de las películas
    function showMovieDetails(movie) {
        document.getElementById('offcanvasMovieLabel').textContent = movie.title;
        document.getElementById('movieOverview').textContent = movie.overview;
        document.getElementById('movieGenres').textContent = movie.genres.join(', ');
        document.getElementById('movieYear').textContent = new Date(movie.release_date).getFullYear();
        document.getElementById('movieDuration').textContent = movie.runtime;

        const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasMovie'));
        offcanvas.show();
    }
});
