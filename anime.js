// Charger le fichier JSON
fetch("data.json")
    .then(res => res.json())
    .then(data => {

        // Récupérer l'ID dans l'URL
        const params = new URLSearchParams(window.location.search);
        const animeId = params.get("id");

        // Trouver l'anime correspondant
        const anime = data.find(a => a.id === animeId);

        if (!anime) {
            document.getElementById("anime-detail").innerHTML =
                "<p>Anime introuvable.</p>";
            return;
        }

        const container = document.getElementById("anime-detail");

        container.innerHTML = `
        <div class="detail-card">
            <h1>${anime.title}</h1>
            <img src="${anime.image}" class="detail-img">

            <h3 class="synopsis-title">🌸 Synopsis</h3>
            <div class="synopsis-box">
                <p>${anime.synopsis}</p>
            </div>

            <div class="info-badges">
                <span class="badge">📅 ${anime.year}</span>
                <span class="badge">🏵️ ${anime.studio}</span>
                <span class="badge">💖 ${anime.rating}</span>
            </div>
        </div>`;
    });




