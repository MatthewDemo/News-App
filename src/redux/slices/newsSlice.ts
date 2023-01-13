import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface newsSliceState {
  searchValue: string;
  news: NewsItem[];
  index: number;
  status: "loading" | "success" | "error";
}
export type Source = {
  id: string;
  name: string;
};
export type NewsItem = {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

const initialState: newsSliceState = {
  searchValue: "",
  news: [],
  index: 0,
  status: "loading",
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setNews: (state, action: PayloadAction<NewsItem[]>) => {
      state.news = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.status = "loading";
      state.news = [];
    });

    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.status = "success";
    });

    builder.addCase(fetchNews.rejected, (state) => {
      state.status = "error";
      state.news = [];
    });
  },
});

export const { setSearchValue, setNews, setIndex } = newsSlice.actions;

export const fetchNews = createAsyncThunk("news/fetchNewsStatus", async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=243cde4bf44c47d486dc7df83c8338e6`
  );
  return res.data.articles as NewsItem[];
});

export default newsSlice.reducer;
