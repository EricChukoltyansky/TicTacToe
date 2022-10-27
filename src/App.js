import "./App.css";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Square from "./Components/Square";

const Board = styled.div`
  width: 500px;
  height: 500px;
  background-color: #080808;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
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

const Winner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  height: 50px;
  block-size: fit-content;
  position: absolute;
  top: 85%;
`;

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [squareIndex, setSquareIndex] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [player, setPlayer] = useState("X");
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [winner, setWinner] = useState("");
  const [winnerCounts, setWinnerCounts] = useState({
    X: 0,
    O: 0,
  });

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

      console.log("board", board);

      winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        console.log(player);
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(`${board[a]} is the winner!`);
          setWinnerCounts({
            ...winnerCounts,
            [board[a]]: winnerCounts[board[a]] + 1,
          });
        } else if (!board.includes("")) {
          setWinner("It's a tie!");
        }
      });
    };
    checkWinner();
  }, [board, player]);
  return (
    <div className="App">
      <div>
        <h2>Player {player}'s turn</h2>
      </div>
      <div>
        <span>
          <h3>X count: {winnerCounts.X}</h3>
        </span>
        <span>
          <h3>O count: {winnerCounts.O}</h3>
        </span>
      </div>
      <Board>
        {Array(rows)
          .fill("")
          .map((row, rowIndex) => (
            <Row key={rowIndex}>
              {Array(columns)
                .fill("")
                .map((column, columnIndex) => (
                  <Column key={columnIndex}>
                    <Square
                      value={
                        board[squareIndex[rowIndex * columns + columnIndex]]
                      }
                      chooseSquare={() =>
                        handleSquare(
                          squareIndex[rowIndex * columns + columnIndex]
                        )
                      }
                      key={squareIndex[rowIndex * columns + columnIndex]}
                    />
                  </Column>
                ))}
            </Row>
          ))}
      </Board>
      {winner && (
        <Winner>
          <h1>{winner}</h1>
          <button onClick={handleGameOver}>Play Again</button>
        </Winner>
      )}
    </div>
  );
}

export default App;
