import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Highlight, setIndex } from "../../redux/slices/newsSlice";

type NewsBlockProps = {
  item: Highlight;
  idx: number;
};

const NewsBlock: React.FC<NewsBlockProps> = ({ item, idx }) => {
  const dispatch = useDispatch();

  return (
    <div className="card" key={idx}>
      <img src={item.urlToImage} alt="newsImg" className="newsImg" />
      <div className="date-on-card">
        <img className="calendarImg" src="images/calendar.png" alt="calendar" />
        <p className="dateText">{item.publishedAt.substr(0, 10)}</p>
      </div>
      <p className="card-title">{item.title}</p>
      <p className="card-text">{item.content.substr(0, 100)}...</p>
      <Link to="/info">
        <button className="moreBtn" onClick={() => dispatch(setIndex(idx))}>
          Read more →
        </button>
      </Link>
    </div>
  );
};

export default NewsBlock;
