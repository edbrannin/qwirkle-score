import { useRef } from 'react';
import './App.css'
import useGame, { scoreValues } from './useGame'
import usePlayers from './usePlayers'

function App() {
  const {
    addScore,
    resetScores,
    getTotalScore,
    scores,
    events,
  } = useGame();

  const {
    players, addPlayer, removePlayer
  } = usePlayers();
  
  const nameRef = useRef<HTMLInputElement>(null);

  const addPlayerFromInput = (e: Event) => {
    const newName = nameRef.current?.value;
    if (newName) {
      addPlayer(newName);
      nameRef.current.value = '';
    }
    e.preventDefault();
  }

  return (
    <>
      <h1>Qwirkle Scoresheet</h1>
      <button onClick={() => resetScores()}>New Game</button>
      <table>
        <thead>
          <tr>
            <th />
            {players.map(name => (
              <th key={name}>
                {name}
                {' '}
                <button onClick={() => removePlayer(name)}>X</button>
              </th>
            ))}
            <th>
              <form onSubmit={(e) => addPlayerFromInput(e)}>
                <input ref={nameRef} name="nextPlayer" />
                <button type='submit'>+</button>
              </form>
            </th>
          </tr>
        </thead>
        <tbody>
          {scoreValues.map(points => (
            <tr key={points}>
              <th>{points}</th>
              {players.map(name => (
                <td key={name}>
                  {scores[name]?.[points] || ' '}
                  {' '}
                  <button onClick={() => addScore(name, points)}>+</button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Total</th>
            {players.map(name => (
              <th key={name}>{getTotalScore(name)}</th>
            ))}
          </tr>
        </tfoot>
      </table>

      {events.length === 0 ? null : (
        <div>
          <h2>Recent Events</h2>
          <ol start={Math.max(events.length - 10, 1)}>
            {events.slice(Math.max(events.length - 10, 0)).map((event, i) => (
              <li key={i}>{event.name} gets {event.points}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}

export default App
