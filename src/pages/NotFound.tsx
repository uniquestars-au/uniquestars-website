import SEO from '../components/SEO';
import Navbar from '../components/feature/Navbar';
import Footer from '../components/feature/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SEO 
        title="Page Not Found | Unique Stars Sydney"
        description="The page you are looking for does not exist. Return to Unique Stars home for early intervention and autism therapy services."
        robots="noindex, nofollow"
      />
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-8xl font-extrabold text-[#33C8FF] mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
          Oops! Page Not Found
        </h2>
        <p className="text-[#0A2A66] text-xl max-w-lg mb-10 leading-relaxed">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist anymore.
        </p>
        <a 
          href="/" 
          className="bg-gradient-to-r from-[#33C8FF] to-[#0480E8] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg border-2 border-[#0A2A66]/10"
        >
          Return to Home
        </a>
      </main>
      <Footer />
    </div>
  );
}