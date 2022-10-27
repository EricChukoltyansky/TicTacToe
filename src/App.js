import "./App.css";
import { useState } from "react";
import styled from "styled-components";

const Board = styled.div`
  width: 500px;
  height: 500px;
  background-color: aquamarine;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  return (
    <div className="App">
      <div className="board"></div>
    </div>
  );
}

export default App;
