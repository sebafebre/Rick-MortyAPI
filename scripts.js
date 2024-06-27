document.getElementById('btnTodos').addEventListener('click', verTodos);
document.getElementById('btnBuscar').addEventListener('click', verFiltro);

async function verTodos() {
    const url = 'https://rickandmortyapi.com/api/character';
    let todosPersonajes = [];
    let nextPage = url;

    while (nextPage) {
        const response = await fetch(nextPage);
        const data = await response.json();
        todosPersonajes = todosPersonajes.concat(data.results);
        nextPage = data.info.next;
    }

    mostrarPersonajes(todosPersonajes);
}



function mostrarPersonajes(personajes) {
    const output = document.getElementById('output');
    output.innerHTML = '';

    personajes.forEach(personaje => {
        const cuadroPersonaje = document.createElement('div');
        cuadroPersonaje.classList.add('cuadroPersonaje');

        cuadroPersonaje.innerHTML = `
            <h3>${personaje.name}</h3>
            <img src="${personaje.image}" alt="${personaje.name}">
            <p>Status: ${personaje.status}</p>
            <p>Species: ${personaje.species}</p>
            <p>Gender: ${personaje.gender}</p>
        `;

        output.appendChild(cuadroPersonaje);
    });
}

function showError(error) {
    const output = document.getElementById('output');
    output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}
