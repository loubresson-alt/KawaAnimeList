// Charger le fichier JSON
fetch("data.json")
    .then(res => res.json())
    .then(data => {

        const container = document.getElementById("anime-container");
        const genreFilter = document.getElementById("genre-filter");

        // --- AFFICHER TOUTES LES CARDS ---
        function displayAnimes(list) {
            container.innerHTML = "";

            list.forEach(anime => {
                container.innerHTML += `
                    <div class="card" 
                         data-genres="${anime.genres.join(',').toLowerCase()}">

                        <img src="${anime.image}" class="card-img">
                        <h3 class="card-title">${anime.title}</h3>

                        <p class="card-year">📅 ${anime.year}</p>
                        <p class="card-studio">🏵️ ${anime.studio}</p>
                        <p class="card-rating">💖 ${anime.rating}</p>

                        <a href="anime.html?id=${anime.id}" class="card-btn">
                            Voir plus
                        </a>
                    </div>
                `;
            });
        }

        // Afficher tout au début
        displayAnimes(data);

        // --- FILTRE PAR GENRE ---
        genreFilter.addEventListener("change", () => {
            const selected = genreFilter.value.toLowerCase();

            document.querySelectorAll(".card").forEach(card => {
                const genres = card.dataset.genres.split(",");

                card.style.display =
                    selected === "" || genres.includes(selected)
                        ? "block"
                        : "none";
            });
        });
    });



