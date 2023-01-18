// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')


test('test find star trek movie', async() => {
    const response = await axios.get('http://localhost:3000/movie/search?query=trek&page=1&sort=default')
    expect(response.status).toBe(200)
    expect(response.data.results.length).toBe(1)
})

test('test can not add new movie without image', async() => {
    try {
        await axios.post('http://localhost:3000/movie/add/Tytul/Opis/Gatunek')
    } catch (err) {
        expect(err.message).toBe("Request failed with status code 500")
    }
})

test('search will not find movie that does not exists', async() => {
    const response = await axios.get('http://localhost:3000/movie/search?query=asfasfasvasvasvasv&page=1&sort=default')
    expect(response.status).toBe(200)
    expect(response.data.results).toBe(undefined)
})

test('recommendation will return 5 results', async() => {
    const response = await axios.get('http://localhost:3000/movie/recommendation')
    expect(response.status).toBe(200)
    expect(response.data.results.length).toBe(5)
})
