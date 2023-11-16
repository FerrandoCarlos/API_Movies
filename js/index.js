let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina++;
        cargarPeliculas();
    }
});
btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina--;
        cargarPeliculas();
    }
});
const cargarPeliculas = async () => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=33269ec8d674172acb4187f53c5f4845&language=es-MX&page=${pagina}`);
        console.log(respuesta);
        //Se comprueba que la respuesta sea correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">   
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                 `
            });
            document.getElementById('contenedor').innerHTML = peliculas;
        } else if (respuesta.status === 401) {
            console.log("Llave de la API incorrecta!!")
        } else if (respuesta.status === 404) {
            console.log("La película buscada no existe!!")
        } else {
            console.log("Error en el servidor!!")
        }

    } catch (error) {
        console.log(error);
    }


}

cargarPeliculas();