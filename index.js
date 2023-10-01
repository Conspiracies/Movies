// // https://www.omdbapi.com/?i=tt3896198&apikey=e3f88c5c

// // api 2 https://www.omdbapi.com/?i=tt3896198&apikey=b156cbc

const moviesListEl = document.querySelector(".movies__wrapper")
const movieHead = document.querySelector(".movie__header")
const loadingSpinEl = document.querySelector(".loader")

async function renderMovies (sort) {

    const movies = await fetch (`https://www.omdbapi.com/?&apikey=b156cbc&s=${title}`);
    const movieData = await movies.json()
    console.log(movieData);
    const movieDataResult = movieData.Search.slice(0,8);

    if (sort === 'new_to_old') {
        movieDataResult.sort((a, b) => b.Year - a.Year);
    } else if (sort === 'old_to_new') {
        movieDataResult.sort((a, b) => a.Year - b.Year);
    }

    console.log(movieDataResult);

    setTimeout(() => {
        moviesListEl.innerHTML = movieDataResult.map((movie) => movieHTML(movie)).join("");
        movieHead.innerHTML = `Results for "${title}:"`
    }, 1200);
    // moviesListEl.innerHTML = movieData.Search.map( movie => movieHTML(movie)).join("")
}

renderMovies();

function searchMovie (event) {
    title = event.target.value;
    event.preventDefault();
    renderMovies();
}

function sortMovieRelease (event) {
    renderMovies(event.target.value);
}

function movieHTML (movie) {
    return `
    <div class="movie click" onclick = "showMovieInfo(${movie.imdbID})">
    <figure class="movie__img--wrapper">
      <img src="${movie.Poster}" alt="" class="movie__img">
    </figure>
    <div class="movie__info">
      <h1 class="movie__title">${movie.Title}</h1>
      <h1 class="movie__release">${movie.Year}</h1>
    </div>
  </div>
  `;
}

function showMovieInfo (imdbID) {
    window.location.href = `${window.location.origin}/movie.html`;
    localStorage.setItem("imdbID", imdbID);
}

function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu () {
    document.body.classList.remove("menu--open")
}

