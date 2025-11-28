import { NewsCard } from '@/components/news/NewsCard';
import { NewsArticle } from '@/lib/api/types';

async function getNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news?limit=20`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error('Failed to fetch news');
    return res.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Cricket News</h1>
        <p className="text-muted-foreground">
          Latest news and updates from the world of cricket
        </p>
      </div>

      {news.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No news articles found
        </div>
      )}
    </div>
  );
}

