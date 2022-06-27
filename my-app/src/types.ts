export type movie = {
    id: number
    title: string,
    popularity: number,
    poster: string,
    vote_count: number,
    overview: string,
}

export type detailedMovie = {
    title: string,
    poster: string,
    overview: string,
    popularity: number,
    vote_count: number,
    vote_avg: number,
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
