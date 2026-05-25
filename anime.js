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

        /* --- GENRES --- */
        const genresHTML = anime.genres
            .map(g => `<span class="genre-badge">${g}</span>`)
            .join("");

        /* --- TAGS --- */
        const tagsHTML = anime.tags
            ? anime.tags.map(t => `<span class="tag">${t}</span>`).join("")
            : "";

        /* --- SAISONS & ÉPISODES (renommage FR) --- */
        let episodesHTML = "";
        if (anime.episodes) {
            episodesHTML = `
                <h3 class="mini-header"><span>📺 Saisons & épisodes</span></h3>
                <ul class="episodes-list">
                    ${Object.entries(anime.episodes)
                        .map(([saison, nb]) => {
                            const saisonFR = saison
                                .replace("season", "Saison ")
                                .replace("Saison ", "Saison ");
                            return `<li>${saisonFR} : ${nb} épisodes</li>`;
                        })
                        .join("")}
                </ul>
            `;
        }

        /* --- PAGE DÉTAIL --- */
        container.innerHTML = `
            <div class="detail-card">

                <h1>${anime.title}</h1>

                <img src="${anime.image}" class="detail-img">

                <div class="info-badges">
                    <span class="badge">📅 ${anime.year}</span>
                    <span class="badge">🏢 ${anime.studio}</span>
                    <span class="badge">💖 ${anime.rating}</span>
                </div>

                <div class="genres">${genresHTML}</div>
                <div class="tags">${tagsHTML}</div>

                <h3 class="synopsis-title">Synopsis</h3>
                <div class="synopsis-box">
                    <p>${anime.synopsis}</p>
                </div>

                ${episodesHTML}

            </div>
        `;
    });




