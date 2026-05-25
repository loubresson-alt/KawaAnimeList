fetch("data.json")
    .then(res => res.json())
    .then(data => {

        const params = new URLSearchParams(window.location.search);
        const animeId = params.get("id");

        const anime = data.find(a => a.id === animeId);

        if (!anime) {
            document.getElementById("anime-detail").innerHTML =
                "<p>Anime introuvable.</p>";
            return;
        }

        const container = document.getElementById("anime-detail");

        /* --- Genres --- */
        const genresHTML = anime.genres
            .map(g => `<span class="genre-badge">${g}</span>`)
            .join("");

        /* --- Tags --- */
        const tagsHTML = anime.tags
            .map(t => `<span class="tag">${t}</span>`)
            .join("");

        /* --- Saisons & épisodes (format FR) --- */
        const episodesHTML = Object.entries(anime.episodes)
            .map(([saison, nb]) => {
                const saisonFR = saison.replace("season", "Saison ");
                return `<li>${saisonFR} : ${nb} épisodes</li>`;
            })
            .join("");

        /* --- Construction propre et compatible CSS --- */
        container.innerHTML = `
            <div class="detail-card">

                <h1>${anime.title}</h1>

                <img src="${anime.image}" class="detail-img">

                <h3 class="synopsis-title">Synopsis</h3>
                <div class="synopsis-box">
                    <p>${anime.synopsis}</p>
                </div>

                <div class="info-badges">
                    <span class="badge">📅 ${anime.year}</span>
                    <span class="badge">🏢 ${anime.studio}</span>
                    <span class="badge">💖 ${anime.rating}</span>
                </div>

                <h3>Genres</h3>
                <div class="genres">
                    ${genresHTML}
                </div>

                <h3>Saisons & épisodes</h3>
                <ul class="episodes-list">
                    ${episodesHTML}
                </ul>

                <h3>Tags</h3>
                <div class="tags">
                    ${tagsHTML}
                </div>

                <button class="voir-plus">→ Regarder</button>

            </div>
        `;
    });







