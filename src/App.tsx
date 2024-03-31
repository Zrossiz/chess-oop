import { useEffect, useState } from 'react';
import './App.css';
import { BoardComponent } from './components/BoardComponent';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { LostFiguresComponent } from './components/LostFiguresComponent';
import { TimerComponent } from './components/TimerComponent';

function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayet] = useState<Player>(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState<Player>(new Player(Colors.BLACK));
  const [curPlayer, setCurPlayer] = useState<Player | null>(null);

  useEffect(() => {
    restart();
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurPlayer(whitePlayer);
  };

  const swapPlayer = () => {
    setCurPlayer(curPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  };

  return (
    <div className='app'>
      <TimerComponent restart={restart} currentPlayer={curPlayer}/>
      <BoardComponent 
        board={board} 
        setBoard={setBoard}
        curPlayer={curPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFiguresComponent 
          title='Черные'
          figures={board.lostBlackFigures}
        />
        <LostFiguresComponent 
          title='Белые'
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
