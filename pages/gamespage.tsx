import React from 'react';
import Navigation from '@/components/Navigation';

export async function getServerSideProps(context: any) {
    // Keep the API URL public as it doesn't expose sensitive information
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/games';
    
    // Change this to use the non-public version of your API key
    const apiKey = process.env.API_KEY; // This will not be exposed to the client

  try {
    const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey, // Use the server-side only API key here
        } as HeadersInit, // Cast headers object to HeadersInit type
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
