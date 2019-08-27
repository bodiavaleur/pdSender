import styled from "styled-components";

export const Input = styled.input`
  color: white;
  width: 150px;
  height: 25px;
  border-radius: 5px;
  font-size: 0.7rem;
  text-align: center;
  line-height: 15px;
  font-weight: bold;
  border: none;
  background: linear-gradient(
    0deg,
    rgba(89, 89, 89, 1) 0%,
    rgba(118, 118, 118, 1) 100%
  );
  margin: 0 auto;
  font-family: "SF Display", Arial, Helvetica, sans-serif;

  ::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

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
    height: 30px;

    ::placeholder {
      color: #aaa;
    }
  `}

  ${({ file }) =>
    file &&
    `
    display: none;
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
