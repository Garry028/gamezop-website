"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { fetchGames } from "../api/config";
import { Game } from "../interfaces/Games";
import Error from "./Error";
import GameCard from "./GameCard";
import Loader from "./Loader";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 12;

const GameSection: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchParams = useSearchParams();

  const categoryMapping: Record<string, string> = {
    Action: "action-games",
    Adventure: "adventure-games",
    Arcade: "arcade-games",
    "Puzzle & Logic": "puzzle-and-logic-games",
    "Sports & Racing": "sports-and-games",
    Strategy: "strategy-games",
    "My Favourites": "my-favourites",
  };

  const getData = async () => {
    try {
      const data = await fetchGames();
      setGames(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching games. Please try again later.");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter games based on selected category and search query
  const filteredGames = React.useMemo(() => {
    let result = games;

    if (searchParams.has("category")) {
      const category = searchParams.get("category");
      result = result.filter((game) => game.categories.en[0] === category);
    }

    if (searchParams.has("search")) {
      const searchQuery = searchParams.get("search")!.toLowerCase();
      result = result.filter((game) =>
        game.name.en.toLowerCase().includes(searchQuery)
      );
    }

    return result;
  }, [searchParams, games]);

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

  // Group current games by category
  const gamesByCategory = React.useMemo(() => {
    const categoryGroups: Record<string, Game[]> = {};
    currentGames.forEach((game) => {
      const categoryKey = game.categories.en[0];
      const categoryName =
        Object.keys(categoryMapping).find(
          (key) => categoryMapping[key] === categoryKey
        ) || categoryKey;
      if (!categoryGroups[categoryName]) {
        categoryGroups[categoryName] = [];
      }
      categoryGroups[categoryName].push(game);
    });
    return categoryGroups;
  }, [currentGames]);

  if (loading) {
    return <Loader message="Loading games..." />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-extrabold mt-20 mb-6 text-center text-indigo-600">
        Game Library
      </h2>

      {/* Category Sections */}
      {Object.keys(gamesByCategory).map((category) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-indigo-500">
            {category}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gamesByCategory[category].map((game) => (
              <GameCard key={game.code} game={game} />
            ))}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default GameSection;
