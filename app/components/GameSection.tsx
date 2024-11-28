import { Suspense } from "react";
import { fetchGames } from "../api/config";
import { Game } from "../interfaces/Games";
import Error from "./Error";
import GameCard from "./GameCard";
import Loader from "./Loader";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 12;

interface GameSectionProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const categoryMapping: Record<string, string> = {
  Action: "action-games",
  Adventure: "adventure-games",
  Arcade: "arcade-games",
  "Puzzle & Logic": "puzzle-and-logic-games",
  "Sports & Racing": "sports-and-games",
  Strategy: "strategy-games",
  "My Favourites": "my-favourites",
};

const GameSection = ({ searchParams }: GameSectionProps) => {
  return (
    <Suspense fallback={<Loader message="Loading games..." />}>
      <GameSectionContent searchParams={searchParams} />
    </Suspense>
  );
};

export default GameSection;

const GameSectionContent = async ({ searchParams }: GameSectionProps) => {
  try {
    const games = await fetchGames();

    let filteredGames = games;

    const categoryParam = searchParams.category;
    if (categoryParam) {
      const category = Array.isArray(categoryParam)
        ? categoryParam[0]
        : categoryParam;
      filteredGames = filteredGames.filter(
        (game) => game.categories.en[0] === category
      );
    }

    const searchParam = searchParams.search;
    if (searchParam) {
      const searchQuery = Array.isArray(searchParam)
        ? searchParam[0].toLowerCase()
        : searchParam.toLowerCase();
      filteredGames = filteredGames.filter((game) =>
        game.name.en.toLowerCase().includes(searchQuery)
      );
    }

    const pageParam = searchParams.page;
    const currentPage = pageParam
      ? parseInt(Array.isArray(pageParam) ? pageParam[0] : pageParam, 10)
      : 1;

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);

    const gamesByCategory: Record<string, Game[]> = {};
    currentGames.forEach((game) => {
      const categoryKey = game.categories.en[0];
      const categoryName =
        Object.keys(categoryMapping).find(
          (key) => categoryMapping[key] === categoryKey
        ) || categoryKey;
      if (!gamesByCategory[categoryName]) {
        gamesByCategory[categoryName] = [];
      }
      gamesByCategory[categoryName].push(game);
    });

    return (
      <div className="p-6">
        <h2 className="text-4xl font-extrabold mt-20 mb-6 text-center text-indigo-600">
          Game Library
        </h2>

        {Object.keys(gamesByCategory).map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-indigo-500">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gamesByCategory[category].map((game) => (
                <GameCardWrapper key={game.code} game={game} />
              ))}
            </div>
          </div>
        ))}

        <PaginationWrapper
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <Error message="Error fetching games. Please try again later." />;
  }
};

const GameCardWrapper = ({ game }: { game: Game }) => {
  return (
    <>
      <GameCard game={game} />
    </>
  );
};

const PaginationWrapper = ({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </>
  );
};
