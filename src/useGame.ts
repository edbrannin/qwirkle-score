import { useState } from "react";

export type ScoreValue = 1 | 2 | 3 | 4 | 5 | 6 | 12
export type ScoreTally = Record<ScoreValue, number>;

export const scoreValues: ScoreValue[] = [
  1, 2, 3, 4, 5, 12, 6,
]

type GameEvent = {
  name: string;
  points: number;
}

const useGame = (eventCap = 10) => {
  const [scores, setScores] = useState<Record<string, ScoreTally>>({});
  const [events, setEvents] = useState<GameEvent[]>([]);

  // const trimEvents = () => setEvents(events.slice(Math.max(events.length - eventCap, 0)));

  const addEvent = (event: GameEvent) => {
    setEvents([
      ...events,
      event,
    ])
    // trimEvents();
  }

  const addScore = (name: string, value: ScoreValue) => {
    const currentScores = scores[name] ?? {};
    addEvent({ name, points: value });
    setScores({
      ...scores,
      [name]: {
        ...currentScores,
        [value]: (currentScores[value] || 0) + 1,
      },
    });
  }

  const resetScores = () => {
    setScores({});
    setEvents([]);
  }

  const getTotalScore = (name: string) => scoreValues.reduce(
    (total, value) => total + value * (scores[name]?.[value] || 0),
    0
  );

  return {
    scores,
    events,
    addScore,
    resetScores,
    getTotalScore,
  }
    
};

export default useGame;
