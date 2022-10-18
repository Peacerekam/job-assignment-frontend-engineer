import { getFormattedDate, getMockedFullName } from "utils/helpers";
import { Article } from "hooks/useArticles";
import placeholder from "assets/placeholder.jpg";

import "./style.scss";
import axios from "axios";

type ArticlePreviewProps = {
  article: Article;
};

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  // @TODO: no full name in response, so lets mock it
  const authorName = getMockedFullName(article.author?.username);
  const formattedDate = getFormattedDate(article.createdAt);
  const authorImage = article.author.image || placeholder;
  const authorSlug = `/#/profile/${article.author.username}`;
  const articleSlug = `/#/${article.slug}`;

  const handleFavorite = async ({ slug, favorited }: Article) => {
    const favoriteURL = `api/articles/${slug}/favorite`;
    if (favorited) {
      await axios.delete(favoriteURL);
    } else {
      await axios.post(favoriteURL);
    }
    window.dispatchEvent(new Event("favorited"));
  };

  const classNames = ["btn btn-sm pull-xs-right", article.favorited ? "btn-primary favorited" : "btn-outline-primary"].join(" ");

  return (
    <div className="article-preview">
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
        <button className={classNames} onClick={() => handleFavorite(article)}>
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <a href={articleSlug} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
};
