fetch("data.json")
    .then(res => res.json())
    .then(data => {
        const grid = document.querySelector(".grid");
        const searchInput = document.getElementById("search");
        const genreFilter = document.getElementById("genre-filter");

        // Fonction d'affichage
        function displayAnimes(list) {
            grid.innerHTML = "";

            list.forEach(anime => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${anime.image}" alt="${anime.title}">
                    <h3>${anime.title}</h3>
                    <p class="card-year">${anime.year}</p>
                    <p class="card-studio">${anime.studio}</p>
                    <p class="card-rating">${anime.rating}</p>
                    <p class="card-platform">
    🖥️ <a href="${anime.platform.url}" target="_blank">${anime.platform.name}</a>
</p>

                    <a class="card-btn" href="anime.html?id=${anime.id}">Voir plus</a>
                `;
                

                grid.appendChild(card);
            });
        }

        // Affichage initial
        displayAnimes(data);

        // Fonction de filtrage
        function filter() {
            const searchValue = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const genreValue = genreFilter.value.toLowerCase();

            const filtered = data.filter(anime => {

                // Recherche texte (titre + genres)
                const matchSearch =
                    anime.title.toLowerCase().includes(searchValue) ||
                    anime.genres.some(g => g.toLowerCase().includes(searchValue));

                // Filtre genre
                const matchGenre =
                    genreValue === "all" ||
                    anime.genres.some(g => g.toLowerCase() === genreValue);

                return matchSearch && matchGenre;
            });

            displayAnimes(filtered);
        }

        // Événements
        searchInput.addEventListener("input", filter);
        genreFilter.addEventListener("change", filter);
    });


