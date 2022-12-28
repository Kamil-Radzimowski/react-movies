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
    id: number
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
    isAdmin: boolean
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

export type user = {
    id: string,
    username: string,
    isAdmin: boolean
}

type country = {
    iso: string,
    name: string,
}
