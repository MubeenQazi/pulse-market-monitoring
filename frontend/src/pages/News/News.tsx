import React from 'react';
import { useNews } from '@hooks';
import { LoadingSpinner, ErrorMessage, PageHeader, TabFilter } from '@components/common';
import { NewsCard } from '@components/cards';
import { NEWS_CATEGORIES } from '@config';

const News: React.FC = () => {
  const { filteredNews, loading, error, selectedCategory, setSelectedCategory, news } = useNews();

  if (loading) return <LoadingSpinner message="Loading news..." />;
  if (error) return <ErrorMessage message={error} />;

  const categoriesWithCounts = NEWS_CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.value === 'all' ? news.length : news.filter((n) => n.category === cat.value).length,
  }));

  return (
    <div>
      <PageHeader
        title="Market News"
        subtitle={`${filteredNews.length} ${filteredNews.length === 1 ? 'article' : 'articles'}`}
      />

      <TabFilter
        tabs={categoriesWithCounts}
        activeTab={selectedCategory}
        onChange={(value) => setSelectedCategory(value as typeof selectedCategory)}
      />

      {filteredNews.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No news found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
