import styled from "styled-components";

export const Button = styled.button`
  width: 150px;
  height: 40px;
  margin: 10px;
  background: rgb(10, 132, 255);
  border: none;
  color: white;
  font-family: "SF Display", Arial;
  border-radius: 15px;

  ${({ logout }) =>
    logout &&
    `
    width: 75px;
    height: 25px;
    color: white;
    background: rgb(225, 69, 58);
  `}

  ${({ text }) =>
    text &&
    `
    width: auto;
    height: auto;
    color: rgb(10, 132, 255);
    background: none;
    font-size: 1.7rem;
  `}
`;
