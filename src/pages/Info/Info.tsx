import "./Info.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NewsItem, setSearchValue } from "../../redux/slices/newsSlice";
import { RootState } from "../../redux/store";

type InfoProps = {
  filteredNews: NewsItem[];
};

const Info: React.FC<InfoProps> = ({ filteredNews }) => {
  const dispatch = useDispatch();
  const index = useSelector((store: RootState) => store.news.index);
  const news = useSelector((store: RootState) => store.news.news);

  return (
    <>
      {news.length > 0 && (
        <div>
          <div className="img">
            <img src={filteredNews[index].urlToImage} alt="mmm" />
          </div>
          <div className="full-info">
            <div className="full-info-title">{filteredNews[index].title}</div>
            <div className="full-info-content">
              {filteredNews[index].content}
            </div>
          </div>
          <Link to="/">
            <button
              className="backBtn"
              onClick={() => dispatch(setSearchValue(""))}
            >
              ← Back to homepage
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Info;
