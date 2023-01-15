import { useEffect } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Highlight, NewsItem, setHighlighted } from "./redux/slices/newsSlice";
import { findMatch } from "./hightlightFunction";

function App() {
  const dispatch = useDispatch();

  const searchValue = useSelector((store: RootState) => store.news.searchValue);
  const news = useSelector((store: RootState) => store.news.news);
  const highlighted = useSelector((store: RootState) => store.news.highlighted);
  const filteredNews: NewsItem[] = news.filter((item: { title: string }) => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    if (searchValue && filteredNews.length > 0) {
      const testtest: Highlight[] = filteredNews.map((item) => {
        const testObj = { ...item, title: findMatch(item.title, searchValue) };
        return testObj;
      });
      dispatch(setHighlighted(testtest));
    } else if (filteredNews.length > 0) {
      dispatch(setHighlighted(filteredNews));
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
