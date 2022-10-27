import React from "react";
import styled from "styled-components";

const Squared = styled.div`
  flex: 33%;
  height: 165px;
  border: 1px solid black;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 5rem;
  color: black;
  font-family: Arial, Helvetica, sans-serif;

  &:active {
    background-color: #64f4c4;
  }
`;

function Square({ value, chooseSquare }) {
  return <Squared onClick={chooseSquare}>{value}</Squared>;
}

export default Square;
