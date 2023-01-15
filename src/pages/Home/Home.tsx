import { useEffect, useCallback } from "react";
import "./Home.scss";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { Highlight, NewsItem, setSearchValue } from "../../redux/slices/newsSlice";
import { fetchNews } from "../../redux/slices/newsSlice";
import { store } from "../../redux/store";

type HomeProps = {
  filteredNews: Highlight[];
};

const Home: React.FC<HomeProps> = ({ filteredNews }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(fetchNews());
  }, []);

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    []
  );

  return (
    <div className="App">
      <h2 className="filterText">Filter by keywords</h2>
      <div className="input-container">
        <img className="searchImg" src="images/search.png" alt="search" />
        <input
          className="searchInput"
          onChange={(e) => updateSearchValue(e.target.value)}
          placeholder="Enter keywords..."
        />
      </div>
      <h2 className="resultText">Results : {filteredNews.length}</h2> <hr />
      <div className="card-container">
        {filteredNews.map((item: Highlight, idx: number) => (
          <NewsBlock key={idx} item={item} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default Home;
