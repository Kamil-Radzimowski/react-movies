export type movie = {
    id: number
    title: string,
    popularity: number,
    poster_path: string,
    vote_count: number,
    overview: string,
}

export type detailedMovie = {
    title: string,
    poster_path: string,
    overview: string,
    popularity: number,
    vote_count: number,
    vote_average: number,
    genres: genre[],
    production_countries: country[],
}

type genre = {
    id: number,
    name: string,
}

type country = {
    iso: string,
    name: string,
}
