import React from 'react';
import Navigation from '@/components/Navigation';

export async function getServerSideProps(context: any) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/games'; // Construct the URL
    const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Retrieve the API key

  try {
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
        } as HeadersInit, // Cast headers object to type HeadersInit
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch games, status: ${res.status}`);
    }

    const data = await res.json();

    return {
      props: { games: data.games || [] }, // Ensure games is always an array
    };
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return {
      props: { games: [] },
    };
  }
}
const GamesPage = ({ games }: { games: any[] }) => {
    return (
      <div>
        <Navigation />
        <div>
          <h1>All Games</h1>
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                <h2>{game.gameTitle} - {game.author}</h2>
                <p>Description: {game.gameDescription}</p>
                <p>Time Limit: {game.timeLimit} seconds</p>
                <p>Number of Challenges: {game.numberOfChallenges}</p>
                <p>Theme: {game.theme || "N/A"}</p>
                <p>Title Background:{game.titleBg}</p>
                <p>Body Background: {game.bodyBg}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  

export default GamesPage;
