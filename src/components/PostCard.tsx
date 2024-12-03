import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import type { Post } from '@/lib/wordpress';
import { format } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  // Determine featured image
  const featuredImageUrl = post.featuredImage?.node?.sourceUrl;

  // Determine excerpt (handle both REST API and GraphQL formats)
  const excerptText = typeof post.excerpt === 'string' 
    ? post.excerpt 
    : post.excerpt?.rendered || 'No excerpt available';

  // Determine title (handle both REST API and GraphQL formats)
  const titleText = typeof post.title === 'string'
    ? post.title
    : post.title?.rendered || 'Untitled Post';

  return (
    <Card className="overflow-hidden">
      {featuredImageUrl && (
        <div className="relative aspect-video">
          <img
            src={featuredImageUrl}
            alt={titleText}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{titleText}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          {format(new Date(post.date), 'MMMM dd, yyyy')}
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="line-clamp-3 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: excerptText }}
        />
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <a href={`/blog/${post.slug}`}>Read More</a>
        </Button>
      </CardFooter>
    </Card>
  );
}