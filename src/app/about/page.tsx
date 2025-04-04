import Header from '../components/Header';

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-[50%] pl-16">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        {/* About content will go here */}
      </main>
    </div>
  );
} 