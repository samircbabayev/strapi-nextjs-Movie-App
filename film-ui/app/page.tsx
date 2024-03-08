import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="text-center relative z-10 text-white">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Star Wars Movie Database
          </h1>
          <p className="text-lg mb-8">
            Explore all Star Wars movies, read the plot, check reviews, and add
            your own reviews.
          </p>
          <Link
            href="/films"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Star Wars Movie Database. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
