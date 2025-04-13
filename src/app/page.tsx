import { getBlogPosts } from './lib/getBlogPosts';
import ClientLandingPage from './components/ClientLandingPage';

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <main>
      <ClientLandingPage blogPosts={blogPosts} />
    </main>
  );
}
