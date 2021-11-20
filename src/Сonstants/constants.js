const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


export const API_KEY =
    '23213953-4f9e-4c06-bcec-a9c79cf7d4ef'
export const API_URL_POPULAR = id =>
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${id}`
export const API_URL_SEARCH = (name,page) =>
    `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${name}&page=${page}`
export const API_URL_FILM =
    'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
export const API_URL_GENRE =
    'https://kinopoiskapiunofficial.tech/api/v2.1/films/filters'
export const API_URL_STAFF =
    'https://kinopoiskapiunofficial.tech/api/v1/staff?filmId='
export const API_URL_FRAME_FILM =
    (id) => `https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}/frames`
export const API_URL_PREMIER_FILM =
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=${new Date().getFullYear()}&month=${month[new Date().getMonth()].toUpperCase()}`
export const API_URL_AWAIT_FILM =
        page => `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=${page}`
export const API_URL_BEST_FILM =
    (page) => `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`
export const API_URL_GENRE_FILM =
        genre => `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=${genre}`


