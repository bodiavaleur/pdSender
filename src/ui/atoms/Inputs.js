import styled from "styled-components";

export const Input = styled.input`
  color: rgba(72, 72, 74, 1);
  width: 150px;
  height: 25px;
  border-radius: 5px;
  border: 1.5px solid rgba(72, 72, 74, 0.3);
  font-size: 0.7rem;
  text-align: center;
  line-height: 15px;
  font-weight: bold;
  background: white;
  margin: 0 auto;
  font-family: "SF Display", Arial, Helvetica, sans-serif;

  ${({ age }) =>
    age &&
    `
    width: 75px;
    height: 25px;
    margin: 0 5px;
  `}

  ${({ login }) =>
    login &&
    `
    margin: 5px;
  `}
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  height: 175px;
  justify-content: space-evenly;
`;

export const RangeInput = styled.input`
  width: 90px;
  display: block;
  margin-bottom: 10px;
`;

export const RangeInputLabel = styled.label`
  font-size: 0.8rem;
  color: #333333;
  color: rgb(28, 28, 30);
  text-align: center;
  font-weight: bold;
  font-family: "Quicksand", Arial, Helvetica, sans-serif;
`;
