import axios from "axios";


export const sendMovieToBackend = (title: string, desc: string, genres: string[], formData: FormData) => {
    axios.post(`http://localhost:3000/movie/add/${title}/${desc}/${genres}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}