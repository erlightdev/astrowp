import { z } from 'zod';
import { ALL_POSTS_QUERY, SINGLE_POST_QUERY } from './graphql-queries';

const WP_API_URL = 'http://wpvue.test/graphql';

const AuthorSchema = z.object({
  node: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.object({
      url: z.string()
    }).optional()
  })
});

const CategorySchema = z.object({
  nodes: z.array(z.object({
    name: z.string(),
    slug: z.string()
  }))
});

const TagSchema = z.object({
  nodes: z.array(z.object({
    name: z.string(),
    slug: z.string()
  }))
});

const FeaturedImageSchema = z.object({
  node: z.object({
    sourceUrl: z.string(),
    altText: z.string().optional()
  }).optional()
});

const PostSchema = z.object({
  id: z.string(),
  databaseId: z.number().optional(),
  title: z.object({ rendered: z.string() }).or(z.string()),
  content: z.object({ rendered: z.string() }).or(z.string()).optional(),
  excerpt: z.object({ rendered: z.string() }).or(z.string()).optional(),
  date: z.string(),
  slug: z.string(),
  uri: z.string().optional(),
  author: AuthorSchema.optional(),
  categories: CategorySchema.optional(),
  tags: TagSchema.optional(),
  featuredImage: FeaturedImageSchema.optional()
});

export type Post = z.infer<typeof PostSchema>;

export async function getPosts() {
  try {
    const response = await fetch(WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ALL_POSTS_QUERY
      })
    });

    const responseData = await response.json();
    console.log('Raw WordPress Posts Response:', JSON.stringify(responseData, null, 2));
    
    const posts = z.array(PostSchema).parse(responseData.data.posts.nodes);
    console.log('Parsed Posts:', posts);
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const response = await fetch(WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SINGLE_POST_QUERY,
        variables: { slug }
      })
    });

    const responseData = await response.json();
    console.log('Raw WordPress Single Post Response:', JSON.stringify(responseData, null, 2));
    
    const post = PostSchema.parse(responseData.data.postBy);
    console.log('Parsed Single Post:', post);
    
    return post;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Immediately Invoked Function Expression (IIFE) to test post fetching
(async () => {
  console.log('Fetching WordPress Posts...');
  const posts = await getPosts();
  console.log(`Found ${posts.length} posts`);
  
  if (posts.length > 0) {
    console.log('Fetching first post by slug...');
    await getPost(posts[0].slug);
  }
})();