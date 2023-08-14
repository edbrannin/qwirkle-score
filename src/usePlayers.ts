import { useState } from "react";

const usePlayers = (defaults = []) => {
  const [players, setPlayers] = useState<string[]>(defaults);
  const addPlayer = (name: string) => setPlayers([...players, name]);
  const removePlayer = (name: string) => setPlayers(players.filter(p => p !== name));

  return {
    players, addPlayer, removePlayer,
  };
}

export default usePlayers;