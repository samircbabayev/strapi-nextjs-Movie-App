import React from "react";

const Home = () => {
  return (
    <div className=" min-h-screen">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Our Film Website
          </h1>
          <p className="text-lg mb-8">Explore the Latest Movies and Trailers</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Film Website. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
