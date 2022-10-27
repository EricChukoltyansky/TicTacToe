import "./App.css";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Square from "./Components/Square";

const Board = styled.div`
  width: 500px;
  height: 500px;
  background-color: #080808;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  opacity: 0.8;
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
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const winnerCount = useRef({
    X: 0,
    O: 0,
  });
  const indexRef = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const rowsRef = useRef(3);
  const columnsRef = useRef(3);

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
          winnerCount.current[board[a]] += 1;
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
          <h3>X count: {winnerCount.current.X}</h3>
        </span>
        <span>
          <h3>O count: {winnerCount.current.O}</h3>
        </span>
      </div>
      <Board>
        {Array(rowsRef.current)
          .fill("")
          .map((row, rowIndex) => (
            <Row key={rowIndex}>
              {Array(columnsRef.current)
                .fill("")
                .map((column, columnIndex) => (
                  <Column key={columnIndex}>
                    <Square
                      value={
                        board[
                          indexRef.current[
                            rowIndex * columnsRef.current + columnIndex
                          ]
                        ]
                      }
                      chooseSquare={() =>
                        handleSquare(
                          indexRef.current[
                            rowIndex * columnsRef.current + columnIndex
                          ]
                        )
                      }
                      key={
                        indexRef.current[
                          rowIndex * columnsRef.current + columnIndex
                        ]
                      }
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
