import { useArticle } from "hooks";
import ReactMarkdown from "react-markdown";
import { getFormattedDate, getMockedFullName } from "utils/helpers";
import placeholder from "../../assets/placeholder.jpg";
import { useLocation } from "react-router-dom";
import { Comments } from "components";
import "./style.scss";
import axios from "axios";
import { Article as ArticleType } from "hooks/useArticles";

export const Article: React.FC = () => {
  const location = useLocation();
  const article = useArticle(location.pathname);

  // @TODO: no full name in response, so lets mock it
  const authorName = getMockedFullName(article?.author?.username);
  const formattedDate = getFormattedDate(article?.createdAt);
  const authorSlug = `/#/profile/${article?.author?.username}`;
  const authorImage = article?.author.image || placeholder;

  const handleFavorite = async ({ slug, favorited }: ArticleType) => {
    const favoriteURL = `api/articles/${slug}/favorite`;
    if (favorited) {
      await axios.delete(favoriteURL);
    } else {
      await axios.post(favoriteURL);
    }
    window.dispatchEvent(new Event("favorited"));
  };

  const handleFollow = async ({ author }: ArticleType) => {
    const followURL = `api/profiles/${author.username}/follow`;
    if (author.following) {
      await axios.delete(followURL);
    } else {
      await axios.post(followURL);
    }
    window.dispatchEvent(new Event("favorited"));
  };

  const favBtnClassName = ["btn btn-sm", article?.favorited ? "btn-primary favorited" : "btn-outline-primary"].join(
    " "
  );

  const followBtnClassName = [
    "btn btn-sm",
    article?.author.following ? "btn-secondary favorited" : "btn-outline-secondary",
  ].join(" ");

  const displayBanner = (
    <div className="banner">
      <div className="container">
        <h1>{article?.title}</h1>

        <div className="article-meta">
          <a href={authorSlug}>
            <img src={authorImage} />
          </a>
          <div className="info">
            <a href={authorSlug} className="author">
              {authorName}
            </a>
            <span className="date">{formattedDate}</span>
          </div>
          <button className={followBtnClassName} onClick={() => article && handleFollow(article)}>
            {article?.author.following ? (
              <>
                <i className="ion-android-done" />
                &nbsp; Following {authorName}
              </>
            ) : (
              <>
                <i className="ion-plus-round" />
                &nbsp; Follow {authorName}
              </>
            )}
            {/* TODO: no follow count in API ?? */}
            {/* <span className="counter">(10)</span> */}
          </button>
          &nbsp;&nbsp;
          <button className={favBtnClassName} onClick={() => article && handleFavorite(article)}>
            <i className="ion-heart" />
            {article?.favorited ? (
              <>
                &nbsp; Favourited <span className="counter">({article?.favoritesCount})</span>
              </>
            ) : (
              <>
                &nbsp; Favorite Post <span className="counter">({article?.favoritesCount})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const displayAuthorFooter = (
    <div className="article-actions">
      <div className="article-meta">
        <a href={authorSlug}>
          <img src={authorImage} />
        </a>
        <div className="info">
          <a href={authorSlug} className="author">
            {authorName}
          </a>
          <span className="date">{formattedDate}</span>
        </div>
        <button className={followBtnClassName} onClick={() => article && handleFollow(article)}>
          {article?.author.following ? (
            <>
              <i className="ion-android-done" />
              &nbsp; Following {authorName}
            </>
          ) : (
            <>
              <i className="ion-plus-round" />
              &nbsp; Follow {authorName}
            </>
          )}
        </button>
        &nbsp;
        <button className={favBtnClassName} onClick={() => article && handleFavorite(article)}>
          <i className="ion-heart" />
          {article?.favorited ? (
            <>
              &nbsp; Favourited <span className="counter">({article?.favoritesCount})</span>
            </>
          ) : (
            <>
              &nbsp; Favorite Post <span className="counter">({article?.favoritesCount})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="article-page">
        {displayBanner}

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <ReactMarkdown>{article?.body ?? ""}</ReactMarkdown>
            </div>
          </div>

          <hr />

          {displayAuthorFooter}

          <Comments />
        </div>
      </div>
    </>
  );
};
