import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getNews = createAsyncThunk("getNews", async () => {
    const response = await axios.get('http://localhost:3000/news/all')
    return response.data
})

