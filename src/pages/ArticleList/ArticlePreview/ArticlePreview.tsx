import { useMemo } from "react";
import { nth } from "utils/helpers";
import { Article } from "../../../hooks/useArticles";
import "./style.scss";

type ArticlePreviewProps = {
  article: Article;
};

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
  const formattedDate = useMemo(() => {
    const date = new Date(article.createdAt); // 2009-11-10
    const month = date.toLocaleString("en", { month: "long" });
    const day = date.getDate();
    const suffix = nth(day);
    return `${month} ${day}${suffix}`;
  }, [article.createdAt]);

  // @TODO: is tehre a need for navigate hook?
  const slugURL = `/#/profile/${article.author.username}`;

  // @TODO: no full name in response, so lets mock it
  const authorName = `${article.author.username} Smith`;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={slugURL}>
          <img src="http://i.imgur.com/Qr71crq.jpg" />
        </a>
        <div className="info">
          <a href={slugURL} className="author">
            {authorName}
          </a>
          <span className="date">{formattedDate}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart" /> {article.favouritesCount}
        </button>
      </div>
      <a href="/#/how-to-build-webapps-that-scale" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </a>
    </div>
  );
};
