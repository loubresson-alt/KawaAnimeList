// Charger le fichier JSON
fetch("data.json")
    .then(res => res.json())
    .then(data => {

        // Récupérer l'ID dans l'URL
        const params = new URLSearchParams(window.location.search);
        const animeId = params.get("id");

        // Trouver l'anime correspondant
        const anime = data.find(a => a.id === animeId);

        // Sélecteur du conteneur
        const container = document.getElementById("anime-detail");

        // Affichage de la page détail
        container.innerHTML = `
            <div class="detail-card">

                <h1>${anime.title}</h1>

                <button class="fav-btn" data-id="${anime.id}">💗</button>

                <img src="${anime.image}" class="detail-img">

             <h3 class="synopsis-title">🌸 Synopsis</h3>
<div class="synopsis-box">
    <span class="synopsis-sticker">💗</span>
    <p>${anime.synopsis}</p>
</div>



                <div class="info-badges">
                    <span class="badge">🌸 ${anime.year}</span>
                    <span class="badge">⭐ ${anime.studio}</span>
                    <span class="badge">❤️ ${anime.rating}</span>
                </div>

                <h3>Genres</h3>
                <div class="genres">
                    ${anime.genres.map(g => `<span class="genre-badge">${g}</span>`).join("")}
                </div>

                <h3>Épisodes</h3>
                <ul class="episodes-list">
                    ${Object.entries(anime.episodes)
                        .map(([season, count]) => `<li>${season} : ${count} épisodes</li>`)
                        .join("")}
                </ul>

                <h3>Tags</h3>
                <div class="tags">
                    ${anime.tags.map(t => `<span class="tag">${t}</span>`).join("")}
                </div>

                <button onclick="history.back()">⬅ Retour</button>
            </div>
        `;

        // --- Gestion des favoris ---
        const favBtn = document.querySelector(".fav-btn");

        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];

        // Si déjà en favoris → afficher 💖
        if (favoris.includes(anime.id)) {
            favBtn.classList.add("active");
            favBtn.textContent = "💖";
        }

        // Clic sur le bouton favori
        favBtn.addEventListener("click", () => {
            if (favoris.includes(anime.id)) {
                // Retirer des favoris
                favoris = favoris.filter(id => id !== anime.id);
                favBtn.classList.remove("active");
                favBtn.textContent = "💗";
            } else {
                // Ajouter aux favoris
                favoris.push(anime.id);
                favBtn.classList.add("active");
                favBtn.textContent = "💖";
            }

            localStorage.setItem("favoris", JSON.stringify(favoris));
        });

    });



