import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getNews} from "../actions/NewsActions";
import {news} from "../../Util/types";

const initialNews: news[] = [];

const newsSlice = createSlice({
        name: 'news',
        initialState: initialNews,
        reducers: {
            addNews: (state, action: PayloadAction<news>) => {
                state.push(action.payload);
            }
        },
        extraReducers: (builder) => {
            builder.addCase(getNews.fulfilled, (state, action: PayloadAction<news[]>) => {
                state.splice(0, state.length, ...action.payload)
            })
        }
});

export const {addNews} = newsSlice.actions
export default newsSlice.reducer