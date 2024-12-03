// GraphQL Queries for WordPress

// Query to fetch all posts with more details
export const ALL_POSTS_QUERY = `
query AllPosts {
  posts {
    nodes {
      id
      databaseId
      title
      excerpt
      content
      date
      slug
      uri
      author {
        node {
          id
          name
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}`;

// Query to fetch a single post by slug with comprehensive details
export const SINGLE_POST_QUERY = `
query SinglePost($slug: String!) {
  postBy(slug: $slug) {
    id
    databaseId
    title
    content
    excerpt
    date
    slug
    uri
    author {
      node {
        id
        name
        avatar {
          url
        }
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    tags {
      nodes {
        name
        slug
      }
    }
    featuredImage {
      node {
        sourceUrl
        altText
        }
      }
    }
  }
}`;

// Query to fetch posts by category
export const POSTS_BY_CATEGORY_QUERY = `
query PostsByCategory($categoryName: String!) {
  posts(where: { categoryName: $categoryName }) {
    nodes {
      id
      title
      excerpt
      date
      slug
    }
  }
}`;

// Query to fetch pages
export const ALL_PAGES_QUERY = `
query AllPages {
  pages {
    nodes {
      id
      title
      content
      slug
    }
  }
}`;
