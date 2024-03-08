"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/services/axiosConfig";
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

interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

const Films = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axiosInstance.get(
          `/films?pagination[page]=${pageIndex}&pagination[pageSize]=3`
        );
        setFilms(response.data.data);
        setMeta(response.data.meta);
        setLoading(false);
      } catch (error) {
        setError("Error fetching films");
        setLoading(false);
      }
    };
    fetchFilms();
  }, [pageIndex]);

  console.log(films);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-20 py-10">
      <h1 className="text-3xl font-bold mb-8">Films</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {films.map((film) => (
          <Link
            key={film.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            href={`/films/${film.id}`}
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
      <div className="py-6">
        <button
          className={`md:p-2 rounded py-2 px-4 ${
            pageIndex === 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={pageIndex === 1}
          onClick={() => {
            setPageIndex(pageIndex - 1);
          }}
        >
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 px-4 ml-2 ${
            pageIndex === (meta && meta.pagination.pageCount)
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={pageIndex === (meta && meta.pagination.pageCount)}
          onClick={() => {
            setPageIndex(pageIndex + 1);
          }}
        >
          Next
        </button>
        <span className="ml-2 text-gray-700">{`${pageIndex} of ${
          meta && meta.pagination.pageCount
        }`}</span>
      </div>
      {meta && (
        <div>
          <p>Page: {meta.pagination.page}</p>
          <p>Page Size: {meta.pagination.pageSize}</p>
          <p>Page Count: {meta.pagination.pageCount}</p>
          <p>Total: {meta.pagination.total}</p>
        </div>
      )}
    </div>
  );
};

export default Films;
