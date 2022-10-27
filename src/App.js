import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Square from "./Components/Square";

const Board = styled.div`
  width: 500px;
  height: 500px;
  background-color: aquamarine;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  flex: 33%;
  display: flex;
  flex-direction: row;
  /* border: 1px solid black; */
`;

const Column = styled.div`
  flex: 33%;
  /* border: 1px solid black; */
  flex-direction: column;
`;

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  // const [squareIndex, setSquareIndex] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [player, setPlayer] = useState("X");
  // const [rows, setRows] = useState(3);
  // const [columns, setColumns] = useState(3);
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleSquare = (index) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
  };

  const handleGameOver = () => {
    setBoard(Array(9).fill(""));
    setPlayer("X");
    setWinner("");
    setGameOver(false);
  };

  useEffect(() => {
    const checkWinner = () => {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        console.log(player);
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(`${board[a]} is the winner!`);
          setGameOver(true);
        } else if (!board.includes("")) {
          setWinner("It's a tie!");
          setGameOver(true);
        }
      });
    };
    checkWinner();
  }, [board, player]);
  return (
    <div className="App">
      <Board>
        <Row>
          <Column>
            <Square value={board[0]} chooseSquare={() => handleSquare(0)} />
            <Square value={board[1]} chooseSquare={() => handleSquare(1)} />
            <Square value={board[2]} chooseSquare={() => handleSquare(2)} />
          </Column>
          <Column>
            <Square value={board[3]} chooseSquare={() => handleSquare(3)} />
            <Square value={board[4]} chooseSquare={() => handleSquare(4)} />
            <Square value={board[5]} chooseSquare={() => handleSquare(5)} />
          </Column>
          <Column>
            <Square value={board[6]} chooseSquare={() => handleSquare(6)} />
            <Square value={board[7]} chooseSquare={() => handleSquare(7)} />
            <Square value={board[8]} chooseSquare={() => handleSquare(8)} />
          </Column>
        </Row>
      </Board>
      {winner && (
        <div>
          <h1>{winner}</h1>
        </div>
      )}
      {gameOver && <button onClick={handleGameOver}>Play Again</button>}
    </div>
  );
}

export default App;
