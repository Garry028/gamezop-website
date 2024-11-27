// components/GameCard.tsx

import Image from "next/image";
import React, { useState } from "react";
import { Game } from "../interfaces/Games";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 bg-white hover:scale-105 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src={game.assets.cover}
          alt={game.name.en}
          loading="lazy"
          className="w-full h-48 object-cover"
          width={400}
          height={300}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {game.name.en}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {game.description.en}
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{game.name.en}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800"
                aria-label="Close modal"
              >
                ✖
              </button>
            </div>
            <div className="mb-4 flex justify-center w-full">
              <Image
                src={game.assets.screens[0]}
                alt={`${game.name.en} Screenshot`}
                className="rounded object-cover max-w-full max-h-[300px]"
                width={300}
                height={300}
              />
            </div>
            <p className="text-gray-700 mb-4">{game.description.en}</p>
            <button
              onClick={() => {
                window.open(game.url, "_blank");
                setIsModalOpen(false);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Play
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GameCard;
