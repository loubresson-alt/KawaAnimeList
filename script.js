fetch("data.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("anime-list");

        data.forEach(anime => {
            const card = document.createElement("div");
            card.classList.add("card");

           card.innerHTML = `
    <img src="${anime.image}" alt="${anime.title}">
    <h3>${anime.title}</h3>

    <div class="info">
        <span class="year">🌸 ${anime.year}</span>
        <span class="studio">⭐ ${anime.studio}</span>
        <span class="rating">❤️ ${anime.rating}</span>
    </div>

    <button class="voir-plus" data-id="${anime.id}">Voir plus</button>
`;
            container.appendChild(card);
            card.querySelector(".voir-plus").addEventListener("click", () => {
                window.location.href = `anime.html?id=${anime.id}`;
            });
        });

        const searchInput = document.getElementById("search");

        searchInput.addEventListener("input", () => {
            const value = searchInput.value.toLowerCase();

            document.querySelectorAll(".card").forEach(card => {
                const title = card.querySelector("h3").textContent.toLowerCase();
                card.style.display = title.includes(value) ? "block" : "none";
            });
        });

       const genreFilter = document.getElementById("genre-filter");

genreFilter.addEventListener("change", () => {
    const genre = genreFilter.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        const genres = card.dataset.genres
            .toLowerCase()      // 🔥 on met tout en minuscules
            .split(",");

        card.style.display =
            genre === "" || genres.includes(genre)
                ? "block"
                : "none";
    });
});

    });
