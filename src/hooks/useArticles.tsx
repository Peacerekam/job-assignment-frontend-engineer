import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

const ARTICLES_FETCH_URL = `/api/articles`;

export type Article = {
  author: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: false;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
};

type ArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

type ArticlesHookData = {
  articles: Article[];
  articlesCount: number;
};

type GetArticlesParams = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
};

export const useArticles = (params?: GetArticlesParams): ArticlesHookData => {
  const [articlesCount, setArticlesCount] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);

  const handleFetch = useCallback(async () => {
    const hasUndefinedParams = params && !Object.values(params).find(p => p);
    if (hasUndefinedParams) return;

    const response: AxiosResponse<ArticlesResponse> = await axios.get(ARTICLES_FETCH_URL, { params });
    setArticles(response.data.articles);
    setArticlesCount(response.data.articlesCount);
    // eslint-disable-next-line
  }, [JSON.stringify(params)]);

  useEffect(() => {
    handleFetch();
    window.addEventListener("favorited", handleFetch);
    window.addEventListener("tokenChange", handleFetch);
    return () => {
      window.removeEventListener("favorited", handleFetch);
      window.removeEventListener("tokenChange", handleFetch);
    };
  }, [handleFetch]);

  // nextPage, previousPage, lastPage, firstPage
  return { articles, articlesCount };
};
