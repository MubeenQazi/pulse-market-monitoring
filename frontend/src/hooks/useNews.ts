import { useState, useEffect } from 'react';
import { getNews } from '@services';
import { News, NewsCategory } from '@types';

interface UseNewsReturn {
  news: News[];
  filteredNews: News[];
  loading: boolean;
  error: string | null;
  selectedCategory: NewsCategory;
  setSelectedCategory: (category: NewsCategory) => void;
  refetch: () => Promise<void>;
}

export const useNews = (): UseNewsReturn => {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getNews();
      const newsData = Array.isArray(response.data)
        ? response.data
        : response.data?.data || [];
      setNews(newsData);
      setFilteredNews(newsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(news);
    } else {
      setFilteredNews(news.filter((item) => item.category === selectedCategory));
    }
  }, [selectedCategory, news]);

  return {
    news,
    filteredNews,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    refetch: fetchData,
  };
};
