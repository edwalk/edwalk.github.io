import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
  excerpt: string;
}

// This function can only be used in Server Components or API routes
export async function getBlogPosts(): Promise<BlogPost[]> {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts');

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id: matterResult.data.id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        tags: matterResult.data.tags,
        content: matterResult.content,
        excerpt: matterResult.data.excerpt
      } as BlogPost;
    })
    // Sort posts by date
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
} 