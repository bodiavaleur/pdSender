import styled from "styled-components";

export const Button = styled.button`
  width: 150px;
  height: 40px;
  margin: 10px;
  background: linear-gradient(0deg, rgb(0,122,255) 0%, rgb(10,132,255) 100%);
  border: none;
  color: white;
  font-family: "SF Display", Arial;
  border-radius: 15px;
  transition: transform 0.3s ease;
  outline: none;
  
  &:active {
    transform: scale(1.1);
    
  }

  ${({ logout }) =>
    logout &&
    `
    width: 75px;
    height: 25px;
    color: white;
    background: rgb(225, 69, 58);
  `}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
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

  ${({ textRed }) =>
    textRed &&
    `
    color: rgb(255,45,85)
  `}

  ${({ red }) =>
    red &&
    `
    background: rgb(255,45,85)
  `}
`;

export const ButtonLabel = styled.label`
  width: 150px;
  height: 40px;
  margin: 10px;
  background: rgba(0, 122, 255, 0.9);
  border: none;
  color: white;
  font-family: "SF Display", Arial;
  border-radius: 15px;
  cursor: pointer;

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
