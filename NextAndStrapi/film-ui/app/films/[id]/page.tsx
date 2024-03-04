"use client";
import axiosInstance from "@/utils/axiosConfig";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

const SingleFilm = (params: any) => {
  const id = params.params.id;

  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [review, setReview] = useState({
    value: "",
  });

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axiosInstance.get(`/films/${id}`);
        setFilm(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching film");
        setLoading(false);
      }
    };
    if (id) {
      fetchFilm();
    }
  }, [id]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwtToken = Cookies.get("jwt");
        console.log(jwtToken);

        if (jwtToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setError("Error fetching film");
        setLoading(false);
      }
    };

    fetchToken();
  }, [isAuthenticated]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!film) return <div>No film found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview({ value: e.target.value });
  };

  return (
    <div className="px-20 py-8">
      <h1 className="text-3xl font-bold mb-4">{film.attributes.title}</h1>
      <p className="text-gray-600 mb-2">Released: {film.attributes.released}</p>
      <p className="text-gray-600 mb-2">Director: {film.attributes.director}</p>
      <p className="text-gray-600 mb-4">Plot: {film.attributes.plot}</p>
      {isAuthenticated ? (
        <div className="mb-8">
          <span className="block text-lg font-bold mb-2">Reviews</span>
          <form>
            <textarea
              value={review.value}
              onChange={handleChange}
              placeholder="Add your review"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            ></textarea>
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Add Review
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SingleFilm;
