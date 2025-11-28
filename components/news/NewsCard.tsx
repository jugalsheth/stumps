'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsArticle } from '@/lib/api/types';
import { formatDate } from '@/lib/utils/format';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        {article.image && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
          <span>{article.source}</span>
          <span>{formatDate(article.publishedAt, 'PP')}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {article.description}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Read more <ExternalLink className="h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
}

