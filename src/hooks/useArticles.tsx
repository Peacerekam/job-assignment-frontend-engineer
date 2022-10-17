import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// use this as some base url for axios, check documentaiton
const BACKEND_URL = "http://localhost:3000";
const ARTICLES_FETCH_URL = `${BACKEND_URL}/api/articles`;

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
  favourited: false;
  favouritesCount: number;
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

export const useArticles = (): ArticlesHookData => {
  const [articlesCount, setArticlesCount] = useState(0);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    const response: AxiosResponse<ArticlesResponse> = await axios.get(ARTICLES_FETCH_URL);

    console.log("handleFetch", response);

    setArticles(response.data.articles);
    setArticlesCount(response.data.articlesCount);
  };

  // nextPage, previousPage, lastPage, firstPage
  return { articles, articlesCount };
};
