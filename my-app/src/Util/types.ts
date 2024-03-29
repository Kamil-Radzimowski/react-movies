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
    results: movie[],
    number_of_pages: number
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

export type news = {
    _id: string,
    title: string,
    desc: string,
    date: string
}

export type groupedComments = {
    title: string
    id: string
    comments: comment[]
}

export type statsItem = {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        backgroundColor: string,
    }[]
}

export type message = {
    id: string
    user: string
    message: string
}

type country = {
    iso: string,
    name: string,
}
