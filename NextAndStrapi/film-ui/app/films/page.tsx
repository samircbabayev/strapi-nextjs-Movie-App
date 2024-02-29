"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import Link from "next/link";

interface Film {
  id: number;
  attributes: {
    title: string;
    released: string;
    director: string;
    plot: string | null;
    slug: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

const Films = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axiosInstance.get("/films");
        setFilms(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching films");
        setLoading(false);
      }
    };
    fetchFilms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Films</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {films.map((film) => (
          <Link
            key={film.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            href={"films/" + film.id}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                {film.attributes.title}
              </h2>
              <p className="text-gray-600 mb-2">
                Released: {film.attributes.released}
              </p>
              <p className="text-gray-600 mb-2">
                Director: {film.attributes.director}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Films;
