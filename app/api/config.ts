const BASE_URL: string = 'https://pub.gamezop.com/v3/games?id=peSLSV';

import { Game } from "../interfaces/Games";

export const fetchGames = async (): Promise<Game[]> => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.games;
};