import { useEffect, useState } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { NewsItem, Source } from "./redux/slices/newsSlice";
import { findMatch } from "./hightlightFunction";

export type Highlight = {
  title: JSX.Element | string;
  source: Source;
  author: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

function App() {
  const searchValue = useSelector((store: RootState) => store.news.searchValue);
  const news = useSelector((store: RootState) => store.news.news);
  const filteredNews: NewsItem[] = news.filter((item: { title: string }) => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const [highlighted, setHighlighted] = useState<Highlight[]>([]);

  useEffect(() => {
    if (searchValue && filteredNews.length > 0) {
      const testtest: Highlight[] = filteredNews.map((item) => {
        const testObj = { ...item, title: findMatch(item.title, searchValue) };
        return testObj;
      });
      setHighlighted(testtest);
    } else if (filteredNews.length > 0) {
      setHighlighted(filteredNews);
    }
  }, [searchValue, filteredNews.length]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home filteredNews={highlighted} />} />
        <Route path="/info" element={<Info filteredNews={filteredNews} />} />
      </Routes>
    </>
  );
}

export default App;
