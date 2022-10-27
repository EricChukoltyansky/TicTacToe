import React from "react";
import styled from "styled-components";

const Squared = styled.div`
  flex: 33%;
  height: 165px;
  border: 1px solid #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 5rem;
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;

  &:active {
    transition: 0.2s;
    background-color: #fff;
  }
`;

function Square({ value, chooseSquare }) {
  return <Squared onClick={chooseSquare}>{value}</Squared>;
}

export default Square;
