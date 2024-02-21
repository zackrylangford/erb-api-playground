// components/GamesDisplay.tsx
import React, { useEffect, useState } from 'react';

interface BasicGameInfo {
  id: string;
  gameTitle: string;
  theme: string;
  author: string;
  titleBg: string;
  bodyBg: string;
  timeLimit: number;
  numberOfChallenges: number;
}

const GamesDisplay: React.FC = () => {
  const [games, setGames] = useState<BasicGameInfo[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/games') // Adjust the endpoint as needed.
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setGames(data.games);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Available Games</h2>
      {error && <div>Error: {error}</div>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.gameTitle} - {game.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default GamesDisplay;
