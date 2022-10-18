import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Article } from "./useArticles";

const ARTICLE_FETCH_URL = `/api/articles`;

type ArticleResponse = {
  article: Article;
};

export const useArticle = (slug: string): Article | undefined => {
  const [article, setArticle] = useState<Article>();

  const handleFetch = useCallback(async () => {
    const articleURL = `${ARTICLE_FETCH_URL}/${slug}`;
    const response: AxiosResponse<ArticleResponse> = await axios.get(articleURL);
    setArticle(response.data.article);
  }, [slug]);

  useEffect(() => {
    handleFetch();
    window.addEventListener("favorited", handleFetch);
    window.addEventListener("tokenChange", handleFetch);
    return () => {
      window.removeEventListener("favorited", handleFetch)
      window.removeEventListener("tokenChange", handleFetch);
    };
  }, [handleFetch]);

  // nextPage, previousPage, lastPage, firstPage
  return article;
};
