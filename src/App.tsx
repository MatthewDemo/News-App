import { useEffect } from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { NewsItem } from "./redux/slices/newsSlice";

function App() {
  const searchValue = useSelector((store: RootState) => store.news.searchValue);
  const news = useSelector((store: RootState) => store.news.news);
  const filteredNews: NewsItem[] = news.filter((item: { title: string }) => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  // useEffect(() => {
  //   const highlightWord = () => {
  //     for (let elem of filteredNews) {
  //       let text = elem.title.replaceAll(
  //         searchValue,
  //         `<span className="highlight">${searchValue}< /span>`
  //       );
  //       console.log(text)
  //       elem.title = text
  //     }
  //   };
  //   highlightWord();
  // }, [searchValue]);

  // useEffect(() => {
  //   const highlightWord = () => {
  //     let arr = document.getElementsByClassName("card-title");
  //     for (let elem of arr) {
  //       console.log(elem.innerHTML);

  //       let text = elem.textContent.replaceAll(
  //         searchValue,
  //          `<span className="highlight">${searchValue}< /span>`
  //       );
  //       elem.innerHTML = text;
  //     }
  //   };
  //   highlightWord();
  // }, [searchValue]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home filteredNews={filteredNews} />} />
        <Route path="/info" element={<Info filteredNews={filteredNews} />} />
      </Routes>
    </>
  );
}

export default App;
