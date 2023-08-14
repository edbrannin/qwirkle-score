import { useState } from "react";

export type ScoreValue = 1 | 2 | 3 | 4 | 5 | 6 | 12
export type ScoreTally = Record<ScoreValue, number>;

export const scoreValues: ScoreValue[] = [
  1, 2, 3, 4, 5, 12, 6,
]

type GameEvent = {
  name: string;
  points: ScoreValue;
  undo: boolean;
}

const useGame = () => {
  const [scores, setScores] = useState<Record<string, ScoreTally>>({});
  const [events, setEvents] = useState<GameEvent[]>([]);

  // const trimEvents = () => setEvents(events.slice(Math.max(events.length - eventCap, 0)));

  const addEvent = (event: GameEvent) => {
    setEvents([
      ...events,
      event,
    ])
  }

  const recentEvents = (maxCount: 10) => {
    const eventCount = Math.min(maxCount, events.length);
    const startIndex = events.length - eventCount;
    return {
      events: events.slice(startIndex),
      eventCount,
      startIndex,
    };
  }

  const undoEvent = (toUndo: GameEvent) => {
    setEvents(events.filter(e => e !== toUndo));
    addEvent({... toUndo, undo: true })
    const currentScores = scores[toUndo.name] ?? {};
    setScores({
      ...scores,
      [toUndo.name]: {
        ...currentScores,
        [toUndo.points]: currentScores[toUndo.points] - 1,
      }
    })
  }

  const addScore = (name: string, value: ScoreValue) => {
    const currentScores = scores[name] ?? {};
    addEvent({ name, points: value, undo: false });
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
    recentEvents,
    undoEvent,
    addScore,
    resetScores,
    getTotalScore,
  }
    
};

export default useGame;
