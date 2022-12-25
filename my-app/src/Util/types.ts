export type movie = {
    id: number
    title: string,
    popularity: number,
    poster_path: string,
    vote_count: number,
    overview: string,
}

export type searchResult = {
    total_results: number,
    results: movie[]
}

export type detailedMovie = {
    title: string,
    poster_path: string,
    overview: string,
    popularity: number,
    vote_count: number,
    vote_average: number,
    genres: string[],
    production_countries: country[],
}

export type loginResponse = {
    username: string
    api_key: string
}

export type loginCredentials = {
    email: string,
    password: string
}

export type registerCredentials = {
    name: string,
    email: string,
    password: string
}

export type comment = {
    id: string,
    user: string,
    comment: string
}

type country = {
    iso: string,
    name: string,
}
